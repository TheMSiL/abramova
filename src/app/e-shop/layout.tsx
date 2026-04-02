import { Metadata } from "next";
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: "E-shop",
	description: "Prohlédněte si naši kolekci ručně vyráběných sójových svíček. Vonné svíčky ve skle, designové svíčky a dekorativní svíčky v květináči. Ekologické a veganské.",
	openGraph: {
		title: "E-shop | Abramova Svíčky",
		description: "Prohlédněte si naši kolekci ručně vyráběných sójových svíček.",
		images: ["/assets/products/glass/2.jpg"]
	}
};

export default function CategoriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítám...</div>}>{children}</Suspense>;
}
