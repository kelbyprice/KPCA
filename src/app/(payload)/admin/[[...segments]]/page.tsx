/* THIS FILE IS THE PAYLOAD ADMIN ENTRYPOINT. DO NOT MODIFY DIRECTLY. */

import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";

import { importMap } from "../importMap.js";

// Payload v3 wants stricter param/searchParam types than Next 16's defaults.
// Cast at the boundary to bridge — the values are compatible at runtime; only
// the type signatures differ (Next uses `| undefined`, Payload omits it).
type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });

const Page = ({ params, searchParams }: Args) =>
  RootPage({
    config,
    params,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
    importMap,
  });

export default Page;
