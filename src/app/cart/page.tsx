'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

	if (cart.length === 0) {
		return (
			<main className="py-20 flex-1">
				<div className="content_container">
					<div className="text-center py-20">
						<div className="text-6xl mb-6">🛒</div>
						<h1 className="text-4xl font_nexa text-gray-400 mb-4">
							Váš košík je prázdný
						</h1>
						<p className="text-gray-500 mb-8">
							Přidejte produkty do košíku a začněte nakupovat
						</p>
						<Link href="/categories" className="inline-block hero_btn font_nexa">
							Procházet Produkty
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="py-20 flex-1">
			<div className="content_container">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-5xl md:text-6xl font_nexa mb-4 text-marigold">
						Nákupní Košík
					</h1>
					<p className="text-gray-300">
						Máte {cart.length} {cart.length === 1 ? 'produkt' : cart.length < 5 ? 'produkty' : 'produktů'} v košíku
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="border-2 border-marigold/30 p-6 flex gap-6"
							>
								{/* Product Image */}
								<div className="w-32 h-32 bg-gray-900 flex items-center justify-center text-4xl flex-shrink-0">
									🕯️
								</div>

								{/* Product Info */}
								<div className="flex-1">
									<Link
										href={`/product/${item.id}`}
										className="text-xl font_nexa text-marigold hover:underline mb-2 block"
									>
										{item.name}
									</Link>
									<p className="text-sm text-gray-500 mb-2">Kód: {item.id}</p>

									<p className="text-2xl font_nexa text-marigold mb-4">
										{item.price} Kč
									</p>

									{/* Quantity Controls */}
									<div className="flex items-center gap-4">
										<div className="flex items-center border-2 border-marigold">
											<button
												onClick={() => updateQuantity(item.id, item.quantity - 1)}
												className="px-4 py-2 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-xl"
											>
												−
											</button>
											<span className="px-6 py-2 border-x-2 border-marigold text-white font_nexa">
												{item.quantity}
											</span>
											<button
												onClick={() => updateQuantity(item.id, item.quantity + 1)}
												className="px-4 py-2 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-xl"
											>
												+
											</button>
										</div>

										<button
											onClick={() => removeFromCart(item.id)}
											className="px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
										>
											Odebrat
										</button>
									</div>
								</div>

								{/* Item Total */}
								<div className="text-right">
									<p className="text-sm text-gray-500 mb-2">Celkem</p>
									<p className="text-2xl font_nexa text-marigold">
										{item.price * item.quantity} Kč
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="border-2 border-marigold/30 p-6 sticky top-20">
							<h2 className="text-2xl font_nexa text-marigold mb-6">
								Shrnutí objednávky
							</h2>

							<div className="space-y-4 mb-6">
								<div className="flex justify-between text-gray-300">
									<span>Mezisoučet:</span>
									<span>{getTotalPrice()} Kč</span>
								</div>
								<div className="flex justify-between text-gray-300">
									<span>Doprava:</span>
									<span>{getTotalPrice() >= 1500 ? 'Zdarma' : '150 Kč'}</span>
								</div>
								{getTotalPrice() >= 1000 && (
									<div className="flex justify-between text-green-400">
										<span>Dárek zdarma:</span>
										<span>✓</span>
									</div>
								)}
								<div className="border-t-2 border-gray-700 pt-4">
									<div className="flex justify-between text-2xl font_nexa text-marigold">
										<span>Celkem:</span>
										<span>{getTotalPrice() >= 1500 ? getTotalPrice() : getTotalPrice() + 150} Kč</span>
									</div>
								</div>
							</div>

							<button className="hero_btn w-full mb-4 py-3">
								Pokračovat k pokladně
							</button>

							<button
								onClick={clearCart}
								className="w-full px-4 py-2 border-2 border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-600 transition-all"
							>
								Vyprázdnit košík
							</button>

							<div className="mt-6 pt-6 border-t-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-3">Výhody:</h3>
								<ul className="space-y-2 text-sm text-gray-300">
									<li>🚚 Doprava zdarma nad 1500 Kč</li>
									<li>🎁 Dárek zdarma nad 1000 Kč</li>
									<li>🌱 Přírodní sójový vosk</li>
									<li>🇨🇿 Ručně vyrobeno v ČR</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Continue Shopping */}
				<div className="mt-12 text-center">
					<Link href="/categories" className="inline-block hero_btn font_nexa">
						← Pokračovat v nákupu
					</Link>
				</div>
			</div>
		</main>
	);
}
