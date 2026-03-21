'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartBadge() {
	const { getTotalItems } = useCart();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const totalItems = getTotalItems();

	if (totalItems === 0) {
		return null;
	}

	return (
		<span className='absolute -top-2 -right-2 bg-marigold text-black text-xs font_nexa w-5 h-5 rounded-full flex items-center justify-center'>
			{totalItems}
		</span>
	);
}
