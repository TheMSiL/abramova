'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import cart from '@/assets/header/cart.svg'
import home from '@/assets/header/home.svg'
import CartBadge from '@/components/CartBadge'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import Image from 'next/image'

const nav = [
	{
		name: 'e-shop',
		href: '/e-shop'
	},
	{
		name: 'o mně',
		href: '/o-mne'
	},
	{
		name: 'obchodní podmínky',
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
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Product[]>([])
	const [isSearching, setIsSearching] = useState(false)

	// Debounced search (1.5 seconds)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery)
		}, 1500)

		return () => clearTimeout(timer)
	}, [searchQuery])

	// Fetch search results when debounced query changes
	useEffect(() => {
		const fetchSearchResults = async () => {
			if (!debouncedQuery.trim()) {
				setSearchResults([])
				return
			}

			setIsSearching(true)
			try {
				const response = await fetch(`/api/products?search=${encodeURIComponent(debouncedQuery)}`)
				if (response.ok) {
					const data = await response.json()
					setSearchResults(data)
				}
			} catch (error) {
				console.error('Error fetching search results:', error)
			} finally {
				setIsSearching(false)
			}
		}

		fetchSearchResults()
	}, [debouncedQuery])

	const handleAddToCart = (e: React.MouseEvent, product: Product) => {
		e.stopPropagation()
		addToCart(product)
		// Close search after adding to cart
		setIsSearchOpen(false)
		setSearchQuery('')
		setDebouncedQuery('')
	}

	return (
		<header className='py-3 md:py-5'>
			<div className='content_container flex items-center justify-between'>
				<Link href='/' className=''>
					<Image src={home} alt='home' className='w-6 h-6 md:w-7 md:h-7 cursor-pointer duration-300 hover:opacity-80' />
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden lg:flex flex-1 items-center justify-center mx-8'>
					<ul className='flex items-center gap-4 xl:gap-10 font_nexa text-base xl:text-xl justify-center'>
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
											className={`duration-300 text-nugget hover:text-marigold whitespace-nowrap`}
										>
											{item.name}
										</button>
									) : (
										<Link
											href={item.href}
											className={`duration-300 whitespace-nowrap ${isActive
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

				{/* Icons */}
				<div className='flex items-center gap-3 md:gap-5'>
					{/* Search button temporarily hidden */}
					{/* <button
						onClick={() => setIsSearchOpen(true)}
						className='w-6 h-6 md:w-7 md:h-7 duration-300 hover:opacity-80'
					>
						<Image src={search} alt='search' className='cursor-pointer' />
					</button> */}
					<Link href='/cart' className='w-6 h-6 md:w-7 md:h-7 duration-300 hover:opacity-80 relative'>
						<Image src={cart} alt='cart' className='cursor-pointer' />
						<CartBadge />
					</Link>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className='lg:hidden w-6 h-6 md:w-7 md:h-7 flex flex-col justify-center items-center gap-1'
					>
						<span className={`w-6 h-0.5 bg-marigold transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
						<span className={`w-6 h-0.5 bg-marigold transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
						<span className={`w-6 h-0.5 bg-marigold transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className='lg:hidden border-t border-marigold/30 mt-3'>
					<nav className='content_container py-4'>
						<ul className='flex flex-col gap-3 font_nexa text-lg'>
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
													setIsMobileMenuOpen(false)
												}}
												className={`duration-300 text-nugget hover:text-marigold block w-full text-left py-2`}
											>
												{item.name}
											</button>
										) : (
											<Link
												href={item.href}
												onClick={() => setIsMobileMenuOpen(false)}
												className={`duration-300 block py-2 ${isActive
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
				</div>
			)}

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
												className='flex gap-4 p-4 bg-black border border-marigold/30 hover:border-marigold transition-all group'
											>
												{/* Product Image */}
												<div className='w-24 h-24 flex-shrink-0 bg-gray-900 border border-marigold/30 relative overflow-hidden'>
													<Image
														src={product.image}
														alt={product.name}
														fill
														className='object-cover'
													/>
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