import { StaticImageData } from 'next/image';

import de_1 from '../assets/products/decorate/1.jpg';
import de_2 from '../assets/products/decorate/2.jpg';
import de_3 from '../assets/products/decorate/3.jpg';
import de_4 from '../assets/products/decorate/4.jpg';
import dc_1 from '../assets/products/design/1.jpg';
import dc_2 from '../assets/products/design/2.jpg';
import dc_3 from '../assets/products/design/3.jpg';
import dc_4 from '../assets/products/design/4.jpg';
import dc_5 from '../assets/products/design/5.jpg';
import dc_6 from '../assets/products/design/6.jpg';
import gl_1 from '../assets/products/glass/1.jpg';
import gl_2 from '../assets/products/glass/2.jpg';
import gl_3 from '../assets/products/glass/3.jpg';
import gl_4 from '../assets/products/glass/4.jpg';
import gl_5 from '../assets/products/glass/5.jpg';
import gl_6 from '../assets/products/glass/6.jpg';

export interface Product {
	id: string;
	name: string;
	price: number;
	category: 'glass' | 'decorate' | 'designer-candles';
	image: StaticImageData;
	description: string;
	weight?: number;
	height?: number;
	aroma?: string;
	details: {
		scent?: string;
		volume: string;
		dimensions: string;
		material: string;
		burnTime: string;
	};
	inStock: boolean;
}

export const products: Product[] = [
	// Vonné svíčky (glass)
	{
		id: 'svicka-ve-skle-1',
		name: 'SVÍČKA VE SKLENICE',
		price: 670,
		aroma: 'Bez vůně',
		category: 'glass',
		image: gl_1,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: false,
	},
	{
		id: 'svicka-ve-skle-2',
		name: 'SOJOVÁ SVÍČKA',
		price: 680,
		aroma: 'Bez vůně',
		category: 'glass',
		image: gl_2,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-3',
		name: 'BÍLÉ TULIPÁNY',
		price: 690,
		aroma: 'Tulipán',
		category: 'glass',
		image: gl_3,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-4',
		name: 'SOJOVÁ SVÍČKA',
		price: 1200,
		aroma: 'Ruže',
		category: 'glass',
		image: gl_4,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-5',
		name: 'KROKUSY',
		price: 699,
		aroma: 'Bez vůně',
		category: 'glass',
		image: gl_5,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-6',
		name: 'BÍLÉ TULIPÁNY',
		price: 1050,
		aroma: 'Tulipán',
		category: 'glass',
		image: gl_6,
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		details: {
			scent: 'marakuja, papája, tropické ovoce, květiny, růže a pižmo',
			volume: 'cca 230ml sójového vosku ve 300ml sklenici',
			dimensions: 'průměr 8cm, výška 9cm',
			material: 'přírodní sójový vosk, bavlněný knot, bukové dřevo víčko',
			burnTime: 'cca 40-50 hodin',
		},
		inStock: true,
	},

	// Nevonné svíčky (decorate)
	{
		id: 'sojova-svicka-dekorace-1',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 680,
		category: 'decorate',
		image: de_1,
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		details: {
			volume: 'cca 160ml sójového vosku ve 200ml sklenici',
			dimensions: 'průměr 7cm, výška 8cm',
			material: 'přírodní sójový vosk, bavlněný knot, skleněná nádoba',
			burnTime: 'cca 30-35 hodin',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-2',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 480,
		category: 'decorate',
		image: de_2,
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		details: {
			volume: 'cca 160ml sójového vosku ve 200ml sklenici',
			dimensions: 'průměr 7cm, výška 8cm',
			material: 'přírodní sójový vosk, bavlněný knot, skleněná nádoba',
			burnTime: 'cca 30-35 hodin',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-3',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 390,
		category: 'decorate',
		image: de_3,
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		details: {
			volume: 'cca 160ml sójového vosku ve 200ml sklenici',
			dimensions: 'průměr 7cm, výška 8cm',
			material: 'přírodní sójový vosk, bavlněný knot, skleněná nádoba',
			burnTime: 'cca 30-35 hodin',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-4',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 599,
		category: 'decorate',
		image: de_4,
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		details: {
			volume: 'cca 160ml sójového vosku ve 200ml sklenici',
			dimensions: 'průměr 7cm, výška 8cm',
			material: 'přírodní sójový vosk, bavlněný knot, skleněná nádoba',
			burnTime: 'cca 30-35 hodin',
		},
		inStock: true,
	},

	// designové svíčky
	{
		id: 'mlady-par',
		name: 'MLADÝ PÁR',
		price: 650,
		height: 240,
		weight: 420,
		category: 'designer-candles',
		image: dc_1,
		description:
			'Dokonalý dárek pro milované osoby. Sada obsahuje dvě designové svíčky s romantickými vůněmi a elegantní dárkové balení.',
		details: {
			scent: 'marakuja + sladké pokušení',
			volume: '2x 300ml svíčky',
			dimensions: 'dárková krabice 20x15x10cm',
			material: 'přírodní sójový vosk, bavlněný knot, dřevěná víčka',
			burnTime: 'cca 40-50 hodin každá svíčka',
		},
		inStock: true,
	},
	{
		id: 'svicka-medved',
		name: 'SVÍČKA MEDVĚD',
		price: 830,
		height: 120,
		weight: 625,
		category: 'designer-candles',
		image: dc_2,
		description:
			'Luxusní dárková sada pro dokonalý relax. Obsahuje tři svíčky s uklidňujícími vůněmi, které vytvoří harmonickou atmosféru.',
		details: {
			scent: 'zahrada klidu + levandule + cedrové dřevo',
			volume: '3x 300ml svíčky',
			dimensions: 'dárková krabice 30x20x10cm',
			material: 'přírodní sójový vosk, bavlněný knot, dřevěná víčka',
			burnTime: 'cca 40-50 hodin každá svíčka',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-1',
		name: 'SOJOVA SVÍČKA',
		price: 1050,
		height: 150,
		weight: 1100,
		category: 'designer-candles',
		image: dc_3,
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		details: {
			scent: 'mix 4 různých vůní',
			volume: '4x 60ml svíčky',
			dimensions: 'dárková krabice 15x15x5cm',
			material: 'přírodní sójový vosk, bavlněný knot, plechové nádobky',
			burnTime: 'cca 12-15 hodin každá svíčka',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-2',
		name: 'SOJOVA SVÍČKA',
		price: 210,
		height: 220,
		weight: 135,
		category: 'designer-candles',
		image: dc_4,
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		details: {
			scent: 'mix 4 různých vůní',
			volume: '4x 60ml svíčky',
			dimensions: 'dárková krabice 15x15x5cm',
			material: 'přírodní sójový vosk, bavlněný knot, plechové nádobky',
			burnTime: 'cca 12-15 hodin každá svíčka',
		},
		inStock: true,
	},
	{
		id: 'sojova-svicka-3',
		name: 'SOJOVA SVÍČKA',
		price: 950,
		height: 130,
		weight: 665,
		category: 'designer-candles',
		image: dc_5,
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		details: {
			scent: 'mix 4 různých vůní',
			volume: '4x 60ml svíčky',
			dimensions: 'dárková krabice 15x15x5cm',
			material: 'přírodní sójový vosk, bavlněný knot, plechové nádobky',
			burnTime: 'cca 12-15 hodin každá svíčka',
		},
		inStock: true,
	},
	{
		id: 'velikonoce-sada',
		name: 'VELIKONOČNÍ SADA',
		price: 550,
		height: 150,
		weight: 1100,
		category: 'designer-candles',
		image: dc_6,
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		details: {
			scent: 'mix 4 různých vůní',
			volume: '4x 60ml svíčky',
			dimensions: 'dárková krabice 15x15x5cm',
			material: 'přírodní sójový vosk, bavlněný knot, plechové nádobky',
			burnTime: 'cca 12-15 hodin každá svíčka',
		},
		inStock: true,
	},
];

export const categories = [
	{
		slug: 'glass',
		name: 'SVÍČKA VE SKLE',
		description:
			'Ručně vyráběné vonné svíčky z přírodního sójového vosku s pečlivě vybranými vůněmi.',
	},
	{
		slug: 'designer-candles',
		name: 'DESIGNOVÉ SVÍČKY',
		description: 'Krásně zabalené dárkové sady svíček pro každou příležitost.',
	},
	{
		slug: 'decorate',
		name: 'DEKORATIVNÍ SVÍČKY V KVĚTINÁČI',
		description:
			'Elegantní nevonné svíčky pro minimalistický interiér a citlivé osoby.',
	},
];

export function getProductsByCategory(categorySlug: string): Product[] {
	return products.filter(product => product.category === categorySlug);
}

export function getProductById(id: string): Product | undefined {
	return products.find(product => product.id === id);
}

export function getCategoryBySlug(slug: string) {
	return categories.find(cat => cat.slug === slug);
}
