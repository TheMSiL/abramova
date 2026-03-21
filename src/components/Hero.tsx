'use client';

import Image from 'next/image';

import hero_img from '@/assets/hero.png';
import logo from '@/assets/logo.svg';


export default function Hero() {
	const scrollToCategories = () => {
		const element = document.getElementById('categories');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className='relative min-h-[400px] md:min-h-[600px] border-b border-nugget border-opacity-20'>
			<div className="content_container">
				<div className='pt-20 md:pt-40 relative z-10'>
					<Image alt='logo' width={700} height={214} src={logo} className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px]' />
					<div className='mt-6 md:mt-10 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5'>
						<p className='font_nexa text-lg md:text-2xl lg:text-3xl text-nugget'>Klid začíná u zapálené svíčky
						</p>
						<button onClick={scrollToCategories} className='hero_btn text-lg md:text-xl lg:text-2xl'>VIBERTE SI</button>
					</div>
				</div>
			</div>
			<Image src={hero_img} alt='Hero Image' loading='eager' className='w-full h-full absolute top-0 left-0 object-cover' />
		</section>
	);
}