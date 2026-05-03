import type { CollectionConfig } from "payload";

// Kentucky counties. Each belongs to exactly one hub.
// Seeded with the subset referenced in prototype data; can expand to all 120.
export const Counties: CollectionConfig = {
  slug: "counties",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "hub"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "hub",
      type: "relationship",
      relationTo: "hubs",
    },
  ],
};
