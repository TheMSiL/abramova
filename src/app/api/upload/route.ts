import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

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

		// Генерируем уникальное имя файла
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const filename = `${uniqueSuffix}-${file.name.replace(/\s/g, '-')}`;
		const uploadDir = join(process.cwd(), 'public', 'uploads');
		const filepath = join(uploadDir, filename);

		// Создаем директорию если её нет
		if (!existsSync(uploadDir)) {
			await mkdir(uploadDir, { recursive: true });
		}

		// Сохраняем файл
		await writeFile(filepath, buffer);

		// Возвращаем URL для доступа к файлу
		const url = `/uploads/${filename}`;

		return NextResponse.json({ url }, { status: 200 });
	} catch (error) {
		console.error('Error uploading file:', error);
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 },
		);
	}
}
