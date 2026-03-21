import Image from "next/image";

import img_2 from '@/assets/why/delivery.svg';
import img_1 from '@/assets/why/eco.svg';
import img_3 from '@/assets/why/handmade.svg';

const items = [
	{
		img: img_1,
		title: 'Přírodní vosk',
		description: 'Svíčky z kvalitního přírodního vosku pro čisté hoření'
	},
	{
		img: img_2,
		title: 'Doprava zdarma',
		description: 'Při objednávce nad 1500,-'
	},
	{
		img: img_3,
		title: 'Ručně vyrobeno',
		description: 'Pečlivě vyrábíme každou svíčku s láskou a péčí v Česku.'
	},
]

export default function Why() {
	return (
		<section className='py-10 md:py-20'>
			<div className="content_container">
				<h2 className="text-center text-3xl md:text-4xl lg:text-5xl font_nexa">Proč si vybrat naše svíčky?</h2>
				<div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
					{items.map((item, index) => (
						<div key={index} className="flex items-center w-full gap-4 md:gap-5 max-w-[400px] mx-auto">
							<Image src={item.img} alt={item.title} width={100} height={100} className="h-auto w-auto max-w-[60px] md:max-w-[80px] lg:max-w-[100px] aspect-square flex-shrink-0" />
							<div>
								<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-marigold">{item.title}</h3>
								<p className="font_nexa text-sm md:text-base text-nugget">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}