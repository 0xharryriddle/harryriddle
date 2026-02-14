import React from "react";

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: "default" | "terminal";
  noPadding?: boolean;
}

export function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-inner" />
      <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-inner" />
      <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-inner" />
    </div>
  );
}

export function MacWindow({
  children,
  title,
  className = "",
  variant = "default",
  noPadding = false,
}: MacWindowProps) {
  const isTerminal = variant === "terminal";

  return (
    <div
      className={`
        mac-window overflow-hidden rounded-xl
        ${
          isTerminal
            ? "bg-[#1e1e1e] text-neutral-200 border border-neutral-700/50"
            : "bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-700/40"
        }
        shadow-lg shadow-black/5 dark:shadow-black/20
        backdrop-blur-sm
        ${className}
      `}
    >
      {/* Title Bar */}
      <div
        className={`
          flex items-center gap-3 px-4 py-3
          ${
            isTerminal
              ? "bg-[#2d2d2d] border-b border-neutral-700/50"
              : "bg-neutral-50/80 dark:bg-neutral-800/60 border-b border-neutral-200/60 dark:border-neutral-700/40"
          }
        `}
      >
        <TrafficLights />
        {title && (
          <span
            className={`
              flex-1 text-center text-xs font-medium -ml-[52px]
              ${isTerminal ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"}
            `}
          >
            {title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}

export function MacWindowInline({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-xl overflow-hidden
        bg-white/60 dark:bg-neutral-900/60
        border border-neutral-200/40 dark:border-neutral-700/30
        shadow-sm
        backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
