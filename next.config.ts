import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'http',
				hostname: '**.ua',
			},
			{
				protocol: 'https',
				hostname: '**.ua',
			},
		],
		unoptimized: false,
		// Поддержка data URLs (base64 изображения)
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

export default nextConfig;
