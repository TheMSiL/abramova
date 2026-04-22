'use client';

interface ConfirmModalProps {
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
			<div className="bg-black border-2 border-marigold p-6 md:p-8 max-w-md w-[90vw] shadow-2xl animate-scale-in">
				<h3 className="text-xl md:text-2xl font_nexa text-marigold mb-4 text-center">
					Potvrzení
				</h3>
				<p className="text-base md:text-lg text-white mb-6 md:mb-8 text-center">
					{message}
				</p>
				<div className="flex flex-col sm:flex-row gap-3 md:gap-4">
					<button
						onClick={onConfirm}
						className="flex-1 py-3 md:py-4 bg-red-600 border-2 border-red-600 text-white hover:bg-red-700 transition-all font_nexa text-base md:text-lg"
					>
						Ano, vyprázdnit
					</button>
					<button
						onClick={onCancel}
						className="flex-1 py-3 md:py-4 border-2 border-marigold text-marigold hover:bg-marigold hover:text-black transition-all font_nexa text-base md:text-lg"
					>
						Zrušit
					</button>
				</div>
			</div>
		</div>
	);
}
