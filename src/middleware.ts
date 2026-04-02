import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	// Проверяем, если путь начинается с /admin (но не /admin/login)
	if (request.nextUrl.pathname.startsWith('/admin')) {
		// Разрешаем доступ к странице логина
		if (request.nextUrl.pathname === '/admin/login') {
			return NextResponse.next();
		}

		// Проверяем наличие cookie с аутентификацией
		const authCookie = request.cookies.get('admin-auth');

		if (!authCookie || authCookie.value !== 'authenticated') {
			// Перенаправляем на страницу логина
			return NextResponse.redirect(new URL('/admin/login', request.url));
		}
	}

	return NextResponse.next();
}

// Указываем, к каким путям применяется middleware
export const config = {
	matcher: '/admin/:path*',
};
