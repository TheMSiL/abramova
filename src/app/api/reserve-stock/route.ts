import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface OrderItem {
	id: string;
	quantity: number;
}

// POST /api/reserve-stock - резервування товарів при замовленні
export async function POST(request: NextRequest) {
	try {
		const { items }: { items: OrderItem[] } = await request.json();

		if (!items || items.length === 0) {
			return NextResponse.json({ error: 'No items provided' }, { status: 400 });
		}

		// Перевіряємо наявність кожного товару
		for (const item of items) {
			const product = await prisma.product.findUnique({
				where: { id: item.id },
			});

			if (!product) {
				return NextResponse.json(
					{ error: `Product ${item.id} not found` },
					{ status: 404 },
				);
			}

			if (product.stock < item.quantity) {
				return NextResponse.json(
					{
						error: `Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
						productId: item.id,
						productName: product.name,
						available: product.stock,
						requested: item.quantity,
					},
					{ status: 400 },
				);
			}
		}

		// Зменшуємо кількість на складі для кожного товару
		for (const item of items) {
			const product = await prisma.product.findUnique({
				where: { id: item.id },
			});

			if (!product) continue;

			const newStock = product.stock - item.quantity;

			await prisma.product.update({
				where: { id: item.id },
				data: {
					stock: newStock,
					inStock: newStock > 0,
				},
			});
		}

		return NextResponse.json({
			success: true,
			message: 'Stock reserved successfully',
		});
	} catch (error) {
		console.error('Error reserving stock:', error);
		return NextResponse.json(
			{ error: 'Failed to reserve stock' },
			{ status: 500 },
		);
	}
}
