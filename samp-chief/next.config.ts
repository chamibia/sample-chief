
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	devIndicators: false,
	images: {
		domains: ["cdn.shopify.com"],
	},
};

export default nextConfig;

