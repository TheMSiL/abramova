'use client';

import ColorSelectionModal from '@/components/ColorSelectionModal';
import { useCart } from '@/context/CartContext';
import { categories, getProductsByCategory } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CategoriesPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { addToCart } = useCart();
	const tabParam = searchParams.get('tab');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);

	// Определяем активную категорию (по умолчанию первая)
	const activeCategory = tabParam || 'glass';

	const currentCategory = categories.find(cat => cat.slug === activeCategory);
	const products = getProductsByCategory(activeCategory);

	const handleTabChange = (slug: string) => {
		router.push(`/categories?tab=${slug}`, { scroll: false });
	};

	const handleAddToCart = (product: any) => {
		if (product.colorOptions && product.colorOptions.length > 0) {
			// Открываем модалку для выбора цвета
			setSelectedProduct(product);
			setIsModalOpen(true);
		} else {
			// Добавляем в корзину сразу
			addToCart(product);
		}
	};

	const handleAddToCartWithColor = (selectedColor: string) => {
		if (selectedProduct) {
			addToCart(selectedProduct, selectedColor);
			setSelectedProduct(null);
		}
	};

	return (
		<main className="py-10 md:py-20">
			<div className="content_container">
				{/* Page Title */}
				<div className="text-center mb-8 md:mb-12">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font_nexa mb-3 md:mb-4 text-marigold">
						Naše Kategorie
					</h1>
					<p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
						Vyberte si z naší nabídky ručně vyráběných svíček
					</p>
				</div>

				{/* Category Tabs */}
				<div className="flex justify-center gap-2 md:gap-4 mb-10 md:mb-16 flex-wrap px-2">
					{categories.map((category) => (
						<button
							key={category.slug}
							onClick={() => handleTabChange(category.slug)}
							className={`px-4 md:px-6 lg:px-8 py-2 md:py-3 font_nexa text-base md:text-lg lg:text-xl border-2 transition-all duration-300 ${activeCategory === category.slug
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
					<div className="text-center mb-8 md:mb-12 px-4">
						<p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
							{currentCategory.description}
						</p>
					</div>
				)}

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
					{products.map((product) => (
						<div
							key={product.id}
							className="group border-2 border-marigold/30 hover:border-marigold transition-all duration-300 overflow-hidden"
						>
							{/* Product Image */}
							<div className="relative h-[250px] md:h-[300px] overflow-hidden">
								<Image src={product.image} alt={product.name} width='300' height='300' className="mx-auto object-contain aspect-square" />
								{!product.inStock && (
									<div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font_nexa">
										VYPRODÁNO
									</div>
								)}
							</div>

							<div className="p-4 md:p-6">
								{product.weight || product.height ? (
									<div className="text-xs md:text-sm flex items-center gap-4 text-white/70 mb-2 h-4">
										<>
											{product.weight && <span>vaha {product.weight}</span>}
											{product.height && <span>h {product.height} mm</span>}
										</>
									</div>
								) : null}
								{
									product.aroma && (
										<div className="text-xs md:text-sm flex items-center gap-4 text-marigold/70 mb-2 h-4">
											<span>Aroma {product.aroma}</span>
										</div>
									)
								}
								{/* Name */}
								<h3 className="text-lg md:text-xl font_nexa my-2 md:my-3 group-hover:text-marigold transition-colors duration-300">
									{product.name}
								</h3>

								{/* Price and Button */}
								<div className="flex justify-between items-center mt-6 md:mt-10">
									<span className="text-xl md:text-2xl font_nexa text-marigold">
										{product.price} Kč
									</span>
									{product.inStock ? (
										<button
											onClick={() => handleAddToCart(product)}
											className="px-3 py-2 md:px-4 md:py-2 border-2 border-marigold text-marigold hover:bg-marigold hover:text-black transition-all duration-300 font_nexa text-sm md:text-base"
										>
											DO KOŠÍKU
										</button>
									) : (
										<span className="px-3 py-2 md:px-4 md:py-2 border-2 border-gray-600 text-gray-600 font_nexa text-sm md:text-base">
											VYPRODÁNO
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{products.length === 0 && (
					<div className="text-center py-16 md:py-20 px-4">
						<p className="text-xl md:text-2xl text-gray-400">
							V této kategorii zatím nejsou žádné produkty.
						</p>
					</div>
				)}

				{/* Back Button */}
				<div className="mt-12 md:mt-16 text-center">
					<Link href="/" className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl">
						← Zpět do obchodu
					</Link>
				</div>
			</div>

			{/* Color Selection Modal */}
			{selectedProduct && selectedProduct.colorOptions && (
				<ColorSelectionModal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
						setSelectedProduct(null);
					}}
					productName={selectedProduct.name}
					productImage={selectedProduct.image}
					productPrice={selectedProduct.price}
					colors={selectedProduct.colorOptions}
					onAddToCart={handleAddToCartWithColor}
				/>
			)}
		</main>
	);
}
