import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/categories - получение всех категорий
export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: 'asc',
			},
		});

		// Преобразуем даты в строки для корректной JSON сериализации
		const categoriesData = categories.map(cat => ({
			...cat,
			createdAt: cat.createdAt.toISOString(),
			updatedAt: cat.updatedAt.toISOString(),
		}));

		return NextResponse.json(categoriesData);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch categories' },
			{ status: 500 },
		);
	}
}
