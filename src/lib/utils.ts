import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string for display.
 *
 * @param date           - ISO date string, e.g. "2024-11-29" or "2024-11-29T00:00:00"
 * @param includeRelative - When true, appends a relative label like "(3mo ago)"
 */
export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let relativeLabel: string;

  if (yearsAgo > 0) {
    relativeLabel = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    relativeLabel = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    relativeLabel = `${daysAgo}d ago`;
  } else {
    relativeLabel = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${relativeLabel})`;
}
