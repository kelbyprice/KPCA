import type { CollectionConfig } from "payload";

// Board / officers / open seats — three groupings shown as rows on the about page.
// Source: LEADERSHIP in prototype about.jsx.
export const Leadership: CollectionConfig = {
  slug: "leadership",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "kpcaRole", "affiliation", "group", "displayOrder"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "kpcaRole",
      type: "text",
      admin: {
        description: "KPCA-specific role, e.g. 'Founding Chair, KPCA'.",
      },
    },
    {
      name: "externalRole",
      type: "text",
      admin: {
        description: "Title at their firm: 'Managing Partner', 'VP', 'Founder'.",
      },
    },
    {
      name: "affiliation",
      type: "text",
      admin: {
        description: "Firm name (or 'To be elected — June 2026' for placeholders).",
      },
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "group",
      type: "select",
      required: true,
      options: [
        { label: "Officers (founding leadership)", value: "officers" },
        { label: "Board (founding board)", value: "board" },
        { label: "Open seats / placeholders", value: "open-seats" },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "isOpenSeat",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Marks placeholder entries (member-elected seats, TBA counsel, etc.).",
      },
    },
  ],
};
