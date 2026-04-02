import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://abramova-svicky.cz'; // Замените на ваш домен

	// Получаем все категории
	const categories = await prisma.category.findMany({
		select: { slug: true, updatedAt: true },
	});

	// Статические страницы
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/e-shop`,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/o-mne`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/obchodni-podminky`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.5,
		},
		{
			url: `${baseUrl}/cart`,
			lastModified: new Date(),
			changeFrequency: 'always' as const,
			priority: 0.6,
		},
	];

	// Страницы категорий
	const categoryPages = categories.map(category => ({
		url: `${baseUrl}/e-shop?tab=${category.slug}`,
		lastModified: category.updatedAt,
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	return [...staticPages, ...categoryPages];
}
