import { MetadataRoute } from 'next';
import { learningPaths } from '@/data/learning-paths';
import { topics } from '@/data/topics';

// Replace with your actual domain
const BASE_URL = 'https://interview-revision.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/dsa',
        '/technology',
        '/learn',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    const topicRoutes = topics.map((topic) => ({
        url: `${BASE_URL}/${topic.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const pathRoutes = learningPaths.map((path) => ({
        url: `${BASE_URL}/learn/${path.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...topicRoutes, ...pathRoutes];
}
