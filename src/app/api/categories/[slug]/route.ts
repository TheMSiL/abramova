import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/categories/[slug] - получение категории по slug
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const category = await prisma.category.findUnique({
			where: {
				slug: slug,
			},
		});

		if (!category) {
			return NextResponse.json(
				{ error: 'Category not found' },
				{ status: 404 },
			);
		}

		// Преобразуем даты в строки для корректной JSON сериализации
		const categoryData = {
			...category,
			createdAt: category.createdAt.toISOString(),
			updatedAt: category.updatedAt.toISOString(),
		};

		return NextResponse.json(categoryData);
	} catch (error) {
		console.error('Error fetching category:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch category' },
			{ status: 500 },
		);
	}
}
