'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

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
						<Link href="/categories" className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl">
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
									<div className="w-24 h-24 md:w-32 md:h-32 bg-gray-900 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 mx-auto md:mx-0">
										🕯️
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
													onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
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

							<button className="hero_btn w-full mb-3 md:mb-4 py-2 md:py-3 text-base md:text-lg lg:text-xl">
								Pokračovat k pokladně
							</button>

							<button
								onClick={clearCart}
								className="w-full px-4 py-2 border-2 border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-600 transition-all text-sm md:text-base"
							>
								Vyprázdnit košík
							</button>

							<div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t-2 border-gray-700">
								<h3 className="font_nexa text-marigold mb-2 md:mb-3 text-sm md:text-base">Výhody:</h3>
								<ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-300">
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
				<div className="mt-8 md:mt-12 text-center">
					<Link href="/categories" className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl">
						← Pokračovat v nákupu
					</Link>
				</div>
			</div>
		</main>
	);
}
