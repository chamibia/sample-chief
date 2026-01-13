
import type { NextConfig } from "next";

// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	devIndicators: false,
	// Turbopack config for Next.js 16 compatibility (even when using webpack)
	turbopack: {},
	// Enable compiler optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	// Experimental features for better performance
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['lucide-react', 'framer-motion'],
	},
	images: {
		unoptimized: false,
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		qualities: [50, 60, 65, 75], // Add 60 to supported qualities
		minimumCacheTTL: 3600, // Increase cache time
		dangerouslyAllowSVG: false,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		// Ensure images are always optimized
		loader: 'default',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.shopify.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	// Add performance headers optimized for bfcache
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
			{
				source: '/projects',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=86400',
					},
				],
			},
			{
				source: '/assets/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	// Enable tree shaking for better bundle optimization
	modularizeImports: {
		'lucide-react': {
			transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
			preventFullImport: true,
		},
	},
	// Webpack optimizations for bundle size reduction
	webpack: (config, { isServer, dev }) => {
		if (!isServer && !dev) {
			// Optimized chunk splitting for reduced JavaScript execution time
			config.optimization.splitChunks = {
				chunks: 'all',
				minSize: 20000, // Increase minimum size for fewer chunks
				maxSize: 100000, // Smaller max size for faster parsing 
				maxInitialRequests: 10, // Reduce initial requests for faster loading
				maxAsyncRequests: 15, // Reduce async requests
				cacheGroups: {
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
					// Critical vendor chunk with React
					critical: {
						test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
						name: 'critical',
						priority: 30,
						chunks: 'all',
						enforce: true,
					},
					// Next.js core
					framework: {
						test: /[\\/]node_modules[\\/]next[\\/]/,
						name: 'framework',
						priority: 25,
						chunks: 'all',
						enforce: true,
					},
					// Vendor libraries
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						priority: 10,
						chunks: 'all',
						enforce: true,
						maxSize: 80000, // Smaller vendor chunks
					},
				},
			};
			
			// Tree shaking optimization
			config.optimization.usedExports = true;
			config.optimization.sideEffects = false;
		}
		return config;
	},
};

export default withBundleAnalyzer(nextConfig);