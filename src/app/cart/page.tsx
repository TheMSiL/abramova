'use client';

// Временно закомментированы импорты для Stripe
// import CheckoutForm from '@/components/CheckoutForm';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
	const [paymentMethod, setPaymentMethod] = useState<'online' | 'dobírka'>('dobírka'); // Временно только dobírka
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
	// const [clientSecret, setClientSecret] = useState(''); // Временно не используется
	const [isMounted, setIsMounted] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [deliveryForm, setDeliveryForm] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		street: '',
		city: '',
		zip: '',
		note: ''
	});

	const totalWithShipping = getTotalPrice() >= 1500 ? getTotalPrice() : getTotalPrice() + 150;

	// Предотвращаем hydration ошибку
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Создаем Payment Intent при выборе онлайн оплаты - ВРЕМЕННО ОТКЛЮЧЕНО
	/*
	useEffect(() => {
		if (paymentMethod === 'online' && cart.length > 0) {
			fetch('/api/create-payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: totalWithShipping,
					currency: 'czk',
				}),
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret))
				.catch((error) => console.error('Chyba při vytváření platby:', error));
		}
	}, [paymentMethod, cart.length, totalWithShipping]);
	*/

	const handleCheckout = async (e: React.FormEvent) => {
		e.preventDefault();

		// Простая валидация
		if (!deliveryForm.name || !deliveryForm.surname || !deliveryForm.email ||
			!deliveryForm.phone || !deliveryForm.street || !deliveryForm.city || !deliveryForm.zip) {
			setToast({ message: 'Vyplňte prosím všechna povinná pole', type: 'warning' });
			return;
		}

		setIsSubmitting(true);
		setOrderStatus('idle');

		try {
			// 1. Спочатку перевіряємо та резервуємо stock
			const reserveResponse = await fetch('/api/reserve-stock', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					items: cart.map(item => ({
						id: item.id,
						quantity: item.quantity,
					})),
				}),
			});

			const reserveData = await reserveResponse.json();

			if (!reserveResponse.ok) {
				// Якщо недостатньо товару на складі
				if (reserveData.productName) {
					setToast({ 
						message: `${reserveData.productName} - skladem pouze ${reserveData.available} ks`, 
						type: 'error' 
					});
				} else {
					setToast({ message: reserveData.error || 'Některé produkty již nejsou skladem', type: 'error' });
				}
				setOrderStatus('error');
				setIsSubmitting(false);
				return;
			}

			// 2. Якщо stock зарезервовано успішно, відправляємо email
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					deliveryForm,
					paymentMethod,
					cart,
					totalPrice: getTotalPrice(),
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setOrderStatus('success');
				// Очищаем корзину после успешного заказа
				setTimeout(() => {
					clearCart();
					setDeliveryForm({
						name: '',
						surname: '',
						email: '',
						phone: '',
						street: '',
						city: '',
						zip: '',
						note: ''
					});
				}, 2000);
			} else {
				setOrderStatus('error');
				setToast({ message: data.error || 'Něco se pokazilo. Zkuste to prosím znovu.', type: 'error' });
			}
		} catch (error) {
			console.error('Chyba při odesílání objednávky:', error);
			setOrderStatus('error');
			setToast({ message: 'Nepodařilo se odeslat objednávku. Zkontrolujte připojení k internetu.', type: 'error' });
		} finally {
			setIsSubmitting(false);
		}
	};

	// Предотвращаем hydration ошибку - показываем loading до монтирования
	if (!isMounted) {
		return (
			<main className="py-10 md:py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-10 md:py-20 px-4">
						<div className="text-4xl md:text-6xl mb-4 md:mb-6">🛒</div>
						<h1 className="text-2xl md:text-3xl lg:text-4xl font_nexa text-gray-400 mb-3 md:mb-4">
							Načítání košíku...
						</h1>
					</div>
				</div>
			</main>
		);
	}

	if (cart.length === 0) {
		return (
			<main className="py-10 md:py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-10 md:py-20 px-4">
						<div className="text-4xl md:text-6xl mb-4 md:mb-6">🛒</div>
						<h1 className="text-2xl md:text-3xl lg:text-4xl font_nexa text-gray-400 mb-3 md:mb-4">
							Váš košík je prázdný
						</h1>
						<p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
							Přidejte produkty do košíku a začněte nakupovat
						</p>
						<Link href="/e-shop" className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl">
							Procházet Produkty
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="py-10 md:py-20 flex-1">
			<div className="content_container">
				{/* Header */}
				<div className="mb-8 md:mb-12">
					<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font_nexa mb-3 md:mb-4 text-marigold">
						Nákupní Košík
					</h1>
					<p className="text-sm md:text-base text-gray-300">
						Máte {cart.length} {cart.length === 1 ? 'produkt' : cart.length < 5 ? 'produkty' : 'produktů'} v košíku
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-3 md:space-y-4">
						{cart.map((item) => {
							const colorName = item.selectedColor
								? item.colorOptions?.find(c => c.value === item.selectedColor)?.name
								: null;

							return (
								<div
									key={`${item.id}-${item.selectedColor || 'default'}`}
									className="border-2 border-marigold/30 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6"
								>
									{/* Product Image */}
									<div className="w-48 h-48 md:w-32 md:h-32 bg-gray-900 flex-shrink-0 mx-auto md:mx-0 relative overflow-hidden border border-marigold/20">
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-cover"
										/>
									</div>

									{/* Product Info */}
									<div className="flex-1">
										<h3 className="text-lg md:text-xl font_nexa text-marigold mb-2">
											{item.name}
										</h3>
										{colorName && (
											<p className="text-sm md:text-base text-gray-400 mb-2">
												Barva: <span className="text-marigold">{colorName}</span>
											</p>
										)}
										<p className="text-xs md:text-sm text-gray-500 mb-2">Kód: {item.id}</p>

										<p className="text-xl md:text-2xl font_nexa text-marigold mb-3 md:mb-4">
											{item.price} Kč
										</p>

										{/* Quantity Controls */}
										<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
											<div className="flex items-center border-2 border-marigold w-full sm:w-auto">
												<button
													onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)}
													className="px-3 md:px-4 py-2 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-lg md:text-xl flex-1 sm:flex-none"
												>
													−
												</button>
												<span className="px-4 md:px-6 py-2 border-x-2 border-marigold text-white font_nexa flex-1 sm:flex-none text-center">
													{item.quantity}
												</span>
												<button
													onClick={() => {
														if (item.quantity >= item.stock) {
														setToast({ message: `Na skladě je pouze ${item.stock} kusů`, type: 'warning' });
															return;
														}
														updateQuantity(item.id, item.quantity + 1, item.selectedColor);
													}}
													className="px-3 md:px-4 py-2 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-lg md:text-xl flex-1 sm:flex-none"
												>
													+
												</button>
											</div>

											<button
												onClick={() => removeFromCart(item.id, item.selectedColor)}
												className="px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all text-sm md:text-base w-full sm:w-auto"
											>
												Odebrat
											</button>
										</div>
									</div>

									{/* Item Total */}
									<div className="text-center md:text-right mt-2 md:mt-0">
										<p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Celkem</p>
										<p className="text-xl md:text-2xl font_nexa text-marigold">
											{item.price * item.quantity} Kč
										</p>
									</div>
								</div>
							);
						})}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="border-2 border-marigold/30 p-4 md:p-6 lg:sticky lg:top-20">
							<h2 className="text-xl md:text-2xl font_nexa text-marigold mb-4 md:mb-6">
								Shrnuti objednavky
							</h2>

							<div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
								<div className="flex justify-between text-sm md:text-base text-gray-300">
									<span>Mezisoučet:</span>
									<span>{getTotalPrice()} Kč</span>
								</div>
								<div className="flex justify-between text-sm md:text-base text-gray-300">
									<span>Doprava:</span>
									<span>{getTotalPrice() >= 1500 ? 'Zdarma' : '150 Kč'}</span>
								</div>
								{getTotalPrice() >= 1000 && (
									<div className="flex justify-between text-sm md:text-base text-green-400">
										<span>Dárek zdarma:</span>
										<span>✓</span>
									</div>
								)}
								<div className="border-t-2 border-gray-700 pt-3 md:pt-4">
									<div className="flex justify-between text-xl md:text-2xl font_nexa text-marigold">
										<span>Celkem:</span>
										<span>{getTotalPrice() >= 1500 ? getTotalPrice() : getTotalPrice() + 150} Kč</span>
									</div>
								</div>
							</div>



							{/* Delivery Form */}
							<div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-3 md:mb-4 text-base md:text-lg">
									Doručovací údaje:
								</h3>
								<div className="space-y-3">
									<div className="grid grid-cols-2 gap-3">
										<input
											type="text"
											placeholder="Jméno *"
											value={deliveryForm.name}
											onChange={(e) => setDeliveryForm({ ...deliveryForm, name: e.target.value })}
											className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
											required
										/>
										<input
											type="text"
											placeholder="Příjmení *"
											value={deliveryForm.surname}
											onChange={(e) => setDeliveryForm({ ...deliveryForm, surname: e.target.value })}
											className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
											required
										/>
									</div>
									<input
										type="email"
										placeholder="Email *"
										value={deliveryForm.email}
										onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })}
										className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
										required
									/>
									<input
										type="tel"
										placeholder="Telefon *"
										value={deliveryForm.phone}
										onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })}
										className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
										required
									/>
									<input
										type="text"
										placeholder="Ulice a číslo popisné *"
										value={deliveryForm.street}
										onChange={(e) => setDeliveryForm({ ...deliveryForm, street: e.target.value })}
										className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
										required
									/>
									<div className="grid grid-cols-2 gap-3">
										<input
											type="text"
											placeholder="Město *"
											value={deliveryForm.city}
											onChange={(e) => setDeliveryForm({ ...deliveryForm, city: e.target.value })}
											className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
											required
										/>
										<input
											type="text"
											placeholder="PSČ *"
											value={deliveryForm.zip}
											onChange={(e) => setDeliveryForm({ ...deliveryForm, zip: e.target.value })}
											className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none"
											required
										/>
									</div>
									<textarea
										placeholder="Poznámka k objednávce (volitelné)"
										value={deliveryForm.note}
										onChange={(e) => setDeliveryForm({ ...deliveryForm, note: e.target.value })}
										className="w-full bg-transparent border border-marigold/30 text-white p-2 md:p-3 text-sm md:text-base focus:border-marigold focus:outline-none resize-none"
										rows={3}
									/>
								</div>
							</div>

							{/* Payment Method Selection - ВРЕМЕННО СКРЫТО */}
							{/* 
							<div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-3 md:mb-4 text-base md:text-lg">
									Způsob platby:
								</h3>
								<div className="space-y-2 md:space-y-3">
									<label
										className={`flex items-center gap-3 p-3 border-2 rounded cursor-pointer transition-all ${paymentMethod === 'online'
											? 'border-marigold bg-marigold/10'
											: 'border-white/20 hover:border-marigold/50'
											}`}
									>
										<input
											type="radio"
											name="payment"
											value="online"
											checked={paymentMethod === 'online'}
											onChange={(e) => setPaymentMethod(e.target.value as 'online')}
											className="w-4 h-4 md:w-5 md:h-5 accent-marigold"
										/>
										<div className="flex-1">
											<span className="text-sm md:text-base font_nexa">Google Pay / Kartou</span>
											<p className="text-xs text-gray-400 mt-1">Rychlá a bezpečná online platba</p>
										</div>
									</label>

									<label
										className={`flex items-center gap-3 p-3 border-2 rounded cursor-pointer transition-all ${paymentMethod === 'dobírka'
											? 'border-marigold bg-marigold/10'
											: 'border-white/20 hover:border-marigold/50'
											}`}
									>
										<input
											type="radio"
											name="payment"
											value="dobírka"
											checked={paymentMethod === 'dobírka'}
											onChange={(e) => setPaymentMethod(e.target.value as 'dobírka')}
											className="w-4 h-4 md:w-5 md:h-5 accent-marigold"
										/>
										<div className="flex-1">
											<span className="text-sm md:text-base font_nexa">Dobírka (při doručení)</span>
											<p className="text-xs text-gray-400 mt-1">Zaplatíte při převzetí zásilky</p>
										</div>
									</label>
								</div>
							</div>
							*/}

							{/* Текущий способ оплаты */}
							<div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-3 md:mb-4 text-base md:text-lg">
									Způsob platby:
								</h3>
								<div className="flex items-center gap-3 p-3 border-2 border-marigold bg-marigold/10 rounded">
									<div className="flex-1">
										<span className="text-sm md:text-base font_nexa">Dobírka (při doručení)</span>
										<p className="text-xs text-gray-400 mt-1">Zaplatíte při převzetí zásilky</p>
									</div>
								</div>
							</div>

							{/* Stripe Payment Form or Cash on Delivery */}
							{/* Временно скрыта онлайн оплата */}
							{/* 
							{paymentMethod === 'online' ? (
								<div className="mb-4 md:mb-6">
									{clientSecret && (
										<Elements
											options={{
												clientSecret,
												appearance: {
													theme: 'night',
													variables: {
														colorPrimary: '#FFD700',
														colorBackground: '#000000',
														colorText: '#ffffff',
														borderRadius: '0px',
													},
												},
											}}
											stripe={stripePromise}
										>
											<CheckoutForm
												amount={totalWithShipping}
												deliveryForm={deliveryForm}
												cart={cart}
												totalPrice={getTotalPrice()}
											/>
										</Elements>
									)}
									{!clientSecret && (
										<div className="text-center text-gray-400 py-4">
											Načítání platební brány...
										</div>
									)}
								</div>
							) : (
							*/}
							<>
								<button
									onClick={handleCheckout}
									disabled={isSubmitting}
									className={`hero_btn w-full mb-3 md:mb-4 py-2 md:py-3 text-base md:text-lg lg:text-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
										}`}
								>
									{isSubmitting ? 'Odesílání...' : orderStatus === 'success' ? '✓ Objednávka odeslána!' : 'Odeslat objednávku'}
								</button>
								{/* )} */}
							</>

							{orderStatus === 'success' && (
								<div className="mb-3 p-3 bg-green-600/20 border border-green-600 text-green-400 text-center text-sm md:text-base">
									✓ Objednávka byla úspěšně odeslána! Brzy vás budeme kontaktovat.
								</div>
							)}

							{orderStatus === 'error' && (
								<div className="mb-3 p-3 bg-red-600/20 border border-red-600 text-red-400 text-center text-sm md:text-base">
									✗ Chyba při odesílání. Zkuste to prosím znovu.
								</div>
							)}

							<button
						onClick={() => setShowConfirmModal(true)}
							>
								Vyprázdnit košík
							</button>

							<div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-2 md:mb-3 text-sm md:text-base">Výhody:</h3>
								<ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-300">
									<li>🚚 Doprava zdarma nad 1500 Kč</li>
									<li>🎁 Dárek zdarma nad 1000 Kč</li>
									<li>🌱 Přírodní vosk</li>
									<li>🇨🇿 Ručně vyrobeno v ČR</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Continue Shopping */}
				<div className="mt-8 md:mt-12 text-center">
					<Link href="/e-shop" className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl">
						← Pokračovat v nákupu
					</Link>
				</div>
			</div>

			{/* Toast Notification */}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}

			{/* Confirm Modal */}
			{showConfirmModal && (
				<ConfirmModal
					message="Opravdu chcete vyprázdnit košík?"
					onConfirm={() => {
						clearCart();
						setShowConfirmModal(false);
					}}
					onCancel={() => setShowConfirmModal(false)}
				/>
			)}
		</main>
	);
}
