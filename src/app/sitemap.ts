import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vt-reserve.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2025-02-19'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
