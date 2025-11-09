import type { NextConfig } from "next";
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "robohash.org",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default nextConfig;
