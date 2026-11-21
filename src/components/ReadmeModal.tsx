import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FileText,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react";

export interface ReadmeTarget {
  title: string;
  githubUrl: string;
}

interface ReadmeModalProps {
  target: ReadmeTarget | null;
  onClose: () => void;
}

interface GitHubReadmeResponse {
  name: string;
  path: string;
  sha: string;
  html_url: string;
  download_url: string | null;
  content?: string;
  encoding?: string;
}

interface CachedReadme {
  markdown: string;
  fileName: string;
  htmlUrl: string;
  rawBaseUrl: string;
  blobBaseUrl: string;
}

const readmeCache = new Map<string, CachedReadme>();

const parseGitHubRepo = (
  githubUrl: string
): { owner: string; repo: string } | null => {
  try {
    const url = new URL(githubUrl);
    if (!url.hostname.includes("github.com")) return null;
    const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
    }
    return null;
  } catch {
    return null;
  }
};

const decodeBase64Utf8 = (b64: string): string => {
  const cleaned = b64.replace(/\s/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder("utf-8").decode(bytes);
};

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ target, onClose }) => {
  const [data, setData] = useState<CachedReadme | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const parsedRepo = target ? parseGitHubRepo(target.githubUrl) : null;
  const repoSlug = parsedRepo ? `${parsedRepo.owner}/${parsedRepo.repo}` : "";

  const fetchReadme = useCallback(
    async (forceRefresh = false, signal?: AbortSignal) => {
      if (!target || !parsedRepo) {
        if (target) {
          setError("Invalid GitHub repository URL.");
        }
        return;
      }

      const cacheKey = `${parsedRepo.owner}/${parsedRepo.repo}`;
      if (!forceRefresh && readmeCache.has(cacheKey)) {
        setData(readmeCache.get(cacheKey) ?? null);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.github.com/repos/${parsedRepo.owner}/${parsedRepo.repo}/readme`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal,
          }
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(
              "No README.md file was found in the default branch of this repository."
            );
          }
          if (res.status === 403) {
            throw new Error(
              "GitHub API rate limit reached. Please try again shortly or open directly on GitHub."
            );
          }
          throw new Error(`Failed to fetch README (HTTP ${res.status}).`);
        }

        const json: GitHubReadmeResponse = await res.json();
        let markdown = "";

        if (json.content && json.encoding === "base64") {
          markdown = decodeBase64Utf8(json.content);
        } else if (json.download_url) {
          const rawRes = await fetch(json.download_url, { signal });
          if (!rawRes.ok) {
            throw new Error("Unable to download raw README content.");
          }
          markdown = await rawRes.text();
        } else {
          throw new Error("README content is empty or in an unsupported format.");
        }

        const rawBaseUrl = json.download_url
          ? json.download_url.replace(/[^/]+$/, "")
          : `https://raw.githubusercontent.com/${parsedRepo.owner}/${parsedRepo.repo}/HEAD/`;

        const blobBaseUrl = json.html_url
          ? json.html_url.replace(/[^/]+$/, "")
          : `https://github.com/${parsedRepo.owner}/${parsedRepo.repo}/blob/HEAD/`;

        const cached: CachedReadme = {
          markdown,
          fileName: json.name || "README.md",
          htmlUrl: json.html_url || target.githubUrl,
          rawBaseUrl,
          blobBaseUrl,
        };

        readmeCache.set(cacheKey, cached);
        setData(cached);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError(
          err instanceof Error ? err.message : "Failed to load README.md."
        );
      } finally {
        setLoading(false);
      }
    },
    [target, parsedRepo?.owner, parsedRepo?.repo]
  );

  useEffect(() => {
    if (!target) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    fetchReadme(false, controller.signal);
    return () => controller.abort();
  }, [target, fetchReadme]);

  useEffect(() => {
    if (!target) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [target, onClose]);

  if (!target) return null;

  const handleCopyMarkdown = () => {
    if (!data?.markdown) return;
    navigator.clipboard.writeText(data.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resolveUrl = (uri: string | undefined, base: string): string => {
    if (!uri) return "";
    if (/^(https?:|mailto:|tel:|#)/i.test(uri)) return uri;
    try {
      return new URL(uri.replace(/^\.\//, ""), base).toString();
    } catch {
      return uri;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-[#061329]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0B1B34] border border-[#CBD6E6] dark:border-[#203B5B] rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#EAF0F8] dark:bg-[#0D203B] border-b border-[#CBD6E6] dark:border-[#203B5B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#0369A1] dark:text-[#00D4FF] bg-[#0369A1]/10 dark:bg-[#00D4FF]/10 px-2.5 py-0.5 rounded border border-[#0369A1]/30 dark:border-[#00D4FF]/30 uppercase">
                <FileText className="w-3 h-3" />
                <span>{data?.fileName || "README.md"}</span>
              </span>
              {repoSlug && (
                <span className="text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE] truncate">
                  {repoSlug}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] truncate">
              {target.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {data?.markdown && (
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/40 text-xs font-mono text-[#2B3B52] dark:text-[#B4C3D8] hover:text-[#0369A1] dark:hover:text-[#00D4FF] transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy MD</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => fetchReadme(true)}
              disabled={loading}
              className="p-2 rounded-lg bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/40 text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#0369A1] dark:hover:text-[#00D4FF] transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh README from GitHub"
              aria-label="Refresh README"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <a
              href={data?.htmlUrl || target.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#0369A1] hover:bg-[#075985] dark:bg-[#00D4FF] dark:hover:bg-[#38bdf8] text-white dark:text-[#061329] font-mono text-xs font-bold transition-all inline-flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#4A5D78] dark:text-[#8EA3BE] hover:text-[#09111E] dark:hover:text-[#F5F8FF] bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-white dark:bg-[#081529]">
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-7 w-2/3 rounded bg-[#DCE6F3] dark:bg-[#203B5B]/60" />
              <div className="h-4 w-full rounded bg-[#EAF0F8] dark:bg-[#203B5B]/40" />
              <div className="h-4 w-5/6 rounded bg-[#EAF0F8] dark:bg-[#203B5B]/40" />
              <div className="h-28 w-full rounded-xl bg-[#F4F7FB] dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B]/60 mt-4" />
              <div className="h-5 w-1/3 rounded bg-[#DCE6F3] dark:bg-[#203B5B]/50 mt-4" />
              <div className="h-4 w-full rounded bg-[#EAF0F8] dark:bg-[#203B5B]/40" />
              <div className="h-4 w-4/5 rounded bg-[#EAF0F8] dark:bg-[#203B5B]/40" />
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl bg-[#F4F7FB] dark:bg-[#0D203B] border border-rose-500/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#09111E] dark:text-[#F5F8FF]">
                    Could not load README.md
                  </h3>
                  <p className="text-xs text-[#2B3B52] dark:text-[#B4C3D8] mt-1">{error}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fetchReadme(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#0369A1] hover:bg-[#075985] dark:bg-[#00D4FF] text-white dark:text-[#061329] font-mono text-xs font-bold dark:hover:bg-[#38bdf8] transition-colors cursor-pointer"
                >
                  Retry
                </button>
                <a
                  href={target.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] text-[#09111E] dark:text-[#F5F8FF] font-mono text-xs hover:border-[#0369A1]/50 dark:hover:border-[#00D4FF]/50 transition-colors"
                >
                  Open GitHub ↗
                </a>
              </div>
            </div>
          )}

          {!loading && !error && data && (
            <div className="text-sm text-[#2B3B52] dark:text-[#C8D6E8] leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] pb-3 mb-5 border-b border-[#CBD6E6] dark:border-[#203B5B] tracking-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg sm:text-xl font-bold text-[#09111E] dark:text-[#F5F8FF] mt-8 mb-3 pb-2 border-b border-[#CBD6E6] dark:border-[#203B5B]/70 flex items-center gap-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-bold text-[#0369A1] dark:text-[#00D4FF] mt-6 mb-2">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-sm font-bold text-[#09111E] dark:text-[#E2EDF8] mt-4 mb-1.5">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-[#2B3B52] dark:text-[#C8D6E8] leading-relaxed">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => {
                    const resolved = resolveUrl(href, data.blobBaseUrl);
                    const isAnchor = href?.startsWith("#");
                    return (
                      <a
                        href={resolved}
                        target={isAnchor ? undefined : "_blank"}
                        rel={isAnchor ? undefined : "noopener noreferrer"}
                        className="text-[#0369A1] dark:text-[#00D4FF] hover:text-[#075985] dark:hover:text-[#38bdf8] underline underline-offset-2 font-medium"
                      >
                        {children}
                      </a>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-[#2B3B52] dark:text-[#B4C3D8]">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-[#2B3B52] dark:text-[#B4C3D8]">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#0369A1] dark:border-[#00D4FF] bg-[#EAF0F8] dark:bg-[#0D203B]/70 px-4 py-2.5 my-4 rounded-r-lg text-[#2B3B52] dark:text-[#B4C3D8] italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isBlock = Boolean(className) || String(children).includes("\n");
                    if (isBlock) {
                      return (
                        <code
                          className={`block font-mono text-xs text-[#09111E] dark:text-[#E2EDF8] ${className || ""}`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code
                        className="px-1.5 py-0.5 rounded bg-[#EAF0F8] dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B] text-[#0369A1] dark:text-[#00D4FF] font-mono text-xs"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="p-4 my-4 rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] overflow-x-auto font-mono text-xs leading-relaxed">
                      {children}
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="my-5 overflow-x-auto rounded-xl border border-[#CBD6E6] dark:border-[#203B5B]">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-[#EAF0F8] dark:bg-[#0D203B] text-[#09111E] dark:text-[#F5F8FF] font-mono text-xs uppercase">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2.5 border-b border-[#CBD6E6] dark:border-[#203B5B] font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2.5 border-b border-[#CBD6E6]/70 dark:border-[#203B5B]/60 text-[#2B3B52] dark:text-[#B4C3D8]">
                      {children}
                    </td>
                  ),
                  hr: () => <hr className="my-6 border-[#CBD6E6] dark:border-[#203B5B]" />,
                  img: ({ src, alt }) => (
                    <img
                      src={resolveUrl(src, data.rawBaseUrl)}
                      alt={alt || "Project README visual"}
                      className="max-w-full rounded-xl border border-[#CBD6E6] dark:border-[#203B5B] my-4 inline-block"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {data.markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
