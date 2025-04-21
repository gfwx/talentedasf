import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        return config;
    },
};

module.exports = {
    images: {
        // Stupidest shit ever
        remotePatterns: [
            new URL("https://eyluvqxrqfihmhxojklw.supabase.co/**"),
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        },
    },
};

export default nextConfig;
