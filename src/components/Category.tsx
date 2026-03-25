import Image from "next/image";
import Link from "next/link";

import img_1 from '@/assets/category/1.jpg';
import img_2 from '@/assets/category/2.jpg';
import img_3 from '@/assets/category/3.jpg';

const items = [
	{
		title: 'SVÍČKA VE SKLE',
		img: img_1,
		path: '/e-shop?tab=sklo'
	},
	{
		title: 'DESIGNOVÉ SVÍČKY',
		img: img_2,
		path: '/e-shop?tab=designove'
	},
	{
		title: 'DEKORATIVNÍ SVÍČKY V KVĚTINÁČI ',
		img: img_3,
		path: '/e-shop?tab=dekorativni'
	}
]

export default function Category() {
	return (
		<section className="py-10 md:py-20" id="categories">
			<div className="content_container">
				<h2 className="text-center text-3xl md:text-4xl lg:text-5xl font_nexa">Objevte
					naše luxusní svíčky
				</h2>
				<div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
					{items.map((item, index) => (
						<Link href={item.path} key={index} className="border border-marigold py-6 md:py-8 px-4 md:px-5 group">
							<Image src={item.img} alt={item.title} width={350} height={450} className="w-full h-48 md:h-auto md:aspect-square mb-6 md:mb-10 object-contain" />
							<div className="rounded-full p-2 w-[90%] text-center mx-auto border border-marigold font_nexa font-bold text-base md:text-lg lg:text-xl text-marigold duration-300 group-hover:bg-marigold group-hover:text-black">
								{item.title}
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}