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
	},
};

export default nextConfig;
