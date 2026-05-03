import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Payload v3 lives inside the same Next.js app — withPayload handles the
  // server-only externals (sharp, drizzle, etc.) so they don't bundle to the client.
};

export default withPayload(nextConfig);
