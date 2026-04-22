'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';

interface AddToCartButtonProps {
	product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCartWithQuantity, isInCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);

	const productInCart = useSyncExternalStore(
		() => () => { },
		() => isInCart(product.id),
		() => false
	);

	const handleAddToCart = () => {
		// Перевіряємо, чи є товар в наявності та чи достатньо на складі
		if (quantity > product.stock) {
			alert(`Na skladě je pouze ${product.stock} kusů`);
			return;
		}

		addToCartWithQuantity(product, quantity);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => {
			if (prev >= product.stock) {
				return prev;
			}
			return prev + 1;
		});
	};

	const decrementQuantity = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	if (!product.inStock || product.stock === 0) {
		return (
			<div className="mb-8 md:mb-12">
				<div className="w-full bg-red-600/20 border-2 border-red-600 text-red-400 py-3 md:py-4 text-base md:text-xl font_nexa text-center">
					NENÍ SKLADEM
				</div>
			</div>
		);
	}

	if (isAdded) {
		return (
			<div className="mb-8 md:mb-12 space-y-3 md:space-y-4">
				<div className="w-full bg-green-600 text-white py-3 md:py-4 text-base md:text-xl font_nexa text-center">
					✓ PŘIDÁNO DO KOŠÍKU
				</div>
				<Link
					href="/cart"
					className="block w-full text-center py-2 md:py-3 border-2 border-marigold text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-base md:text-xl"
				>
					Zobrazit košík
				</Link>
			</div>
		);
	}

	return (
		<div className="mb-8 md:mb-12 space-y-3 md:space-y-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
				<span className="text-gray-300 font_nexa text-base md:text-lg">Množství:</span>
				<div className="flex items-center border-2 border-marigold/50 w-full sm:w-auto">
					<button
						onClick={decrementQuantity}
						className="px-3 md:px-4 py-2 text-xl md:text-2xl text-marigold hover:bg-marigold/10 transition-all flex-1 sm:flex-none"
					>
						−
					</button>
					<span className="px-4 md:px-6 py-2 text-lg md:text-xl font_nexa text-white min-w-[60px] text-center flex-1 sm:flex-none">
						{quantity}
					</span>
					<button
						onClick={incrementQuantity}
						className="px-3 md:px-4 py-2 text-xl md:text-2xl text-marigold hover:bg-marigold/10 transition-all flex-1 sm:flex-none"
					>
						+
					</button>
				</div>
				<span className="text-gray-400 sm:ml-auto text-base md:text-lg">
					{product.price * quantity} Kč
				</span>
			</div>

			<button
				onClick={handleAddToCart}
				disabled={productInCart && !isAdded}
				className={`w-full py-3 md:py-4 text-lg md:text-xl font_nexa rounded-2xl transition-all ${productInCart && !isAdded
					? 'bg-marigold text-black border-2 border-marigold cursor-not-allowed'
					: 'hero_btn'
					}`}
			>
				{productInCart && !isAdded ? 'UŽ V KOŠÍKU' : 'PŘIDAT DO KOŠÍKU'}
			</button>
		</div>
	);
}
