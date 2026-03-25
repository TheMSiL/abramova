import { NextRequest, NextResponse } from 'next/server';

// Задайте токен вашего бота и ID чата
const TELEGRAM_BOT_TOKEN =
	process.env.TELEGRAM_BOT_TOKEN ||
	'8693476397:AAHtgPJuTeawThJHaxALpfR07pWiHwbVDyo';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-5129694385';

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

async function sendToTelegram(message: string): Promise<boolean> {
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

	try {
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
		return result.ok === true;
	} catch (error) {
		console.error('Ошибка отправки в Telegram:', error);
		return false;
	}
}

export async function POST(request: NextRequest) {
	try {
		const data: OrderData = await request.json();

		// Формируем сообщение
		let message = '<b>🛒 NOVÁ OBJEDNÁVKA</b>\n\n';

		// Информация о доставке
		message += '<b>📦 DODACÍ ÚDAJE:</b>\n';
		message += `<b>Jméno:</b> ${data.deliveryForm.name} ${data.deliveryForm.surname}\n`;
		message += `<b>Email:</b> ${data.deliveryForm.email}\n`;
		message += `<b>Telefon:</b> ${data.deliveryForm.phone}\n`;
		message += `<b>Adresa:</b> ${data.deliveryForm.street}, ${data.deliveryForm.city}, ${data.deliveryForm.zip}\n`;
		if (data.deliveryForm.note) {
			message += `<b>Poznámka:</b> ${data.deliveryForm.note}\n`;
		}

		// Способ оплаты
		message += `\n<b>💳 ZPŮSOB PLATBY:</b> ${data.paymentMethod === 'online' ? 'Google Pay / Apple Pay' : 'Dobírka (při doručení)'}\n`;

		// Товары в корзине
		message += '\n<b>🕯️ PRODUKTY:</b>\n';
		data.cart.forEach((item, index) => {
			message += `\n${index + 1}. <b>${item.name}</b>\n`;
			if (item.selectedColor) {
				message += `   Barva: ${item.selectedColor}\n`;
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
		const success = await sendToTelegram(message);

		if (!success) {
			return NextResponse.json(
				{ error: 'Nepodařilo se odeslat zprávu do Telegramu' },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Objednávka byla úspěšně odeslána!',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Chyba při zpracování objednávky:', error);
		return NextResponse.json(
			{ error: 'Chyba při zpracování objednávky' },
			{ status: 500 },
		);
	}
}
