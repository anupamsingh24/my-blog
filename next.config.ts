import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export works great for this kind of content-driven blog on
  // Cloudflare Pages / GitHub Pages. Comment the line below out if you
  // want to deploy to Vercel and use server features instead.
  // output: "export",
};

export default nextConfig;
