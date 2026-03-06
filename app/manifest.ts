import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Mebayu | Handmade Leather Bags from Bali',
        short_name: 'Mebayu',
        description: 'Mebayu is a Bali-based handmade leather brand crafting timeless bags and accessories.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
