import type { CollectionConfig } from "payload";

// Regional hubs. Each KY county maps to a hub; member organizations get hub
// affiliation derived from their county (not assigned directly).
export const Hubs: CollectionConfig = {
  slug: "hubs",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "leadOrganizer"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "leadOrganizer",
      type: "relationship",
      relationTo: "organizations",
    },
    {
      name: "counties",
      type: "relationship",
      relationTo: "counties",
      hasMany: true,
      admin: {
        description: "Which Kentucky counties feed into this hub.",
      },
    },
  ],
};
