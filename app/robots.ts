import { MetadataRoute } from 'next';

const BASE_URL = 'https://interview-revision.vercel.app';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/view'], // Don't index the internal PDF viewer page
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
