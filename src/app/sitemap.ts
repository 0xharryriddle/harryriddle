export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0xharryriddle.dev'

export default async function sitemap() {
  const experimentRoutes = ['voting-escrow-light-client', 'axon-cluster', 'kaizen'].map(
    (slug) => `/projects/${slug}`,
  )
  const routes = [
    '',
    '/research',
    '/experience',
    '/projects',
    '/blog',
    '/community',
    '/resume',
    '/about',
    ...experimentRoutes,
  ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

  return [...routes]
}
