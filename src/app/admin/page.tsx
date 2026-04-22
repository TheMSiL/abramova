'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ColorOption {
	name: string;
	value: string;
}

interface Product {
	id: string;
	name: string;
	price: number;
	category: string;
	image: string;
	description: string;
	weight?: number;
	height?: number;
	aroma?: string;
	colorOptions?: ColorOption[];
	inStock: boolean;
	stock: number;
	createdAt: string;
	updatedAt: string;
}

export default function AdminPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: string | null; productName: string }>({
		isOpen: false,
		productId: null,
		productName: ''
	});
	const router = useRouter();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/products');
			if (!response.ok) throw new Error('Failed to fetch products');
			const data = await response.json();
			setProducts(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/products/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete product');
			setDeleteModal({ isOpen: false, productId: null, productName: '' });
			await fetchProducts();
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			router.push('/admin/login');
			router.refresh();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	const openDeleteModal = (id: string, name: string) => {
		setDeleteModal({ isOpen: true, productId: id, productName: name });
	};

	const closeDeleteModal = () => {
		setDeleteModal({ isOpen: false, productId: null, productName: '' });
	};

	if (loading) return <div className="content_container text-marigold py-8">Načítání...</div>;
	if (error) return <div className="content_container text-red-500 py-8">Chyba: {error}</div>;

	return (
		<div className="content_container py-8">
			<div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<h1 className="text-3xl sm:text-4xl font_nexa text-marigold">Správa produktů</h1>
				<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
					<Link
						href="/"
						className="border-2 border-marigold/50 px-6 py-2 text-center text-marigold hover:border-marigold hover:bg-marigold/10 transition-all duration-300 font_nexa"
					>
						← Zpět na web
					</Link>
					<Link
						href="/admin/create"
						className="border-2 border-nugget px-6 py-2 text-center text-black bg-nugget hover:bg-marigold hover:border-marigold transition-all duration-300 font_nexa"
					>
						+ Přidat produkt
					</Link>
					<button
						onClick={handleLogout}
						className="border-2 border-red-500/50 px-6 py-2 text-center text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font_nexa"
					>
						Odhlásit se
					</button>
				</div>
			</div>

			{/* Список товаров */}
			<div className="flex flex-col gap-4">
				{products.map(product => (
					<div
						key={product.id}
						className="border-2 border-marigold/30 hover:border-marigold transition-all duration-300 bg-black flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4"
					>
						{/* Product Image - слева */}
						<div className="relative w-full sm:w-32 h-32 sm:h-32 flex-shrink-0 overflow-hidden bg-gray-900 border border-marigold/20">
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
							/>
						</div>

						{/* Product Info - по центру */}
						<div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
							<h3 className="text-lg sm:text-xl font_nexa text-marigold truncate">
								{product.name}
							</h3>
							<p className="text-xl sm:text-2xl font_nexa text-marigold">
								{product.price} Kč
							</p>
							{/* Количество на складе */}
							<p className="text-sm text-gray-400">
								Skladem: <span className={`font_nexa ${product.stock === 0 ? 'text-red-400' : product.stock <= 5 ? 'text-orange-400' : 'text-green-400'}`}>
									{product.stock} ks
								</span>
							</p>
							{/* Наличие */}
							<div className="inline-block">
								{product.inStock && product.stock > 0 ? (
									<span className="px-3 py-1 text-sm border border-green-500/50 text-green-400 font_nexa">
										SKLADEM
									</span>
								) : (
									<span className="px-3 py-1 text-sm border border-red-500/50 text-red-400 font_nexa">
										VYPRODÁNO
									</span>
								)}
							</div>
						</div>

						{/* Action Buttons - справа */}
						<div className="flex sm:flex-col gap-2 flex-shrink-0">
							<Link
								href={`/admin/edit/${product.id}`}
								className="flex-1 sm:flex-none text-center border-2 border-marigold/50 px-6 py-2 text-marigold hover:bg-marigold hover:text-black transition-all duration-300 font_nexa whitespace-nowrap"
							>
								Upravit
							</Link>
							<button
								onClick={() => openDeleteModal(product.id, product.name)}
								className="flex-1 sm:flex-none border-2 border-red-500/50 px-6 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font_nexa whitespace-nowrap"
							>
								Smazat
							</button>
						</div>
					</div>
				))}
			</div>

			{products.length === 0 && (
				<div className="text-center py-20">
					<p className="text-xl text-gray-400 mb-4">Zatím žádné produkty</p>
					<Link
						href="/admin/create"
						className="inline-block border-2 border-marigold px-6 py-2 text-black bg-gradient-to-br from-[#b57e10] to-[#f9df7b] hover:from-[#f9df7b] hover:to-[#b57e10] transition-all duration-300 font_nexa"
					>
						Přidat první produkt
					</Link>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteModal.isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
					<div className="bg-black border-2 border-red-500/50 max-w-md w-full p-8">
						<h2 className="text-2xl font_nexa text-marigold mb-4">Smazat produkt?</h2>
						<p className="text-gray-300 mb-2">Opravdu chcete smazat tento produkt?</p>
						<p className="text-marigold font_nexa mb-8">{deleteModal.productName}</p>
						<div className="flex gap-4">
							<button
								onClick={closeDeleteModal}
								className="flex-1 border-2 border-gray-600 px-6 py-3 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 font_nexa"
							>
								Zrušit
							</button>
							<button
								onClick={() => deleteModal.productId && handleDelete(deleteModal.productId)}
								className="flex-1 border-2 border-red-500 px-6 py-3 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 font_nexa"
							>
								Smazat
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
