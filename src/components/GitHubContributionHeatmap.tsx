import React, { useState } from "react";
import { motion } from "motion/react";
import { GitHubCalendar, type Year } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import { Activity, ExternalLink } from "lucide-react";

interface GitHubContributionHeatmapProps {
  username: string;
  memberSinceYear?: number;
}

export const GitHubContributionHeatmap: React.FC<
  GitHubContributionHeatmapProps
> = ({ username, memberSinceYear = 2023 }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<Year>("last");

  const yearOptions: { label: string; value: Year }[] = [
    { label: "Last 12 Months", value: "last" },
  ];

  for (let y = currentYear; y >= Math.max(memberSinceYear, currentYear - 3); y--) {
    yearOptions.push({ label: String(y), value: y });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl bg-[#0D203B]/90 border border-[#203B5B] p-6 sm:p-7 shadow-xl"
    >
      {/* Header & Year Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#061329] border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F5F8FF]">
              Contribution Heatmap
            </h3>
            <p className="text-xs font-mono text-[#8EA3BE] mt-0.5">
              Daily GitHub commit &amp; contribution intensity for @{username}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#061329] p-1 rounded-xl border border-[#203B5B] self-start sm:self-auto">
          {yearOptions.map((option) => {
            const isActive = selectedYear === option.value;
            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setSelectedYear(option.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00D4FF] text-[#061329] font-bold shadow-[0_0_12px_rgba(0,212,255,0.35)]"
                    : "text-[#8EA3BE] hover:text-[#F5F8FF]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Container */}
      <div className="rounded-xl bg-[#061329]/90 border border-[#203B5B]/80 p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[680px] flex justify-center text-[#B4C3D8] font-mono">
          <GitHubCalendar
            username={username}
            year={selectedYear}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            theme={{
              dark: ["#0B1D36", "#0D4769", "#08739B", "#00A6D6", "#00D4FF"],
            }}
            showWeekdayLabels={["mon", "wed", "fri"]}
            tooltips={{
              activity: {
                text: (activity) =>
                  `${activity.count} ${
                    activity.count === 1 ? "contribution" : "contributions"
                  } on ${activity.date}`,
              },
            }}
            errorMessage="Unable to load contribution calendar from GitHub right now."
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-[#203B5B]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#8EA3BE]">
        <span>Hover any square to inspect daily contribution count</span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#00D4FF] hover:underline"
        >
          <span>View full contribution graph on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
