import type { CollectionConfig } from "payload";

// Industry member tiers (Founding / Strategic / Standard).
// Source: INDUSTRY_TIERS in prototype membership.jsx.
export const IndustryTiers: CollectionConfig = {
  slug: "industryTiers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "dues", "sectorBriefings", "pilotPathways", "summitAccess", "displayOrder"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "dues",
      type: "text",
    },
    {
      name: "sectorBriefings",
      type: "text",
      admin: {
        description: "e.g. 'All sectors', 'Up to 3 sectors', '1 sector'.",
      },
    },
    {
      name: "pilotPathways",
      type: "select",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Priority", value: "priority" },
      ],
    },
    {
      name: "summitAccess",
      type: "select",
      options: [
        { label: "Reserved seats", value: "reserved" },
        { label: "General admission", value: "general" },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
