'use client';

import { categories, getProductsByCategory } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoriesPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tabParam = searchParams.get('tab');

	// Определяем активную категорию (по умолчанию первая)
	const activeCategory = tabParam || 'glass';

	const currentCategory = categories.find(cat => cat.slug === activeCategory);
	const products = getProductsByCategory(activeCategory);

	const handleTabChange = (slug: string) => {
		router.push(`/categories?tab=${slug}`, { scroll: false });
	};

	return (
		<main className="py-20">
			<div className="content_container">
				{/* Page Title */}
				<div className="text-center mb-12">
					<h1 className="text-5xl md:text-6xl font_nexa mb-4 text-marigold">
						Naše Kategorie
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Vyberte si z naší nabídky ručně vyráběných svíček
					</p>
				</div>

				{/* Category Tabs */}
				<div className="flex justify-center gap-4 mb-16 flex-wrap">
					{categories.map((category) => (
						<button
							key={category.slug}
							onClick={() => handleTabChange(category.slug)}
							className={`px-8 py-3 font_nexa text-xl border-2 transition-all duration-300 ${activeCategory === category.slug
								? 'bg-marigold text-black border-marigold'
								: 'bg-transparent text-marigold border-marigold hover:bg-marigold hover:text-black'
								}`}
						>
							{category.name}
						</button>
					))}
				</div>

				{/* Category Description */}
				{currentCategory && (
					<div className="text-center mb-12">
						<p className="text-lg text-gray-300 max-w-3xl mx-auto">
							{currentCategory.description}
						</p>
					</div>
				)}

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
					{products.map((product) => (
						<Link
							href={`/product/${product.id}`}
							key={product.id}
							className="group border-2 border-marigold/30 hover:border-marigold transition-all duration-300 overflow-hidden"
						>
							{/* Product Image */}
							<div className="relative h-[300px] overflow-hidden">
								<Image src={product.image} alt={product.name} width='300' height='300' className="mx-auto object-contain aspect-square" />
								{!product.inStock && (
									<div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-4 py-2 text-sm font_nexa">
										VYPRODÁNO
									</div>
								)}
							</div>

							<div className="p-6">
								{product.weight || product.height ? (
									<div className="text-sm flex items-center gap-4 text-white/70 mb-2 h-4">
										<>
											{product.weight && <span>vaha {product.weight}</span>}
											{product.height && <span>h {product.height} mm</span>}
										</>
									</div>
								) : null}
								{
									product.aroma && (
										<div className="text-sm flex items-center gap-4 text-marigold/70 mb-2 h-4">
											<span>Aroma {product.aroma}</span>
										</div>
									)
								}
								{/* Name */}
								<h3 className="text-xl font_nexa my-3 group-hover:text-marigold transition-colors duration-300">
									{product.name}
								</h3>

								{/* Price and Button */}
								<div className="flex justify-between items-center mt-10">
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

				{/* Empty State */}
				{products.length === 0 && (
					<div className="text-center py-20">
						<p className="text-2xl text-gray-400">
							V této kategorii zatím nejsou žádné produkty.
						</p>
					</div>
				)}

				{/* Back Button */}
				<div className="mt-16 text-center">
					<Link href="/" className="inline-block hero_btn font_nexa">
						← Zpět do obchodu
					</Link>
				</div>
			</div>
		</main>
	);
}
