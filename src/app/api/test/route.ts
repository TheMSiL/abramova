import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		// Простой тест подключения к базе данных
		const count = await prisma.category.count();

		return NextResponse.json({
			success: true,
			message: 'Database connection successful',
			categoryCount: count,
		});
	} catch (error) {
		console.error('Database connection error:', error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 },
		);
	}
}
