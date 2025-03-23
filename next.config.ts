import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactStrictMode: true,
    poweredByHeader: false,
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    experimental: {
        reactCompiler: true,
        nodeMiddleware: true,
    },
    transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};
export default nextConfig;
