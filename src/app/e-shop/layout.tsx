import { Suspense } from 'react';

export default function CategoriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítám...</div>}>{children}</Suspense>;
}
