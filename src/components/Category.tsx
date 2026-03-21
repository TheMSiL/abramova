import Image from "next/image";
import Link from "next/link";

import img_1 from '@/assets/category/1.jpg';
import img_2 from '@/assets/category/2.jpg';
import img_3 from '@/assets/category/3.jpg';

const items = [
	{
		title: 'SVÍČKA VE SKLE',
		img: img_1,
		path: '/categories?tab=glass'
	},
	{
		title: 'DESIGNOVÉ SVÍČKY',
		img: img_2,
		path: '/categories?tab=designer-candles'
	},
	{
		title: 'DEKORATIVNÍ SVÍČKY V KVĚTINÁČI ',
		img: img_3,
		path: '/categories?tab=decorate'
	}
]

export default function Category() {
	return (
		<section className="py-20">
			<div className="content_container">
				<h2 className="text-center text-5xl font_nexa">Objevte
					naše luxusní svíčky
				</h2>
				<div className="mt-10 grid grid-cols-3 gap-10">
					{items.map((item, index) => (
						<Link href={item.path} key={index} className="border border-marigold py-8 px-5 group">
							<Image src={item.img} alt={item.title} width={350} height={450} className="w-full aspect-square mb-10 object-cover" />
							<div className="rounded-full p-2 w-[90%] text-center mx-auto border border-marigold font_nexa font-bold text-xl text-marigold duration-300 group-hover:bg-marigold group-hover:text-black">
								{item.title}
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}