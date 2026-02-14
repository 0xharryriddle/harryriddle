import { MacWindow } from "@/components/mac-window";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 flex items-center justify-center min-h-[60vh]">
      <MacWindow title="~/404" className="max-w-md w-full text-center">
        <div className="py-8 space-y-4">
          <p className="text-5xl font-mono">404</p>
          <p className="text-neutral-500 dark:text-neutral-400">
            This page could not be found.
          </p>
          <Link
            href="/"
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900
              hover:bg-neutral-700 dark:hover:bg-neutral-300
              transition-colors mt-4
            "
          >
            Go home
          </Link>
        </div>
      </MacWindow>
    </section>
  );
}
