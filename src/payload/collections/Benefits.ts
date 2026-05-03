import type { CollectionConfig } from "payload";

// Membership benefits (capital + industry, full descriptions).
// Source: CAPITAL_BENEFITS + INDUSTRY_BENEFITS in prototype membership.jsx.
export const Benefits: CollectionConfig = {
  slug: "benefits",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "kind", "displayOrder"],
  },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      options: [
        { label: "Capital", value: "capital" },
        { label: "Industry", value: "industry" },
      ],
    },
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
