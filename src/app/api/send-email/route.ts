import { NextRequest, NextResponse } from 'next/server';

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

async function sendEmail(orderData: OrderData): Promise<boolean> {
	try {
		// Формируем HTML содержимое письма
		let htmlContent = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h1 style="color: #D4A574; border-bottom: 2px solid #D4A574; padding-bottom: 10px;">
					🛒 NOVÁ OBJEDNÁVKA
				</h1>
				
				<h2 style="color: #333; margin-top: 30px;">📦 DODACÍ ÚDAJE</h2>
				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="padding: 8px; font-weight: bold;">Jméno:</td>
						<td style="padding: 8px;">${orderData.deliveryForm.name} ${orderData.deliveryForm.surname}</td>
					</tr>
					<tr style="background-color: #f9f9f9;">
						<td style="padding: 8px; font-weight: bold;">Email:</td>
						<td style="padding: 8px;">${orderData.deliveryForm.email}</td>
					</tr>
					<tr>
						<td style="padding: 8px; font-weight: bold;">Telefon:</td>
						<td style="padding: 8px;">${orderData.deliveryForm.phone}</td>
					</tr>
					<tr style="background-color: #f9f9f9;">
						<td style="padding: 8px; font-weight: bold;">Adresa:</td>
						<td style="padding: 8px;">${orderData.deliveryForm.street}, ${orderData.deliveryForm.city}, ${orderData.deliveryForm.zip}</td>
					</tr>
					${
						orderData.deliveryForm.note
							? `
					<tr>
						<td style="padding: 8px; font-weight: bold;">Poznámka:</td>
						<td style="padding: 8px;">${orderData.deliveryForm.note}</td>
					</tr>`
							: ''
					}
				</table>

				<h2 style="color: #333; margin-top: 30px;">💳 ZPŮSOB PLATBY</h2>
				<p style="padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
					${orderData.paymentMethod === 'online' ? 'Google Pay / Apple Pay' : 'Dobírka (při doručení)'}
				</p>

				<h2 style="color: #333; margin-top: 30px;">🕯️ PRODUKTY</h2>
		`;

		// Добавляем товары
		orderData.cart.forEach((item, index) => {
			htmlContent += `
				<div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
					<h3 style="margin: 0 0 10px 0; color: #D4A574;">${index + 1}. ${item.name}</h3>
					${item.selectedColor ? `<p style="margin: 5px 0;"><strong>Barva:</strong> ${item.selectedColor}</p>` : ''}
					<p style="margin: 5px 0;"><strong>Cena:</strong> ${item.price} Kč</p>
					<p style="margin: 5px 0;"><strong>Množství:</strong> ${item.quantity}</p>
					<p style="margin: 5px 0;"><strong>Celkem:</strong> ${item.price * item.quantity} Kč</p>
				</div>
			`;
		});

		// Итоговая сумма
		const deliveryCost = orderData.totalPrice >= 1500 ? 0 : 150;
		const totalWithDelivery = orderData.totalPrice + deliveryCost;

		htmlContent += `
				<h2 style="color: #333; margin-top: 30px;">💰 SHRNUTÍ</h2>
				<table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-radius: 5px;">
					<tr>
						<td style="padding: 10px; font-weight: bold;">Mezisoučet:</td>
						<td style="padding: 10px; text-align: right;">${orderData.totalPrice} Kč</td>
					</tr>
					<tr>
						<td style="padding: 10px; font-weight: bold;">Doprava:</td>
						<td style="padding: 10px; text-align: right;">${deliveryCost === 0 ? 'Zdarma' : deliveryCost + ' Kč'}</td>
					</tr>
					<tr style="background-color: #D4A574; color: white;">
						<td style="padding: 15px; font-weight: bold; font-size: 18px;">CELKEM:</td>
						<td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">${totalWithDelivery} Kč</td>
					</tr>
				</table>

				<div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #D4A574;">
					<p style="margin: 0; color: #856404;">
						Toto je automatická notifikace o nové objednávce z vašeho e-shopu.
					</p>
				</div>
			</div>
		`;

		// Отправляем через Resend API
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'E-shop Abramova <onboarding@resend.dev>',
				to: process.env.EMAIL_RECIPIENT || 'abramovanataliia8@gmail.com',
				subject: `🛒 Nová objednávka od ${orderData.deliveryForm.name} ${orderData.deliveryForm.surname}`,
				html: htmlContent,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Resend API error:', errorData);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Ошибка отправки email:', error);
		return false;
	}
}

export async function POST(request: NextRequest) {
	try {
		const data: OrderData = await request.json();

		// Отправляем email
		const success = await sendEmail(data);

		if (!success) {
			return NextResponse.json(
				{ error: 'Nepodařilo se odeslat e-mail s objednávkou' },
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
