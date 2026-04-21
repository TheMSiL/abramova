'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

function PaymentSuccessContent() {
	const searchParams = useSearchParams();
	const { clearCart } = useCart();
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const hasProcessed = useRef(false);

	useEffect(() => {
		if (hasProcessed.current) return;
		hasProcessed.current = true;

		const processPayment = async () => {
			const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
			const paymentIntent = searchParams.get('payment_intent');

			if (!paymentIntentClientSecret) {
				setError('Neplatný odkaz platby');
				setIsProcessing(false);
				return;
			}

			// Получаем данные заказа из localStorage
			const orderData = localStorage.getItem('pendingOrder');

			if (!orderData) {
				// Если нет данных заказа, просто очищаем корзину
				clearCart();
				setIsProcessing(false);
				return;
			}

			const order = JSON.parse(orderData);

			// Резервируем товары (уменьшаем stock)
			try {
				const items = order.cart.map((item: { id: string; quantity: number }) => ({
					id: item.id,
					quantity: item.quantity,
				}));

				const reserveResponse = await fetch('/api/reserve-stock', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ items }),
				});

				if (!reserveResponse.ok) {
					const reserveError = await reserveResponse.json();
					console.error('Chyba při rezervaci skladu:', reserveError);
					setError(reserveError.error || 'Chyba při rezervaci skladu');
					setIsProcessing(false);
					return;
				}
			} catch (err) {
				console.error('Chyba při rezervaci skladu:', err);
				setError('Nepodařilo se rezervovat zboží');
				setIsProcessing(false);
				return;
			}

			// Отправляем на email
			try {
				const response = await fetch('/api/send-email', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						...order,
						paymentMethod: 'online',
						paymentIntentId: paymentIntent,
					}),
				});

				const data = await response.json();

				if (data.success) {
					// Очищаем корзину и сохраненные данные
					clearCart();
					localStorage.removeItem('pendingOrder');
				}
			} catch (err) {
				console.error('Chyba při odesílání objednávky:', err);
			} finally {
				setIsProcessing(false);
			}
		};

		processPayment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isProcessing) {
		return (
			<main className="py-10 md:py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-10 md:py-20 px-4">
						<div className="text-6xl mb-6 animate-pulse">⏳</div>
						<h1 className="text-3xl md:text-4xl font_nexa text-marigold mb-4">
							Zpracování objednávky...
						</h1>
						<p className="text-gray-400">
							Prosím čekejte, dokud nezpracujeme vaši objednávku
						</p>
					</div>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="py-10 md:py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-10 md:py-20 px-4">
						<div className="text-6xl mb-6">❌</div>
						<h1 className="text-3xl md:text-4xl font_nexa text-red-500 mb-4">
							Chyba
						</h1>
						<p className="text-gray-400 mb-8">{error}</p>
						<Link href="/cart" className="inline-block hero_btn font_nexa text-lg">
							Zpět do košíku
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="py-10 md:py-20 flex-1">
			<div className="content_container">
				<div className="text-center py-10 md:py-20 px-4 max-w-2xl mx-auto">
					<div className="text-6xl md:text-8xl mb-6 animate-bounce">✓</div>
					<h1 className="text-3xl md:text-5xl font_nexa text-marigold mb-4">
						Platba byla úspěšná!
					</h1>
					<p className="text-lg md:text-xl text-gray-300 mb-8">
						Děkujeme za vaši objednávku. Brzy vás budeme kontaktovat s potvrzením a informacemi o doručení.
					</p>

					<div className="bg-marigold/10 border-2 border-marigold p-6 mb-8 text-left">
						<h2 className="font_nexa text-xl text-marigold mb-3">Co bude dál?</h2>
						<ul className="space-y-2 text-gray-300">
							<li>✉️ Obdržíte potvrzovací e-mail</li>
							<li>📦 Připravíme vaši objednávku</li>
							<li>🚚 Odešleme ji na vámi uvedenou adresu</li>
							<li>📞 Budeme vás informovat o stavu zásilky</li>
						</ul>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/e-shop"
							className="border-2 text-center flex items-center justify-center border-nugget px-6 py-2 text-black bg-nugget hover:bg-marigold hover:border-marigold transition-all duration-300 font_nexa"
						>
							Pokračovat v nákupu
						</Link>
						<Link
							href="/"
							className="px-6 py-3 border-2 border-marigold duration-300 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-lg inline-block"
						>
							Domovská stránka
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

export default function PaymentSuccessPage() {
	return (
		<Suspense fallback={
			<main className="py-10 md:py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-10 md:py-20 px-4">
						<div className="text-6xl mb-6 animate-pulse">⏳</div>
						<h1 className="text-3xl md:text-4xl font_nexa text-marigold mb-4">
							Načítání...
						</h1>
					</div>
				</div>
			</main>
		}>
			<PaymentSuccessContent />
		</Suspense>
	);
}
