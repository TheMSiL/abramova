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
		<section className='py-20'>
			<div className="content_container">
				<h2 className="text-center text-5xl font_nexa">Proč si vybrat naše svíčky?</h2>
				<div className="mt-10 flex items-center justify-between gap-10">
					{items.map((item, index) => (
						<div key={index} className="flex items-center gap-5 max-w-[400px]">
							<Image src={item.img} alt={item.title} width={100} height={100} className="h-auto w-auto max-w-[100px] aspect-square" />
							<div>
								<h3 className="text-2xl font-bold text-marigold">{item.title}</h3>
								<p className="font_nexa text-nugget">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}