'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password }),
			});

			const data = await response.json();

			if (data.success) {
				router.push('/admin');
				router.refresh();
			} else {
				setError(data.message || 'Nesprávné heslo');
			}
		} catch (err) {
			console.error('Ошибка при входе:', err);
			setError('Chyba připojení k serveru');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-black">
			<div className="content_container">
				<div className="max-w-md mx-auto">

					{/* Форма входа */}
					<div className="border-2 border-marigold/30 bg-black p-8 md:p-10 hover:border-marigold transition-all duration-300">
						<h1 className="text-2xl md:text-3xl font_nexa text-marigold mb-8 text-center">
							PŘIHLÁŠENÍ DO ADMIN PANELU
						</h1>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="password"
									className="block text-sm font_nexa text-marigold mb-3"
								>
									HESLO
								</label>
								<input
									id="password"
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									className="w-full px-4 py-3 bg-black border-2 border-nugget/50 focus:border-marigold outline-none text-marigold transition-all duration-300 placeholder:text-gray-600"
									placeholder="Zadejte heslo"
									required
									disabled={loading}
								/>
							</div>

							{error && (
								<div className="border-2 border-red-500/50 bg-red-900/20 text-red-400 px-4 py-3 text-sm">
									{error}
								</div>
							)}

							<button
								type="submit"
								disabled={loading}
								className="w-full border-2 border-nugget px-6 py-3 text-black bg-gradient-to-br from-[#b57e10] to-[#f9df7b] hover:from-[#f9df7b] hover:to-[#b57e10] transition-all duration-300 font_nexa text-lg disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? 'PŘIHLAŠOVÁNÍ...' : 'PŘIHLÁSIT SE'}
							</button>
						</form>
					</div>

					{/* Ссылка на главную */}
					<div className="mt-6 text-center">
						<Link
							href="/"
							className="text-marigold/70 hover:text-marigold transition-colors duration-300 font_nexa text-sm"
						>
							← Zpět na hlavní stránku
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
