import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import {
  FolderGit2,
  Star,
  Code2,
  GitFork,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { GitHubContributionHeatmap } from "./GitHubContributionHeatmap";
import { useTheme } from "../context/ThemeContext";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const GITHUB_USERNAME = "AnshPratap2314";

const LANGUAGE_COLORS_DARK: Record<string, string> = {
  Python: "#00D4FF",
  TypeScript: "#3B82F6",
  JavaScript: "#FACC15",
  HTML: "#F97316",
  CSS: "#A855F7",
  "Jupyter Notebook": "#EC4899",
  C: "#64748B",
  "C++": "#F43F5E",
};

const LANGUAGE_COLORS_LIGHT: Record<string, string> = {
  Python: "#0369A1",
  TypeScript: "#1D4ED8",
  JavaScript: "#CA8A04",
  HTML: "#EA580C",
  CSS: "#7E22CE",
  "Jupyter Notebook": "#BE185D",
  C: "#475569",
  "C++": "#BE123C",
};

const FALLBACK_COLORS_DARK = ["#00D4FF", "#38BDF8", "#34D399", "#818CF8", "#FBBF24"];
const FALLBACK_COLORS_LIGHT = ["#0369A1", "#0284C7", "#047857", "#4F46E5", "#B45309"];

export const DeveloperStatsSection: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();

  const fetchGitHubStats = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Accept: "application/vnd.github+json" },
          signal,
        }),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal,
          }
        ),
      ]);

      if (!userRes.ok) {
        throw new Error(
          userRes.status === 403
            ? "GitHub API rate limit reached. Please try again shortly."
            : `Unable to load GitHub profile (HTTP ${userRes.status})`
        );
      }

      if (!reposRes.ok) {
        throw new Error(
          reposRes.status === 403
            ? "GitHub API rate limit reached. Please try again shortly."
            : `Unable to load repositories (HTTP ${reposRes.status})`
        );
      }

      const userData: GitHubUser = await userRes.json();
      const reposData: GitHubRepo[] = await reposRes.json();

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch GitHub statistics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchGitHubStats(controller.signal);
    return () => controller.abort();
  }, [fetchGitHubStats]);

  const totalRepos = user?.public_repos ?? repos.length;
  const totalStars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );
  const totalForks = repos.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0
  );

  const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalCodedRepos = Object.values(languageCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const activePalette = isDark ? LANGUAGE_COLORS_DARK : LANGUAGE_COLORS_LIGHT;
  const fallbackPalette = isDark ? FALLBACK_COLORS_DARK : FALLBACK_COLORS_LIGHT;

  const topLanguages: LanguageStat[] = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], idx) => ({
      name,
      count,
      percentage:
        totalCodedRepos > 0
          ? Math.round((count / totalCodedRepos) * 1000) / 10
          : 0,
      color: activePalette[name] || fallbackPalette[idx % fallbackPalette.length],
    }));

  const primaryLanguage = topLanguages[0];
  const excludedRepos = new Set([GITHUB_USERNAME.toLowerCase(), "createsphere"]);

  const recentRepos = [...repos]
    .filter((repo) => !excludedRepos.has(repo.name.toLowerCase()))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
    .slice(0, 4);

  const memberSinceYear = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : 2023;

  const formatUpdatedDate = (isoDate: string) => {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const kpiHoverBorder = isDark ? "rgba(0, 212, 255, 0.5)" : "rgba(3, 105, 161, 0.55)";

  return (
    <section
      id="developer-stats"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD6E6] dark:border-[#203B5B]/50 tech-grid-bg relative overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#0369A1] dark:text-[#00D4FF] uppercase">
              06 — DEVELOPER STATS
            </span>
            <div className="h-px w-12 bg-[#0369A1]/40 dark:bg-[#00D4FF]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] tracking-tight mb-2">
            Developer Stats
          </h2>
          <p className="text-sm sm:text-base text-[#2B3B52] dark:text-[#B4C3D8] max-w-2xl">
            Dynamic repository metrics, stars earned, and language distribution fetched live from Ansh Pratap&apos;s GitHub profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => fetchGitHubStats()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0D203B] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/50 text-xs font-mono text-[#2B3B52] dark:text-[#B4C3D8] hover:text-[#0369A1] dark:hover:text-[#00D4FF] transition-all cursor-pointer disabled:opacity-60 shadow-xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#0369A1] dark:text-[#00D4FF] ${
                loading ? "animate-spin" : ""
              }`}
            />
            <span>{loading ? "Syncing..." : "Refresh"}</span>
          </button>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0D203B] border border-[#0369A1]/40 dark:border-[#00D4FF]/40 hover:border-[#0369A1] dark:hover:border-[#00D4FF] text-xs font-mono font-semibold text-[#0369A1] dark:text-[#00D4FF] hover:bg-[#0369A1]/10 dark:hover:bg-[#00D4FF]/10 transition-all shadow-xs"
          >
            <span>@{GITHUB_USERNAME}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Loading Skeleton */}
      {loading && !user && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white dark:bg-[#0D203B]/80 border border-[#CBD6E6] dark:border-[#203B5B] p-6 animate-pulse"
              >
                <div className="w-9 h-9 rounded-xl bg-[#CBD6E6]/60 dark:bg-[#203B5B]/60 mb-4" />
                <div className="h-8 w-20 rounded bg-[#CBD6E6]/70 dark:bg-[#203B5B]/70 mb-2" />
                <div className="h-3.5 w-32 rounded bg-[#CBD6E6]/50 dark:bg-[#203B5B]/50" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0D203B]/80 border border-[#CBD6E6] dark:border-[#203B5B] p-6 h-64 animate-pulse" />
            <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0D203B]/80 border border-[#CBD6E6] dark:border-[#203B5B] p-6 h-64 animate-pulse" />
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-rose-600/40 dark:border-rose-500/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-[#09111E] dark:text-[#F5F8FF]">
                Could not load GitHub statistics
              </h3>
              <p className="text-xs sm:text-sm text-[#2B3B52] dark:text-[#B4C3D8] mt-1">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchGitHubStats()}
            className="px-4 py-2 rounded-xl bg-[#0369A1] text-white dark:bg-[#00D4FF] dark:text-[#061329] font-mono font-bold text-xs hover:bg-[#075985] dark:hover:bg-[#38bdf8] transition-all cursor-pointer self-start sm:self-auto"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Loaded Developer Stats Content */}
      {user && !error && (
        <div className="space-y-6">
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4, borderColor: kpiHoverBorder }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-5 sm:p-6 shadow-md dark:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF0F8] dark:bg-[#061329] border border-[#0369A1]/25 dark:border-[#00D4FF]/30 flex items-center justify-center text-[#0369A1] dark:text-[#00D4FF] mb-4">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] font-mono tabular-nums">
                {totalRepos}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#1E293B] dark:text-[#E2EDF8] mt-1">
                Total Repositories
              </div>
              <div className="text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-1">
                Public GitHub builds
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 }}
              whileHover={{ y: -4, borderColor: kpiHoverBorder }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-5 sm:p-6 shadow-md dark:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF0F8] dark:bg-[#061329] border border-[#0369A1]/25 dark:border-[#00D4FF]/30 flex items-center justify-center text-[#0369A1] dark:text-[#00D4FF] mb-4">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] font-mono tabular-nums">
                {totalStars}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#1E293B] dark:text-[#E2EDF8] mt-1">
                Stars Earned
              </div>
              <div className="text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-1">
                Across public repositories
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              whileHover={{ y: -4, borderColor: kpiHoverBorder }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-5 sm:p-6 shadow-md dark:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF0F8] dark:bg-[#061329] border border-[#0369A1]/25 dark:border-[#00D4FF]/30 flex items-center justify-center text-[#0369A1] dark:text-[#00D4FF] mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] font-mono truncate">
                {primaryLanguage ? primaryLanguage.name : "Python"}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#1E293B] dark:text-[#E2EDF8] mt-1">
                Top Language
              </div>
              <div className="text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-1">
                {primaryLanguage
                  ? `${primaryLanguage.percentage}% of coded repos`
                  : "Primary engineering stack"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.18 }}
              whileHover={{ y: -4, borderColor: kpiHoverBorder }}
              className="rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-5 sm:p-6 shadow-md dark:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF0F8] dark:bg-[#061329] border border-[#0369A1]/25 dark:border-[#00D4FF]/30 flex items-center justify-center text-[#0369A1] dark:text-[#00D4FF] mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#09111E] dark:text-[#F5F8FF] font-mono tabular-nums">
                {memberSinceYear}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#1E293B] dark:text-[#E2EDF8] mt-1">
                Active Since
              </div>
              <div className="text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-1">
                {user.followers} followers · {totalForks} forks
              </div>
            </motion.div>
          </div>

          {/* Language Breakdown + Recent Repositories */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Language Usage Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-6 sm:p-7 shadow-md dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#09111E] dark:text-[#F5F8FF]">
                      Top Language Usage
                    </h3>
                    <p className="text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-0.5">
                      Distribution across {totalCodedRepos} repositories with detected language
                    </p>
                  </div>
                </div>

                {topLanguages.length > 0 ? (
                  <div className="space-y-5">
                    <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#EAF0F8] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B]">
                      {topLanguages.map((lang) => (
                        <div
                          key={lang.name}
                          style={{
                            width: `${lang.percentage}%`,
                            backgroundColor: lang.color,
                          }}
                          title={`${lang.name}: ${lang.percentage}%`}
                          className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                        />
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      {topLanguages.map((lang) => (
                        <div key={lang.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="flex items-center gap-2 text-[#09111E] dark:text-[#F5F8FF] font-semibold">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: lang.color }}
                              />
                              <span>{lang.name}</span>
                            </span>
                            <span className="text-[#4A5D78] dark:text-[#8EA3BE]">
                              {lang.count} {lang.count === 1 ? "repo" : "repos"} ·{" "}
                              <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">
                                {lang.percentage}%
                              </span>
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-[#EAF0F8] dark:bg-[#061329] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: lang.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#4A5D78] dark:text-[#8EA3BE]">
                    No primary language metadata available yet.
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#CBD6E6] dark:border-[#203B5B]/60 flex items-center justify-between text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE]">
                <span>Source: api.github.com</span>
                <span className="text-[#0369A1] dark:text-[#00D4FF] font-semibold">Live Profile Sync</span>
              </div>
            </motion.div>

            {/* Recent Repositories Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0D203B]/90 border border-[#CBD6E6] dark:border-[#203B5B] p-6 sm:p-7 shadow-md dark:shadow-xl"
            >
              <div className="flex items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#09111E] dark:text-[#F5F8FF]">
                    Recently Updated Repositories
                  </h3>
                  <p className="text-xs font-mono text-[#4A5D78] dark:text-[#8EA3BE] mt-0.5">
                    Latest public repositories sorted by commit push activity
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentRepos.map((repo) => {
                  const langColor = repo.language
                    ? activePalette[repo.language] || (isDark ? "#00D4FF" : "#0369A1")
                    : isDark
                    ? "#8EA3BE"
                    : "#4A5D78";
                  return (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl bg-[#F4F7FB] dark:bg-[#061329] border border-[#CBD6E6] dark:border-[#203B5B] hover:border-[#0369A1] dark:hover:border-[#00D4FF]/60 p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-xs hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(0,212,255,0.12)]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#09111E] dark:text-[#F5F8FF] group-hover:text-[#0369A1] dark:group-hover:text-[#00D4FF] transition-colors break-all">
                            {repo.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#4A5D78] dark:text-[#8EA3BE] group-hover:text-[#0369A1] dark:group-hover:text-[#00D4FF] shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-[#4A5D78] dark:text-[#8EA3BE] mt-2 line-clamp-2 leading-relaxed">
                          {repo.description ||
                            "Public engineering repository by Ansh Pratap."}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#CBD6E6] dark:border-[#203B5B]/60 flex items-center justify-between text-[11px] font-mono text-[#4A5D78] dark:text-[#8EA3BE]">
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <span className="flex items-center gap-1.5 text-[#2B3B52] dark:text-[#B4C3D8]">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: langColor }}
                              />
                              <span>{repo.language}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#0369A1] dark:text-[#00D4FF]" />
                            <span>{repo.stargazers_count}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3 text-[#4A5D78] dark:text-[#8EA3BE]" />
                            <span>{repo.forks_count}</span>
                          </span>
                        </div>
                        <span>{formatUpdatedDate(repo.pushed_at)}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Contribution Heatmap */}
      <div className="mt-6">
        <GitHubContributionHeatmap
          username={GITHUB_USERNAME}
          memberSinceYear={memberSinceYear}
        />
      </div>
    </section>
  );
};
