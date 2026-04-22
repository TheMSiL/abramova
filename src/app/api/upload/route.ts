import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		// Проверка типа файла
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'Only images are allowed' },
				{ status: 400 },
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Оптимизируем изображение с помощью sharp
		// Конвертируем в WebP для лучшего сжатия и качества
		const optimizedBuffer = await sharp(buffer)
			.resize(800, 800, {
				// Максимальный размер 800x800
				fit: 'inside',
				withoutEnlargement: true,
			})
			.webp({ quality: 85 }) // WebP с качеством 85%
			.toBuffer();

		// Конвертируем в base64 и создаем data URL
		const base64 = optimizedBuffer.toString('base64');
		const url = `data:image/webp;base64,${base64}`;

		return NextResponse.json({ url }, { status: 200 });
	} catch (error) {
		console.error('Error uploading file:', error);
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 },
		);
	}
}
