export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "https://0xharryriddle.dev"}/sitemap.xml`,
  };
}
