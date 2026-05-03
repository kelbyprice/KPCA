import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Members } from "./payload/collections/Members";
import { Companies } from "./payload/collections/Companies";
import { Events } from "./payload/collections/Events";
import { Leadership } from "./payload/collections/Leadership";
import { Priorities } from "./payload/collections/Priorities";
import { CapitalTiers } from "./payload/collections/CapitalTiers";
import { IndustryTiers } from "./payload/collections/IndustryTiers";
import { Benefits } from "./payload/collections/Benefits";
import { Hubs } from "./payload/collections/Hubs";
import { Counties } from "./payload/collections/Counties";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Members,
    Companies,
    Events,
    Leadership,
    Priorities,
    CapitalTiers,
    IndustryTiers,
    Benefits,
    Hubs,
    Counties,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
