import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products - получение всех товаров с фильтрацией
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const category = searchParams.get('category');
		const search = searchParams.get('search');

		const where: {
			category?: string;
			OR?: Array<{
				name?: { contains: string; mode: 'insensitive' };
				description?: { contains: string; mode: 'insensitive' };
			}>;
		} = {};

		if (category) {
			where.category = category;
		}

		if (search) {
			where.OR = [
				{
					name: {
						contains: search,
						mode: 'insensitive',
					},
				},
				{
					description: {
						contains: search,
						mode: 'insensitive',
					},
				},
			];
		}

		const products = await prisma.product.findMany({
			where,
			orderBy: {
				createdAt: 'desc',
			},
		});

		// Преобразуем даты в строки для корректной JSON сериализации
		const productsData = products.map(product => ({
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		}));

		return NextResponse.json(productsData);
	} catch (error) {
		console.error('Error fetching products:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch products' },
			{ status: 500 },
		);
	}
}

// POST /api/products - создание нового товара
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const product = await prisma.product.create({
			data: {
				name: body.name,
				price: body.price,
				category: body.category,
				image: body.image,
				description: body.description,
				weight: body.weight,
				height: body.height,
				aroma: body.aroma,
				colorOptions: body.colorOptions,
				inStock: body.inStock ?? true,
			},
		});

		// Преобразуем даты в строки
		const productData = {
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		};

		return NextResponse.json(productData, { status: 201 });
	} catch (error) {
		console.error('Error creating product:', error);
		return NextResponse.json(
			{ error: 'Failed to create product' },
			{ status: 500 },
		);
	}
}
