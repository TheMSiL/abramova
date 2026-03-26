'use client';

import {
	PaymentElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { useState } from 'react';

interface DeliveryForm {
	name: string;
	surname: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	zip: string;
	note: string;
}

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	selectedColor?: string;
}

interface CheckoutFormProps {
	amount: number;
	deliveryForm: DeliveryForm;
	cart: CartItem[];
	totalPrice: number;
}

export default function CheckoutForm({ amount, deliveryForm, cart, totalPrice }: CheckoutFormProps) {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Валидация формы доставки
		if (!deliveryForm.name || !deliveryForm.surname || !deliveryForm.email ||
			!deliveryForm.phone || !deliveryForm.street || !deliveryForm.city || !deliveryForm.zip) {
			setMessage('Vyplňte prosím všechna povinná pole doručení');
			return;
		}

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);
		setMessage(null);

		// Сохраняем данные заказа в localStorage перед оплатой
		const orderData = {
			deliveryForm,
			cart,
			totalPrice,
		};
		localStorage.setItem('pendingOrder', JSON.stringify(orderData));

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment-success`,
				receipt_email: deliveryForm.email,
			},
		});

		if (error) {
			if (error.type === 'card_error' || error.type === 'validation_error') {
				setMessage(error.message || 'Neplatná platba');
			} else {
				setMessage('Neočekávaná chyba.');
			}
			// Удаляем сохраненные данные при ошибке
			localStorage.removeItem('pendingOrder');
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<PaymentElement
				id="payment-element"
				options={{
					layout: 'tabs',
					wallets: {
						googlePay: 'auto',
						applePay: 'never',
					},
				}}
			/>

			<button
				disabled={isLoading || !stripe || !elements}
				className="w-full hero_btn font_nexa text-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Zpracovává se...' : `Zaplatit ${amount} Kč`}
			</button>

			{message && (
				<div className={`text-center text-sm ${message.includes('úspěšná') ? 'text-green-500' : 'text-red-500'
					}`}>
					{message}
				</div>
			)}
		</form>
	);
}
