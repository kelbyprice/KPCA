import type { CollectionConfig } from "payload";

// Portfolio companies built/backed by capital members. Distinct from the
// Organizations collection (which holds the member firms themselves).
// Source: HOME_COMPANIES in prototype home.jsx.
export const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sector", "city", "state", "featured"],
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
      name: "sector",
      type: "text",
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "state",
      type: "text",
      defaultValue: "KY",
    },
    {
      name: "website",
      type: "text",
      admin: {
        description: "URL — full https:// link.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show on home-page 'Real founders. Real products.' strip.",
      },
    },
    {
      name: "backedBy",
      type: "relationship",
      relationTo: "organizations",
      hasMany: true,
      admin: {
        description: "Capital member firms that backed this company.",
      },
    },
  ],
};
