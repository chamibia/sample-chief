
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	devIndicators: false,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.shopify.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;

