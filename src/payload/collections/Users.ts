import type { CollectionConfig } from "payload";

// Payload's native admin auth — gates /admin access for KSTC staff only.
// Public-facing member auth uses Clerk and lives in a separate Members collection.
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
