import { NextRequest, NextResponse } from 'next/server';

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

		// Проверка размера файла (макс 2MB)
		if (file.size > 2 * 1024 * 1024) {
			return NextResponse.json(
				{ error: 'File size must be less than 2MB' },
				{ status: 400 },
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Конвертируем в base64 и создаем data URL
		const base64 = buffer.toString('base64');
		const url = `data:${file.type};base64,${base64}`;

		return NextResponse.json({ url }, { status: 200 });
	} catch (error) {
		console.error('Error uploading file:', error);
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 },
		);
	}
}
