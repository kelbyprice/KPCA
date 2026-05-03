import type { CollectionConfig } from "payload";

// Capital member tiers (Founding / Individual / Firm).
// Source: CAPITAL_TIERS in prototype membership.jsx.
export const CapitalTiers: CollectionConfig = {
  slug: "capitalTiers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "dues", "voting", "board", "dealFlow", "displayOrder"],
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
      admin: {
        description: "e.g. '$50 / yr', '$250 / yr + $50 each add'l professional', 'By invitation'.",
      },
    },
    {
      name: "voting",
      type: "text",
      admin: {
        description: "e.g. '1.5×', '1×'.",
      },
    },
    {
      name: "board",
      type: "text",
      admin: {
        description: "e.g. 'Eligible'.",
      },
    },
    {
      name: "dealFlow",
      type: "select",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Priority", value: "priority" },
        { label: "Lead", value: "lead" },
      ],
    },
    {
      name: "firmDisplay",
      type: "select",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "footnoteAnchor",
      type: "text",
      admin: {
        description: "Footnote indicator like '*' if this tier has an attached footnote.",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
