import { NextRequest, NextResponse } from 'next/server';

// Задайте токен вашего бота и ID чата
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface DeliveryForm {
	name: string;
	surname: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	zip: string;
	note?: string;
}

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	selectedColor?: string;
	image: string;
}

interface OrderData {
	deliveryForm: DeliveryForm;
	paymentMethod: string;
	cart: CartItem[];
	totalPrice: number;
}

// Экранирование HTML для Telegram
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

async function sendToTelegram(
	message: string,
): Promise<{ success: boolean; error?: string }> {
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

	try {
		console.log('Отправка сообщения в Telegram...');
		console.log('Chat ID:', TELEGRAM_CHAT_ID);
		console.log('Длина сообщения:', message.length);

		// Проверяем длину сообщения (лимит Telegram - 4096 символов)
		if (message.length > 4096) {
			console.error('Сообщение слишком длинное:', message.length);
			// Обрезаем сообщение
			message = message.substring(0, 4000) + '\n\n...(сообщение обрезано)';
		}

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: message,
				parse_mode: 'HTML',
			}),
		});

		const result = await response.json();

		console.log('Telegram API response:', result);

		if (!result.ok) {
			const errorMsg = result.description || 'Unknown error';
			console.error('Telegram API error:', errorMsg);
			return { success: false, error: errorMsg };
		}

		return { success: true };
	} catch (error) {
		console.error('Ошибка отправки в Telegram:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

export async function POST(request: NextRequest) {
	try {
		console.log('=== Начало обработки заказа ===');

		// Проверяем наличие конфигурации Telegram
		if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
			console.error('Отсутствует конфигурация Telegram:', {
				hasToken: !!TELEGRAM_BOT_TOKEN,
				hasChatId: !!TELEGRAM_CHAT_ID,
			});
			return NextResponse.json(
				{ error: 'Chyba konfigurace Telegramu. Kontaktujte podporu.' },
				{ status: 500 },
			);
		}

		const data: OrderData = await request.json();

		console.log('Данные заказа получены:', {
			email: data.deliveryForm.email,
			itemsCount: data.cart.length,
			totalPrice: data.totalPrice,
		});

		// Формируем сообщение
		let message = '<b>🛒 NOVÁ OBJEDNÁVKA</b>\n\n';

		// Информация о доставке
		message += '<b>📦 DODACÍ ÚDAJE:</b>\n';
		message += `<b>Jméno:</b> ${escapeHtml(data.deliveryForm.name)} ${escapeHtml(data.deliveryForm.surname)}\n`;
		message += `<b>Email:</b> ${escapeHtml(data.deliveryForm.email)}\n`;
		message += `<b>Telefon:</b> ${escapeHtml(data.deliveryForm.phone)}\n`;
		message += `<b>Adresa:</b> ${escapeHtml(data.deliveryForm.street)}, ${escapeHtml(data.deliveryForm.city)}, ${escapeHtml(data.deliveryForm.zip)}\n`;
		if (data.deliveryForm.note) {
			message += `<b>Poznámka:</b> ${escapeHtml(data.deliveryForm.note)}\n`;
		}

		// Способ оплаты
		message += `\n<b>💳 ZPŮSOB PLATBY:</b> ${data.paymentMethod === 'online' ? 'Google Pay / Apple Pay' : 'Dobírka (při doručení)'}\n`;

		// Товары в корзине
		message += '\n<b>🕯️ PRODUKTY:</b>\n';
		data.cart.forEach((item, index) => {
			message += `\n${index + 1}. <b>${escapeHtml(item.name)}</b>\n`;
			if (item.selectedColor) {
				message += `   Barva: ${escapeHtml(item.selectedColor)}\n`;
			}
			message += `   Cena: ${item.price} Kč\n`;
			message += `   Množství: ${item.quantity}\n`;
			message += `   Celkem: ${item.price * item.quantity} Kč\n`;
		});

		// Итоговая сумма
		const deliveryCost = data.totalPrice >= 1500 ? 0 : 150;
		const totalWithDelivery = data.totalPrice + deliveryCost;

		message += `\n<b>💰 SHRNUTÍ:</b>\n`;
		message += `Mezisoučet: ${data.totalPrice} Kč\n`;
		message += `Doprava: ${deliveryCost === 0 ? 'Zdarma' : deliveryCost + ' Kč'}\n`;
		message += `<b>CELKEM: ${totalWithDelivery} Kč</b>\n`;

		// Отправляем сообщение
		console.log('Отправка сообщения в Telegram...');
		const result = await sendToTelegram(message);

		if (!result.success) {
			console.error('Не удалось отправить сообщение в Telegram:', result.error);
			return NextResponse.json(
				{
					error: 'Nepodařilo se odeslat zprávu do Telegramu',
					details: result.error,
				},
				{ status: 500 },
			);
		}

		console.log('✅ Заказ успешно отправлен');
		return NextResponse.json(
			{
				success: true,
				message: 'Objednávka byla úspěšně odeslána!',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('❌ Chyba při zpracování objednávky:', error);
		return NextResponse.json(
			{ error: 'Chyba při zpracování objednávky. Zkuste to prosím znovu.' },
			{ status: 500 },
		);
	}
}
