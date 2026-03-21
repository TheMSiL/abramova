'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AddToCartButtonProps {
	product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCartWithQuantity, isInCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleAddToCart = () => {
		addToCartWithQuantity(product, quantity);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	if (!product.inStock) {
		return null;
	}

	// Показываем форму выбора количества до монтирования
	if (!mounted) {
		return (
			<div className="mb-12 space-y-4">
				<div className="flex items-center gap-4">
					<span className="text-gray-300 font_nexa text-lg">Množství:</span>
					<div className="flex items-center border-2 border-marigold/50">
						<button className="px-4 py-2 text-2xl text-marigold hover:bg-marigold/10 transition-all">
							−
						</button>
						<span className="px-6 py-2 text-xl font_nexa text-white min-w-[60px] text-center">
							1
						</span>
						<button className="px-4 py-2 text-2xl text-marigold hover:bg-marigold/10 transition-all">
							+
						</button>
					</div>
					<span className="text-gray-400 ml-auto text-lg">
						{product.price} Kč
					</span>
				</div>
				<button className="hero_btn w-full py-4 text-xl">
					PŘIDAT DO KOŠÍKU
				</button>
			</div>
		);
	}

	const productInCart = isInCart(product.id);

	// Если товар уже в корзине, показываем кнопку перехода в корзину
	if (productInCart && !isAdded) {
		return (
			<div className="mb-12">
				<Link
					href="/cart"
					className="block w-full text-center py-4 text-xl border-2 border-marigold bg-marigold/10 text-marigold hover:bg-marigold hover:text-black transition-all font_nexa"
				>
					✓ V KOŠÍKU - ZOBRAZIT KOŠÍK
				</Link>
			</div>
		);
	}

	// После добавления показываем сообщение
	if (isAdded) {
		return (
			<div className="mb-12 space-y-4">
				<div className="w-full bg-green-600 text-white py-4 text-xl font_nexa text-center">
					✓ PŘIDÁNO DO KOŠÍKU
				</div>
				<Link
					href="/cart"
					className="block w-full text-center py-3 border-2 border-marigold text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-xl"
				>
					Zobrazit košík
				</Link>
			</div>
		);
	}

	// Форма выбора количества и добавления в корзину
	return (
		<div className="mb-12 space-y-4">
			{/* Quantity Selector */}
			<div className="flex items-center gap-4">
				<span className="text-gray-300 font_nexa text-lg">Množství:</span>
				<div className="flex items-center border-2 border-marigold/50">
					<button
						onClick={decrementQuantity}
						className="px-4 py-2 text-2xl text-marigold hover:bg-marigold/10 transition-all"
					>
						−
					</button>
					<span className="px-6 py-2 text-xl font_nexa text-white min-w-[60px] text-center">
						{quantity}
					</span>
					<button
						onClick={incrementQuantity}
						className="px-4 py-2 text-2xl text-marigold hover:bg-marigold/10 transition-all"
					>
						+
					</button>
				</div>
				<span className="text-gray-400 ml-auto text-lg">
					{product.price * quantity} Kč
				</span>
			</div>

			{/* Add to Cart Button */}
			<button
				onClick={handleAddToCart}
				className="hero_btn w-full py-4 text-xl"
			>
				PŘIDAT DO KOŠÍKU
			</button>
		</div>
	);
}
