import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Both Payload's CLI (tsx, strict ESM) and Next.js need to load
  // src/payload.config.ts. tsx requires explicit `.js` extensions on relative
  // imports (Node ESM rules). Bundlers (webpack/Turbopack) need to know to
  // resolve those `.js` imports to `.ts` source.

  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias ?? {}),
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return config;
  },

  turbopack: {
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"],
  },
};

export default withPayload(nextConfig);
