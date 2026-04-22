'use client';

import { useEffect } from 'react';

interface ToastProps {
	message: string;
	type?: 'error' | 'success' | 'warning';
	onClose: () => void;
	duration?: number;
}

export default function Toast({ message, type = 'error', onClose, duration = 3000 }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const bgColor = {
		error: 'bg-red-600/95',
		success: 'bg-green-600/95',
		warning: 'bg-orange-600/95',
	}[type];

	const icon = {
		error: '✕',
		success: '✓',
		warning: '⚠',
	}[type];

	return (
		<div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
			<div className={`${bgColor} border-2 border-marigold text-white px-6 py-4 shadow-2xl flex items-center gap-4 min-w-[320px] max-w-[90vw]`}>
				<div className="text-2xl font_nexa">{icon}</div>
				<p className="text-base md:text-lg font_nexa flex-1">{message}</p>
				<button
					onClick={onClose}
					className="text-white hover:text-marigold transition-colors text-xl font_nexa"
				>
					✕
				</button>
			</div>
		</div>
	);
}
