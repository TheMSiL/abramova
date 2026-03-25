'use client';

import { Product } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem extends Product {
	quantity: number;
	selectedColor?: string;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product, selectedColor?: string) => void;
	addToCartWithQuantity: (product: Product, quantity: number, selectedColor?: string) => void;
	removeFromCart: (productId: string, selectedColor?: string) => void;
	updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
	isInCart: (productId: string, selectedColor?: string) => boolean;
	getProductColorsInCart: (productId: string) => string[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	// Ленивая инициализация с загрузкой из localStorage
	const [cart, setCart] = useState<CartItem[]>(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				return JSON.parse(savedCart);
			}
		}
		return [];
	});

	// Сохраняем корзину в localStorage при изменении
	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			localStorage.removeItem('cart');
		}
	}, [cart]);

	const addToCart = (product: Product, selectedColor?: string) => {
		setCart((prevCart) => {
			const cartKey = selectedColor ? `${product.id}-${selectedColor}` : product.id;
			const existingItem = prevCart.find((item) => {
				const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
				return itemKey === cartKey;
			});

			if (existingItem) {
				// Увеличиваем количество
				return prevCart.map((item) => {
					const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
					return itemKey === cartKey
						? { ...item, quantity: item.quantity + 1 }
						: item;
				});
			} else {
				// Добавляем новый товар
				return [...prevCart, { ...product, quantity: 1, selectedColor }];
			}
		});
	};

	const addToCartWithQuantity = (product: Product, quantity: number, selectedColor?: string) => {
		if (quantity <= 0) return;

		setCart((prevCart) => {
			const cartKey = selectedColor ? `${product.id}-${selectedColor}` : product.id;
			const existingItem = prevCart.find((item) => {
				const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
				return itemKey === cartKey;
			});

			if (existingItem) {
				// Увеличиваем количество на указанное значение
				return prevCart.map((item) => {
					const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
					return itemKey === cartKey
						? { ...item, quantity: item.quantity + quantity }
						: item;
				});
			} else {
				// Добавляем новый товар с указанным количеством
				return [...prevCart, { ...product, quantity, selectedColor }];
			}
		});
	};

	const removeFromCart = (productId: string, selectedColor?: string) => {
		setCart((prevCart) => {
			const cartKey = selectedColor ? `${productId}-${selectedColor}` : productId;
			return prevCart.filter((item) => {
				const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
				return itemKey !== cartKey;
			});
		});
	};

	const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
		if (quantity <= 0) {
			removeFromCart(productId, selectedColor);
			return;
		}

		setCart((prevCart) => {
			const cartKey = selectedColor ? `${productId}-${selectedColor}` : productId;
			return prevCart.map((item) => {
				const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
				return itemKey === cartKey ? { ...item, quantity } : item;
			});
		});
	};

	const clearCart = () => {
		setCart([]);
	};

	const getTotalItems = () => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	};

	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const isInCart = (productId: string, selectedColor?: string) => {
		if (selectedColor) {
			// Проверяем точное совпадение с цветом
			const cartKey = `${productId}-${selectedColor}`;
			return cart.some((item) => {
				const itemKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
				return itemKey === cartKey;
			});
		} else {
			// Проверяем наличие товара с любым вариантом (с любым цветом или без)
			return cart.some((item) => item.id === productId);
		}
	};

	const getProductColorsInCart = (productId: string): string[] => {
		return cart
			.filter((item) => item.id === productId && item.selectedColor)
			.map((item) => item.selectedColor as string);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				addToCartWithQuantity,
				removeFromCart,
				updateQuantity,
				clearCart,
				getTotalItems,
				getTotalPrice,
				isInCart,
				getProductColorsInCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}
