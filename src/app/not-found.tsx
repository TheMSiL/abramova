import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='bg-black text-white py-10 md:py-16 lg:py-20 w-full flex-1 flex items-center justify-center'>
			<div className="content_container text-center px-4">
				<h1 className='text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8'>404</h1>
				<h2 className='text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6'>Stránka nenalezena</h2>
				<p className='text-base md:text-lg lg:text-xl mb-8 md:mb-10 text-gray-300 max-w-2xl mx-auto'>
					Bohužel stránka, kterou hledáte, neexistuje nebo byla přesunuta.
				</p>
				<Link
					href="/"
					className='hero_btn text-lg md:text-xl lg:text-2xl inline-block'
				>
					ZPĚT NA HLAVNÍ STRÁNKU
				</Link>
			</div>
		</div>
	);
}
