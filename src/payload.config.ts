import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./payload/collections/Users.js";
import { Organizations } from "./payload/collections/Organizations.js";
import { People } from "./payload/collections/People.js";
import { Companies } from "./payload/collections/Companies.js";
import { Events } from "./payload/collections/Events.js";
import { Leadership } from "./payload/collections/Leadership.js";
import { Priorities } from "./payload/collections/Priorities.js";
import { CapitalTiers } from "./payload/collections/CapitalTiers.js";
import { IndustryTiers } from "./payload/collections/IndustryTiers.js";
import { Benefits } from "./payload/collections/Benefits.js";
import { Hubs } from "./payload/collections/Hubs.js";
import { Counties } from "./payload/collections/Counties.js";

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
    People,
    Organizations,
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
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_FROM_ADDRESS || "noreply@kpca.org",
    defaultFromName: process.env.RESEND_DEFAULT_FROM_NAME || "KPCA",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  sharp,
});
