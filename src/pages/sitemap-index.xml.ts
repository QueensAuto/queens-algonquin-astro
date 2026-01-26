import type { APIRoute } from 'astro';
import servicesData from '../data/services.json';

const SITE_URL = 'https://queensautoservices.com';

const pages = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: 'about', priority: 0.8, changefreq: 'monthly' },
    { url: 'contact', priority: 0.8, changefreq: 'monthly' },
    { url: 'services', priority: 0.9, changefreq: 'weekly' },
    { url: 'deals', priority: 0.9, changefreq: 'daily' },
    { url: 'faq', priority: 0.7, changefreq: 'monthly' },
    { url: 'buy-new-tires', priority: 0.9, changefreq: 'weekly' },
    { url: 'tire-installation', priority: 0.7, changefreq: 'monthly' },
    { url: 'used-tires', priority: 0.7, changefreq: 'monthly' },
    { url: 'privacy', priority: 0.3, changefreq: 'yearly' },
    { url: 'terms', priority: 0.3, changefreq: 'yearly' },
];

export const GET: APIRoute = async () => {
    const dynamicPages: any[] = [];

    // Add category pages and individual service pages
    servicesData.forEach((category) => {
        // Add category page
        dynamicPages.push({
            url: `services/${category.slug}`,
            priority: 0.8,
            changefreq: 'weekly'
        });

        // Add individual services
        category.services.forEach((service) => {
            dynamicPages.push({
                url: `services/${category.slug}/${service.slug}`,
                priority: 0.7,
                changefreq: 'monthly'
            });
        });
    });

    const allPages = [...pages, ...dynamicPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
            .map(
                (page) => `  <url>
    <loc>${SITE_URL}/${page.url}${page.url ? '/' : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
};
