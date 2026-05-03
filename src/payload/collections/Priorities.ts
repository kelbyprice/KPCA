import type { CollectionConfig } from "payload";

// Advocacy priorities (legislative/policy positions).
// Source: PRIORITIES in prototype advocacy.jsx.
export const Priorities: CollectionConfig = {
  slug: "priorities",
  admin: {
    useAsTitle: "headline",
    defaultColumns: ["headline", "tag", "displayOrder"],
  },
  fields: [
    {
      name: "headline",
      type: "text",
      required: true,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
    {
      name: "tag",
      type: "text",
      admin: {
        description: "Chip label, e.g. 'Legislative · 2027 cycle'.",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Numbering shown as 01 / 02 / 03 / 04 — derived from this field.",
      },
    },
  ],
};
