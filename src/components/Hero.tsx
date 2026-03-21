import Image from 'next/image';

import hero_img from '@/assets/hero.png';
import logo from '@/assets/logo.svg';

export default function Hero() {
	return (
		<section className='relative min-h-[600px] border-b border-nugget border-opacity-20'>
			<div className="content_container">
				<div className='pt-40 relative z-10'>
					<Image alt='logo' width={700} height={214} src={logo} />
					<div className='mt-10 flex items-center gap-5'>
						<p className='font_nexa text-3xl text-nugget'>Klid začíná u zapálené svíčky
						</p>
						<button className='hero_btn'>VIBERTE SI</button>
					</div>
				</div>
			</div>
			<Image src={hero_img} alt='Hero Image' loading='eager' className='w-full h-full absolute top-0 left-0' />
		</section>
	);
}