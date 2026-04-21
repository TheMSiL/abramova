import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
	params: Promise<{ id: string }>;
}

// GET /api/products/[id] - получение товара по ID
export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const product = await prisma.product.findUnique({
			where: { id },
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Преобразуем даты в строки
		const productData = {
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		};

		return NextResponse.json(productData);
	} catch (error) {
		console.error('Error fetching product:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch product' },
			{ status: 500 },
		);
	}
}

// PUT /api/products/[id] - обновление товара
export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const body = await request.json();

		const product = await prisma.product.update({
			where: { id },
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
				inStock: body.inStock,
				stock: body.stock ?? 0,
			},
		});

		// Преобразуем даты в строки
		const productData = {
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		};

		return NextResponse.json(productData);
	} catch (error) {
		console.error('Error updating product:', error);
		return NextResponse.json(
			{ error: 'Failed to update product' },
			{ status: 500 },
		);
	}
}

// DELETE /api/products/[id] - удаление товара
export async function DELETE(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		await prisma.product.delete({
			where: { id },
		});

		return NextResponse.json({ message: 'Product deleted successfully' });
	} catch (error) {
		console.error('Error deleting product:', error);
		return NextResponse.json(
			{ error: 'Failed to delete product' },
			{ status: 500 },
		);
	}
}
