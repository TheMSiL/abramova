'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const { cart, addToCart } = useCart();

	const isInCart = (productId: string) => {
		return cart.some((item) => item.id === productId);
	};

	const handleAddToCart = (product: Product) => {
		if (product.colorOptions && product.colorOptions.length > 0) {
			// If product has color options, add with first color by default
			addToCart(product, product.colorOptions[0].value);
		} else {
			addToCart(product);
		}
	};

	// Загружаем результаты поиска
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const url = query
					? `/api/products?search=${encodeURIComponent(query)}`
					: '/api/products';
				const response = await fetch(url);
				if (response.ok) {
					const data = await response.json();
					setProducts(data);
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [query]);

	return (
		<main className="py-20 bg-black min-h-screen">
			<div className="content_container">
				{/* Search Header */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font_nexa mb-4 text-marigold">
						Výsledky vyhledávání
					</h1>
					{query && (
						<p className="text-xl text-gray-300 max-w-2xl mx-auto">
							Hledáte: <span className="text-marigold font_nexa">&quot;{query}&quot;</span>
						</p>
					)}
					{!loading && (
						<p className="text-gray-400 mt-2">
							Nalezeno {products.length} {products.length === 1 ? 'produkt' : products.length < 5 ? 'produkty' : 'produktů'}
						</p>
					)}
				</div>

				{/* Loading State */}
				{loading && (
					<div className="text-center py-20">
						<p className="text-xl text-gray-400">
							Načítání produktů...
						</p>
					</div>
				)}

				{/* Products Grid */}
				{!loading && products.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map((product) => (
							<div
								key={product.id}
								className="group border-2 border-marigold/30 hover:border-marigold transition-all duration-300 overflow-hidden"
							>
								{/* Product Image */}
								<div className="relative h-[400px] overflow-hidden bg-gray-900">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
									{!product.inStock && (
										<div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-4 py-2 text-sm font_nexa">
											VYPRODÁNO
										</div>
									)}
								</div>

								{/* Product Info */}
								<div className="p-6">
									{/* Weight and Height */}
									<div className="text-xs text-gray-500 mb-2 h-4">
										{product.weight || product.height ? (
											<>
												{product.weight && <span>{product.weight}</span>}
												{product.weight && product.height && <span className="mx-1">•</span>}
												{product.height && <span>{product.height}</span>}
											</>
										) : null}
									</div>

									{/* Name */}
									<h3 className="text-xl font_nexa mb-3 group-hover:text-marigold transition-colors duration-300">
										{product.name}
									</h3>


									{/* Price and Button */}
									<div className="flex justify-between items-center">
										<span className="text-2xl font_nexa text-marigold">
											{product.price} Kč
										</span>
										{product.inStock ? (
											<button
												onClick={() => handleAddToCart(product)}
												disabled={isInCart(product.id)}
												className={`px-4 py-2 border-2 transition-all duration-300 font_nexa ${isInCart(product.id)
													? 'border-marigold bg-marigold text-black cursor-not-allowed'
													: 'border-marigold text-marigold hover:bg-marigold hover:text-black'
													}`}
											>
												{isInCart(product.id) ? 'V KOŠÍKU' : 'DO KOŠÍKU'}
											</button>
										) : (
											<span className="px-4 py-2 border-2 border-gray-600 text-gray-600 font_nexa">
												VYPRODÁNO
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<div className="text-6xl mb-6">🔍</div>
						<h2 className="text-3xl font_nexa text-gray-400 mb-4">
							Nenalezeny žádné produkty
						</h2>
						<p className="text-gray-500 mb-8">
							Zkuste změnit hledaný výraz nebo procházet naše kategorie
						</p>
						<Link href="/e-shop" className="inline-block hero_btn font_nexa">
							Procházet Kategorie
						</Link>
					</div>
				)}

				{/* Back Button */}
				{products.length > 0 && (
					<div className="mt-16 text-center">
						<Link href="/" className="inline-block hero_btn font_nexa">
							← Zpět do obchodu
						</Link>
					</div>
				)}
			</div>
		</main>
	);
}
