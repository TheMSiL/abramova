'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import cart from '@/assets/header/cart.svg'
import home from '@/assets/header/home.svg'
import search from '@/assets/header/search.svg'
import CartBadge from '@/components/CartBadge'
import { useCart } from '@/context/CartContext'
import { Product, products } from '@/data/products'
import Image from 'next/image'

const nav = [
	{
		name: 'e-shop',
		href: '/eshop'
	},
	{
		name: 'o mně',
		href: '/o-mne'
	},
	{
		name: 'abchodní podmínky',
		href: '/obchodni-podminky'
	},
	{
		name: 'kontakt',
		href: '#contacts',
		isScrollLink: true
	}
]

const Header: React.FC = () => {
	const pathname = usePathname()
	const router = useRouter()
	const { addToCart } = useCart()
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')

	// Debounced search (3 seconds)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery)
		}, 1500)

		return () => clearTimeout(timer)
	}, [searchQuery])

	// Calculate search results from debounced query
	const searchResults = React.useMemo(() => {
		if (!debouncedQuery.trim()) return []

		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				product.id.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(debouncedQuery.toLowerCase())
		)
	}, [debouncedQuery])

	const isSearching = searchQuery.trim() !== '' && searchQuery !== debouncedQuery

	const handleProductClick = (productId: string) => {
		router.push(`/product/${productId}`)
		setIsSearchOpen(false)
		setSearchQuery('')
		setDebouncedQuery('')
	}

	const handleAddToCart = (e: React.MouseEvent, product: Product) => {
		e.stopPropagation()
		addToCart(product)
	}

	return (
		<header className='py-5'>
			<div className='content_container flex items-center justify-center'>
				<Link href='/' className='mr-auto'>
					<Image src={home} alt='home' className='w-7 h-7 cursor-pointer duration-300 hover:opacity-80' />
				</Link>
				<nav className='flex-1'>
					<ul className='flex items-center gap-10 font_nexa text-xl justify-center'>
						{nav.map((item) => {
							const isActive = pathname === item.href
							return (
								<li key={item.name}>
									{item.isScrollLink ? (
										<button
											onClick={() => {
												const element = document.getElementById('contacts')
												if (element) {
													element.scrollIntoView({ behavior: 'smooth' })
												}
											}}
											className={`duration-300 text-nugget hover:text-marigold`}
										>
											{item.name}
										</button>
									) : (
										<Link
											href={item.href}
											className={`duration-300 ${isActive
												? 'text-marigold underline underline-offset-2'
												: 'text-nugget hover:text-marigold'
												}`}
										>
											{item.name}
										</Link>
									)}
								</li>
							)
						})}
					</ul>
				</nav>
				<div className='flex items-center gap-5 ml-auto'>
					<button
						onClick={() => setIsSearchOpen(true)}
						className='w-7 h-7 duration-300 hover:opacity-80'
					>
						<Image src={search} alt='search' className='cursor-pointer' />
					</button>
					<Link href='/cart' className='w-7 h-7 duration-300 hover:opacity-80 relative'>
						<Image src={cart} alt='cart' className='cursor-pointer' />
						<CartBadge />
					</Link>
				</div>
			</div>

			{/* Search Modal */}
			{isSearchOpen && (
				<div
					className='fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20'
					onClick={() => {
						setIsSearchOpen(false)
						setSearchQuery('')
						setDebouncedQuery('')
					}}
				>
					<div
						className='bg-gray-900 border-2 border-marigold p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-2xl font_nexa text-marigold'>Vyhledávání</h2>
							<button
								onClick={() => {
									setIsSearchOpen(false)
									setSearchQuery('')
									setDebouncedQuery('')
								}}
								className='text-gray-400 hover:text-white text-3xl'
							>
								×
							</button>
						</div>

						<input
							type='text'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder='Hledejte podle názvu nebo kódu produktu...'
							className='w-full bg-black border-2 border-marigold/50 focus:border-marigold text-white px-4 py-3 outline-none mb-6'
							autoFocus
						/>

						{/* Loading indicator */}
						{isSearching && (
							<div className='text-center py-8'>
								<p className='text-gray-400 font_nexa'>Vyhledávání...</p>
							</div>
						)}

						{/* Search Results */}
						{!isSearching && searchQuery.trim() && (
							<div className='space-y-4'>
								{searchResults.length > 0 ? (
									<>
										<p className='text-gray-400 mb-4'>
											Nalezeno {searchResults.length} {searchResults.length === 1 ? 'produkt' : searchResults.length < 5 ? 'produkty' : 'produktů'}
										</p>
										{searchResults.map((product) => (
											<div
												key={product.id}
												onClick={() => handleProductClick(product.id)}
												className='flex gap-4 p-4 bg-black border border-marigold/30 hover:border-marigold cursor-pointer transition-all group'
											>
												{/* Product Image */}
												<div className='w-24 h-24 flex-shrink-0 bg-gradient-to-br from-marigold/20 to-nugget/20 border border-marigold/30 flex items-center justify-center'>
													<span className='text-4xl font_nexa text-marigold'>
														{product.name.charAt(0)}
													</span>
												</div>

												{/* Product Info */}
												<div className='flex-1 min-w-0'>
													<h3 className='text-lg font_nexa text-marigold mb-1 group-hover:text-white transition-colors'>
														{product.name}
													</h3>
													<p className='text-sm text-gray-400 line-clamp-2 mb-2'>
														{product.description.slice(0, 120)}...
													</p>
													<p className='text-marigold font-bold text-lg'>
														{product.price} Kč
													</p>
												</div>

												{/* Cart Icon */}
												{product.inStock && (
													<button
														onClick={(e) => handleAddToCart(e, product)}
														className='w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-marigold/50 hover:border-marigold hover:bg-marigold/10 transition-all'
														title='Přidat do košíku'
													>
														<Image
															src={cart}
															alt='Add to cart'
															width={24}
															height={24}
															className='w-6 h-6'
														/>
													</button>
												)}
											</div>
										))}
									</>
								) : (
									<div className='text-center py-8'>
										<p className='text-gray-400'>Žádné produkty nenalezeny</p>
									</div>
								)}
							</div>
						)}

						{/* Initial State */}
						{!searchQuery.trim() && !isSearching && (
							<div className='text-center py-8'>
								<p className='text-gray-400'>Začněte psát pro vyhledávání produktů...</p>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	)
}

export default Header