import type { CollectionConfig } from "payload";

// Payload's native admin auth — gates /admin access for KSTC staff only.
// Public-facing member identity is owned by Clerk; humans are mirrored into
// the People collection, firms into the Organizations collection.
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
