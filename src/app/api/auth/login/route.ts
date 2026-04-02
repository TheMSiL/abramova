import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { password } = await request.json();

		// Проверяем пароль из переменной окружения
		const adminPassword = process.env.ADMIN_PASSWORD;

		if (!adminPassword) {
			return NextResponse.json(
				{ success: false, message: 'Пароль администратора не настроен' },
				{ status: 500 },
			);
		}

		if (password === adminPassword) {
			// Создаем response с установкой cookie
			const response = NextResponse.json({
				success: true,
				message: 'Успешный вход',
			});

			// Устанавливаем cookie с токеном (простая реализация)
			response.cookies.set('admin-auth', 'authenticated', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7, // 7 дней
				path: '/',
			});

			return response;
		} else {
			return NextResponse.json(
				{ success: false, message: 'Неверный пароль' },
				{ status: 401 },
			);
		}
	} catch (error) {
		console.error('Ошибка при входе:', error);
		return NextResponse.json(
			{ success: false, message: 'Ошибка сервера' },
			{ status: 500 },
		);
	}
}
