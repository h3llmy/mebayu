import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mebayu.dwikihome.my.id'
    const locales = ['en', 'id']
    const routes = ['', '/products']

    const sitemapEntries: MetadataRoute.Sitemap = []

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    return sitemapEntries
}
