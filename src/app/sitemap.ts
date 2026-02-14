export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://0xharryriddle.dev";

export default async function sitemap() {
  const routes = ["", "/blog", "/projects", "/companies", "/about"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  return [...routes];
}
