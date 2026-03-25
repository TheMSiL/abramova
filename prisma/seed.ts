import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma';
import type { InputJsonValue } from '../src/generated/prisma/runtime/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface ColorOption {
	name: string;
	value: string;
}

interface ProductData {
	id: string;
	name: string;
	price: number;
	category: string;
	image: string;
	description: string;
	weight?: number;
	height?: number;
	aroma?: string;
	colorOptions?: ColorOption[];
	inStock: boolean;
}

const productsData: ProductData[] = [
	// Vonné svíčky (glass)
	{
		id: 'svicka-ve-skle-1',
		name: 'SVÍČKA VE SKLENICE',
		price: 670,
		aroma: 'Bez vůně',
		category: 'sklo',
		image: '/assets/products/glass/1.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: false,
	},
	{
		id: 'svicka-ve-skle-2',
		name: 'SOJOVÁ SVÍČKA',
		price: 680,
		aroma: 'Bez vůně',
		category: 'sklo',
		image: '/assets/products/glass/2.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-3',
		name: 'BÍLÉ TULIPÁNY',
		price: 690,
		aroma: 'Tulipán',
		category: 'sklo',
		image: '/assets/products/glass/3.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-4',
		name: 'SOJOVÁ SVÍČKA',
		price: 1200,
		aroma: 'Ruže',
		category: 'sklo',
		image: '/assets/products/glass/4.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-5',
		name: 'KROKUSY',
		price: 699,
		aroma: 'Bez vůně',
		category: 'sklo',
		image: '/assets/products/glass/5.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: true,
	},
	{
		id: 'svicka-ve-skle-6',
		name: 'BÍLÉ TULIPÁNY',
		price: 1050,
		aroma: 'Tulipán',
		category: 'sklo',
		image: '/assets/products/glass/6.jpg',
		description:
			'Růžová, něžná a trochu drzá. Stojí si tiše na poličce… ale všichni si jí všimnou. Zapálíš knot a najednou má i obyčejný večer pocit, že je sváteční. Protože některé maličkosti prostě umí dělat velkou atmosféru.',
		colorOptions: [
			{ name: 'Bílá', value: 'white' },
			{ name: 'Červená', value: 'red' },
			{ name: 'Žlutá', value: 'yellow' },
			{ name: 'Fialová', value: 'purple' },
		],
		inStock: true,
	},

	// Nevonné svíčky (decorate)
	{
		id: 'sojova-svicka-dekorace-1',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 680,
		category: 'dekorativni',
		image: '/assets/products/decorate/1.jpg',
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-2',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 480,
		category: 'dekorativni',
		image: '/assets/products/decorate/2.jpg',
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-3',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 390,
		category: 'dekorativni',
		image: '/assets/products/decorate/3.jpg',
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-dekorace-4',
		name: 'SÓJOVÁ SVÍČKA V BETONOVÉM KVĚTINÁČI',
		price: 599,
		category: 'dekorativni',
		image: '/assets/products/decorate/4.jpg',
		description:
			'Čistá elegance bez vůně. Perfektní pro ty, kdo preferují neutritativní prostředí nebo mají citlivost na vůně. Krásně dohrává s interiérem.',
		inStock: true,
	},

	// designové svíčky
	{
		id: 'mlady-par',
		name: 'MLADÝ PÁR',
		price: 650,
		height: 240,
		weight: 420,
		category: 'designove',
		image: '/assets/products/design/1.jpg',
		description:
			'Dokonalý dárek pro milované osoby. Sada obsahuje dvě designové svíčky s romantickými vůněmi a elegantní dárkové balení.',
		inStock: true,
	},
	{
		id: 'svicka-medved',
		name: 'SVÍČKA MEDVĚD',
		price: 830,
		height: 120,
		weight: 625,
		category: 'designove',
		image: '/assets/products/design/2.jpg',
		description:
			'Luxusní dárková sada pro dokonalý relax. Obsahuje tři svíčky s uklidňujícími vůněmi, které vytvoří harmonickou atmosféru.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-1',
		name: 'SOJOVA SVÍČKA',
		price: 1050,
		height: 150,
		weight: 1100,
		category: 'designove',
		image: '/assets/products/design/3.jpg',
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-2',
		name: 'SOJOVA SVÍČKA',
		price: 210,
		height: 220,
		weight: 135,
		category: 'designove',
		image: '/assets/products/design/4.jpg',
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		inStock: true,
	},
	{
		id: 'sojova-svicka-3',
		name: 'SOJOVA SVÍČKA',
		price: 950,
		height: 130,
		weight: 665,
		category: 'designove',
		image: '/assets/products/design/5.jpg',
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		inStock: true,
	},
	{
		id: 'velikonoce-sada',
		name: 'VELIKONOČNÍ SADA',
		price: 550,
		height: 150,
		weight: 1100,
		category: 'designove',
		image: '/assets/products/design/6.jpg',
		description:
			'Kompaktní kolekce čtyř malých svíček s různými vůněmi. Ideální pro cestování nebo jako drobný dárek.',
		inStock: true,
	},
];

const categoriesData = [
	{
		slug: 'sklo',
		name: 'SVÍČKA VE SKLE',
		description:
			'Ručně vyráběné vonné svíčky z přírodního sójového vosku s pečlivě vybranými vůněmi.',
	},
	{
		slug: 'designove',
		name: 'DESIGNOVÉ SVÍČKY',
		description: 'Krásně zabalené dárkové sady svíček pro každou příležitost.',
	},
	{
		slug: 'dekorativni',
		name: 'DEKORATIVNÍ SVÍČKY V KVĚTINÁČI',
		description:
			'Elegantní nevonné svíčky pro minimalistický interiér a citlivé osoby.',
	},
];

async function main() {
	console.log('🌱 Начинаем заполнение базы данных...');

	// Очищаем существующие данные
	await prisma.product.deleteMany({});
	await prisma.category.deleteMany({});
	console.log('🗑️  Старые данные удалены');

	// Добавляем категории
	for (const category of categoriesData) {
		await prisma.category.create({
			data: category,
		});
		console.log(`✅ Добавлена категория: ${category.name}`);
	}

	// Добавляем товары
	for (const product of productsData) {
		await prisma.product.create({
			data: {
				...product,
				colorOptions: product.colorOptions as unknown as InputJsonValue,
			},
		});
		console.log(`✅ Добавлен товар: ${product.name}`);
	}

	console.log(
		`\n✨ Успешно добавлено ${categoriesData.length} категорий и ${productsData.length} товаров!`,
	);
}

main()
	.catch(e => {
		console.error('❌ Ошибка при заполнении базы данных:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
