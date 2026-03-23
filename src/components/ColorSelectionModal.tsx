'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface ColorOption {
	name: string;
	value: string;
}

interface ColorSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	productName: string;
	productImage: StaticImageData;
	productPrice: number;
	colors: ColorOption[];
	onAddToCart: (selectedColor: string) => void;
}

export default function ColorSelectionModal({
	isOpen,
	onClose,
	productName,
	productImage,
	productPrice,
	colors,
	onAddToCart,
}: ColorSelectionModalProps) {
	const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.value || '');

	if (!isOpen) return null;

	const handleAddToCart = () => {
		if (selectedColor) {
			onAddToCart(selectedColor);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
			<div
				className="bg-black border-2 border-marigold rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="sticky top-0 bg-black border-b border-marigold/30 p-4 md:p-6 flex justify-between items-center">
					<h2 className="text-xl md:text-2xl font_nexa text-marigold">Vyberte barvu</h2>
					<button
						onClick={onClose}
						className="text-white hover:text-marigold transition-colors text-2xl w-8 h-8 flex items-center justify-center"
						aria-label="Zavřít"
					>
						×
					</button>
				</div>

				{/* Product Info */}
				<div className="p-4 md:p-6">
					<div className="flex gap-4 mb-6">
						<Image
							src={productImage}
							alt={productName}
							width={80}
							height={80}
							className="object-contain"
						/>
						<div>
							<h3 className="font_nexa text-lg mb-2">{productName}</h3>
							<p className="text-marigold text-xl font_nexa">{productPrice} Kč</p>
						</div>
					</div>

					{/* Color Selection */}
					<div className="space-y-3">
						<label className="block text-sm md:text-base text-white/80 mb-2">
							Barva růže:
						</label>
						{colors.map((color) => (
							<label
								key={color.value}
								className={`flex items-center gap-3 p-3 border-2 rounded cursor-pointer transition-all ${selectedColor === color.value
									? 'border-marigold bg-marigold/10'
									: 'border-white/20 hover:border-marigold/50'
									}`}
							>
								<input
									type="radio"
									name="color"
									value={color.value}
									checked={selectedColor === color.value}
									onChange={(e) => setSelectedColor(e.target.value)}
									className="w-5 h-5 accent-marigold"
								/>
								<span className="text-base md:text-lg">{color.name}</span>
							</label>
						))}
					</div>

					{/* Add to Cart Button */}
					<button
						onClick={handleAddToCart}
						disabled={!selectedColor}
						className="w-full mt-6 py-3 md:py-4 bg-marigold text-black font_nexa text-base md:text-lg hover:bg-marigold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						PŘIDAT DO KOŠÍKU
					</button>
				</div>
			</div>
		</div>
	);
}
