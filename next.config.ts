import type { NextConfig } from "next";

const basePath = process.env.KITABS_BASE_PATH ?? "";
if (basePath !== "" && !/^\/[a-z0-9-]+$/.test(basePath)) {
  throw new Error("KITABS_BASE_PATH must be empty or a single lowercase URL segment");
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
