import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
	params: Promise<{ id: string }>;
}

// POST /api/products/[id]/change-id - изменение ID товара
export async function POST(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { newId } = body;

		if (!newId) {
			return NextResponse.json(
				{ error: 'New ID is required' },
				{ status: 400 },
			);
		}

		// Проверяем, существует ли уже товар с таким ID
		const existingProduct = await prisma.product.findUnique({
			where: { id: newId },
		});

		if (existingProduct) {
			return NextResponse.json(
				{ error: 'Product with this ID already exists' },
				{ status: 400 },
			);
		}

		// Получаем текущий товар
		const currentProduct = await prisma.product.findUnique({
			where: { id },
		});

		if (!currentProduct) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Создаем новый товар с новым ID и всеми данными старого
		const newProduct = await prisma.product.create({
			data: {
				id: newId,
				name: currentProduct.name,
				price: currentProduct.price,
				category: currentProduct.category,
				image: currentProduct.image,
				description: currentProduct.description,
				weight: currentProduct.weight,
				height: currentProduct.height,
				aroma: currentProduct.aroma,
				colorOptions: currentProduct.colorOptions,
				inStock: currentProduct.inStock,
				stock: currentProduct.stock,
				createdAt: currentProduct.createdAt,
			},
		});

		// Удаляем старый товар
		await prisma.product.delete({
			where: { id },
		});

		// Инвалидируем кэш страниц
		revalidatePath('/admin');
		revalidatePath('/e-shop');

		// Преобразуем даты в строки
		const productData = {
			...newProduct,
			createdAt: newProduct.createdAt.toISOString(),
			updatedAt: newProduct.updatedAt.toISOString(),
		};

		return NextResponse.json(productData);
	} catch (error) {
		console.error('Error changing product ID:', error);
		return NextResponse.json(
			{ error: 'Failed to change product ID' },
			{ status: 500 },
		);
	}
}
