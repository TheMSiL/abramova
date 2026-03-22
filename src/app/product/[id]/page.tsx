import AddToCartButton from '@/components/AddToCartButton';
import { getCategoryBySlug, getProductById } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = getProductById(id);

	if (!product) {
		notFound();
	}

	const category = getCategoryBySlug(product.category);

	return (
		<main className="py-10 md:py-20">
			<div className="content_container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
					{/* Product Image */}
					<div className="relative">
						<div className="lg:sticky lg:top-20">
							<div className="border-2 border-marigold/30 ">
								<div className="aspect-square relative overflow-hidden">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover"
										priority
									/>
								</div>
								{!product.inStock && (
									<div className="absolute top-4 right-4 md:top-8 md:right-8 bg-red-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg font_nexa">
										VYPRODÁNO
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Product Details */}
					<div>
						{/* Breadcrumb */}
						<div className="mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base text-gray-400 flex-wrap">
							<Link href="/" className="hover:text-marigold transition-colors">
								Domů
							</Link>
							<span>/</span>
							<Link
								href={`/categories?tab=${product.category}`}
								className="hover:text-marigold transition-colors"
							>
								{category?.name}
							</Link>
							<span>/</span>
							<span className="text-white">{product.name}</span>
						</div>

						{/* Product Name */}
						<h1 className="text-3xl md:text-4xl lg:text-5xl font_nexa mb-4 md:mb-6 text-marigold">
							{product.name}
						</h1>

						{/* Price */}
						<div className="mb-6 md:mb-8">
							<span className="text-3xl md:text-4xl lg:text-5xl font_nexa text-marigold">
								{product.price} Kč
							</span>
							<span className="text-gray-400 ml-2 text-sm md:text-base">/ 1 ks</span>
						</div>

						{/* Stock Status */}
						<div className="mb-6 md:mb-8">
							{product.inStock ? (
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-green-500"></div>
									<span className="text-green-400 font_nexa text-sm md:text-base">Skladem</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<span className="text-red-400 font_nexa text-sm md:text-base">Vyprodáno</span>
								</div>
							)}
						</div>

						{/* Add to Cart Button */}
						{product.inStock && (
							<div className="mb-8 md:mb-12">
								<AddToCartButton product={product} />
							</div>
						)}

						{/* Description */}
						<div className="mb-8 md:mb-12 pb-8 md:pb-12 border-b border-gray-800">
							<h2 className="text-xl md:text-2xl font_nexa mb-3 md:mb-4 text-marigold">Popis</h2>
							<p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
								{product.description}
							</p>
						</div>

						{/* Details */}
						<div className="mb-8 md:mb-12">
							<h2 className="text-xl md:text-2xl font_nexa mb-4 md:mb-6 text-marigold">
								Detailní informace
							</h2>
							<div className="space-y-3 md:space-y-4">
								{product.details.scent && (
									<div className="border-b border-gray-800 pb-3 md:pb-4">
										<span className="font_nexa text-marigold text-sm md:text-base">Vůně:</span>
										<p className="text-gray-300 mt-1 text-sm md:text-base">{product.details.scent}</p>
									</div>
								)}
								<div className="border-b border-gray-800 pb-3 md:pb-4">
									<span className="font_nexa text-marigold text-sm md:text-base">Objem:</span>
									<p className="text-gray-300 mt-1 text-sm md:text-base">{product.details.volume}</p>
								</div>
								<div className="border-b border-gray-800 pb-3 md:pb-4">
									<span className="font_nexa text-marigold text-sm md:text-base">Rozměry:</span>
									<p className="text-gray-300 mt-1 text-sm md:text-base">{product.details.dimensions}</p>
								</div>
								<div className="border-b border-gray-800 pb-3 md:pb-4">
									<span className="font_nexa text-marigold text-sm md:text-base">Materiál:</span>
									<p className="text-gray-300 mt-1 text-sm md:text-base">{product.details.material}</p>
								</div>
								<div className="border-b border-gray-800 pb-3 md:pb-4">
									<span className="font_nexa text-marigold text-sm md:text-base">Doba hoření:</span>
									<p className="text-gray-300 mt-1 text-sm md:text-base">{product.details.burnTime}</p>
								</div>
							</div>
						</div>

						{/* Care Instructions */}
						<div className="mb-8 md:mb-12 p-4 md:p-6 bg-gray-900 border-2 border-marigold/20">
							<h3 className="text-lg md:text-xl font_nexa mb-3 md:mb-4 text-marigold">
								Jak pečovat o svíčku?
							</h3>
							<ul className="space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
								<li className="flex gap-2">
									<span className="text-marigold">✨</span>
									<span>Před zapálením zastřihněte knot na cca 0,4 cm – zabráníte tak nežádoucímu kouři a sazím.</span>
								</li>
								<li className="flex gap-2">
									<span className="text-marigold">✨</span>
									<span>Nechte svíčku hořet alespoň 2 hodiny, aby se vosk rovnoměrně rozpustil až k okrajům.</span>
								</li>
								<li className="flex gap-2">
									<span className="text-marigold">✨</span>
									<span>Když začne svíčka čoudit, sfoukněte ji a před dalším zapálením zkrátite knot.</span>
								</li>
								<li className="flex gap-2">
									<span className="text-marigold">✨</span>
									<span>Svíčku nenechávejte vyhořet až do úplného dna – nechte alespoň 0,5–1 cm vosku.</span>
								</li>
								<li className="flex gap-2">
									<span className="text-marigold">✨</span>
									<span>Bezpečnost na prvním místě! Svíčku nenechávejte bez dozoru.</span>
								</li>
							</ul>
						</div>

						{/* Benefits */}
						<div className="grid grid-cols-2 gap-3 md:gap-4">
							<div className="text-center p-3 md:p-4 border border-marigold/30">
								<div className="text-2xl md:text-3xl mb-2">🌱</div>
								<p className="text-xs md:text-sm text-gray-300">Přírodní sójový vosk</p>
							</div>
							<div className="text-center p-3 md:p-4 border border-marigold/30">
								<div className="text-2xl md:text-3xl mb-2">🚚</div>
								<p className="text-xs md:text-sm text-gray-300">Doprava zdarma nad 1500,-</p>
							</div>
							<div className="text-center p-3 md:p-4 border border-marigold/30">
								<div className="text-2xl md:text-3xl mb-2">🎁</div>
								<p className="text-xs md:text-sm text-gray-300">Dárek zdarma nad 1000,-</p>
							</div>
							<div className="text-center p-3 md:p-4 border border-marigold/30">
								<div className="text-2xl md:text-3xl mb-2">🇨🇿</div>
								<p className="text-xs md:text-sm text-gray-300">Ručně vyrobeno v ČR</p>
							</div>
						</div>

						{/* Back Button */}
						<div className="mt-8 md:mt-12">
							<Link
								href={`/categories?tab=${product.category}`}
								className="inline-block hero_btn font_nexa text-base md:text-lg lg:text-xl"
							>
								← Zpět do kategorie
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
