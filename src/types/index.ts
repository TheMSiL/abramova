export interface ColorOption {
	name: string;
	value: string;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	category: string;
	image: string;
	description: string;
	weight: number | null;
	height: number | null;
	aroma: string | null;
	colorOptions: ColorOption[] | null;
	inStock: boolean;
	stock: number;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	slug: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}
