import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (!href) return <a {...props} />;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...(props as any)}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage({
  alt,
  ...props
}: React.ComponentPropsWithoutRef<typeof Image>) {
  return <Image alt={alt ?? ""} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

/**
 * Custom <pre> wrapper that:
 * 1. Renders the macOS traffic-lights header bar as real DOM nodes
 *    (not a ::before pseudo-element) so it never scrolls out of view.
 * 2. Wraps the actual <pre> in a div with overflow-x: auto so long code
 *    lines scroll horizontally without breaking the rounded corners.
 */
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div
      className="relative my-6 rounded-xl overflow-hidden"
      style={{
        background: "#1e1e1e",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* ── macOS traffic-lights header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "#2d2d2d",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#ff5f57",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#febc2e",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#28c840",
          }}
        />
      </div>

      {/* ── Scrollable code area ── */}
      <div
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
        className="prose-scroll"
      >
        <pre
          {...props}
          style={{
            margin: 0,
            padding: 0,
            background: "transparent",
            border: "none",
            boxShadow: "none",
            borderRadius: 0,
          }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: string;
}) {
  const styles: Record<string, string> = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-200",
    danger: "border-red-500/30 bg-red-500/5 text-red-200",
    success: "border-green-500/30 bg-green-500/5 text-green-200",
  };

  const icons: Record<string, string> = {
    info: "ℹ️",
    warning: "⚠️",
    danger: "🚨",
    success: "✅",
  };

  return (
    <div
      className={`my-6 rounded-xl border p-4 ${styles[type] ?? styles.info}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type] ?? icons.info}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

/**
 * Recursively extract plain text from React children so we can generate
 * a stable slug even when a heading contains inline elements (links, code, etc.)
 */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

function createHeading(level: number) {
  const Heading = ({
    children,
    ...rest
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slug = slugify(extractText(children));
    return React.createElement(
      `h${level}`,
      { id: slug, ...rest },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  Table,
  Callout,
};

export function CustomMDX(
  props: React.ComponentPropsWithoutRef<typeof MDXRemote>,
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
