'use client';

import Toast from '@/components/Toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ColorOption {
	name: string;
	value: string;
}

export default function CreateProductPage() {
	const router = useRouter();
	const [uploading, setUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState<string>('');
	const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);

	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		category: 'glass',
		image: '',
		description: '',
		weight: undefined as number | undefined,
		height: undefined as number | undefined,
		aroma: '',
		colorOptions: [] as ColorOption[],
		inStock: true,
		stock: 0,
	});

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const formDataUpload = new FormData();
			formDataUpload.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formDataUpload,
			});

			if (!response.ok) throw new Error('Upload failed');

			const { url } = await response.json();
			setFormData({ ...formData, image: url });
			setImagePreview(url);
		} catch (error) {
			console.error('Error uploading image:', error);
			setToast({ message: 'Chyba při nahrávání obrázku', type: 'error' });
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error('Failed to create product');

			router.push('/admin');
		} catch (error) {
			console.error('Error creating product:', error);
			setToast({ message: 'Chyba při vytváření produktu', type: 'error' });
		}
	};

	return (
		<div className="content_container py-8">
			<div className="mb-10">
				<Link
					href="/admin"
					className="inline-flex items-center text-marigold hover:text-marigold/80 transition-colors font_nexa mb-6"
				>
					← Zpět na správu
				</Link>
				<h1 className="text-4xl font_nexa text-marigold text-center">Vytvořit nový produkt</h1>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Image Upload */}
				<div className="border-2 border-marigold/30 p-6">
					<label className="block text-lg font_nexa text-marigold mb-4">
						Obrázek produktu
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-marigold/50 file:bg-transparent file:text-marigold file:font_nexa hover:file:bg-marigold/10 file:cursor-pointer"
					/>
					{uploading && <p className="mt-2 text-marigold">Nahrávání...</p>}
					{imagePreview && (
						<div className="mt-6 flex justify-center">
							<Image
								src={imagePreview}
								alt="Preview"
								width={250}
								height={250}
								className="border-2 border-marigold/30 object-cover"
							/>
						</div>
					)}
				</div>

				{/* Basic Info */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div>
						<label className="block text-sm font-medium text-marigold mb-2">Název *</label>
						<input
							type="text"
							required
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-marigold mb-2">Cena (Kč) *</label>
						<input
							type="number"
							required
							value={formData.price}
							onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-marigold mb-2">Počet kusů *</label>
						<input
							type="number"
							required
							min="0"
							value={formData.stock}
							onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-marigold mb-2">Kategorie *</label>
						<select
							value={formData.category}
							onChange={e => setFormData({ ...formData, category: e.target.value })}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						>
							<option value="glass" className="bg-black">Svíčka ve skle</option>
							<option value="decorate" className="bg-black">Dekorativní svíčky</option>
							<option value="design" className="bg-black">Designové svíčky</option>
						</select>
					</div>
					<div>
						<label className="flex items-center text-gray-300 h-full pt-8">
							<input
								type="checkbox"
								checked={formData.inStock}
								onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
								className="mr-2 w-5 h-5"
							/>
							<span className="font_nexa text-marigold">Skladem</span>
						</label>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-marigold mb-2">Popis *</label>
					<textarea
						required
						value={formData.description}
						onChange={e => setFormData({ ...formData, description: e.target.value })}
						className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						rows={4}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">Hmotnost (g)</label>
						<input
							type="number"
							value={formData.weight || ''}
							onChange={e =>
								setFormData({
									...formData,
									weight: e.target.value ? Number(e.target.value) : undefined,
								})
							}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">Výška (cm)</label>
						<input
							type="number"
							value={formData.height || ''}
							onChange={e =>
								setFormData({
									...formData,
									height: e.target.value ? Number(e.target.value) : undefined,
								})
							}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">Vůně</label>
						<input
							type="text"
							value={formData.aroma}
							onChange={e => setFormData({ ...formData, aroma: e.target.value })}
							className="w-full bg-transparent border border-marigold/30 text-white p-3 focus:border-marigold focus:outline-none"
						/>
					</div>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 pt-6">
					<button type="submit" className="border-2 border-marigold px-8 py-2 text-center text-black bg-gradient-to-br from-[#b57e10] to-[#f9df7b] hover:from-[#f9df7b] hover:to-[#b57e10] transition-all duration-300 font_nexa text-lg">
						Vytvořit produkt
					</button>
					<Link
						href="/admin"
						className="border-2 border-gray-600 px-8 py-2 text-center text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 font_nexa"
					>
						Zrušit
					</Link>
				</div>
			</form>

			{/* Toast Notification */}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
		</div>
	);
}
