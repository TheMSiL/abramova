'use client';

import { products } from '@/data/products';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';

	// Используем useMemo для вычисления результатов поиска
	const searchResults = useMemo(() => {
		if (query.trim()) {
			return products.filter(
				(product) =>
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					product.id.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase())
			);
		}
		return products;
	}, [query]);

	return (
		<main className="py-20">
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
					<p className="text-gray-400 mt-2">
						Nalezeno {searchResults.length} {searchResults.length === 1 ? 'produkt' : searchResults.length < 5 ? 'produkty' : 'produktů'}
					</p>
				</div>

				{/* Products Grid */}
				{searchResults.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{searchResults.map((product) => (
							<Link
								href={`/product/${product.id}`}
								key={product.id}
								className="group border-2 border-marigold/30 hover:border-marigold transition-all duration-300 overflow-hidden"
							>
								{/* Product Image */}
								<div className="relative h-[400px] overflow-hidden bg-gray-900">
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
									<div className="w-full h-full flex items-center justify-center text-6xl">
										🕯️
									</div>
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
											<span className="px-4 py-2 border-2 border-marigold text-marigold group-hover:bg-marigold group-hover:text-black transition-all duration-300 font_nexa">
												DETAIL
											</span>
										) : (
											<span className="px-4 py-2 border-2 border-gray-600 text-gray-600 font_nexa">
												VYPRODÁNO
											</span>
										)}
									</div>
								</div>
							</Link>
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
						<Link href="/categories" className="inline-block hero_btn font_nexa">
							Procházet Kategorie
						</Link>
					</div>
				)}

				{/* Back Button */}
				{searchResults.length > 0 && (
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
