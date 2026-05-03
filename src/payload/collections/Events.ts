import type { CollectionConfig } from "payload";

// Past + upcoming events. Single collection — derived split via `date` >= today.
// Source: UPCOMING + PAST arrays in prototype events.jsx.
export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "city", "audience", "featured"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "state",
      type: "text",
      defaultValue: "KY",
    },
    {
      name: "audience",
      type: "select",
      required: true,
      options: [
        { label: "Capital members", value: "capital" },
        { label: "Industry members", value: "industry" },
        { label: "Both", value: "both" },
        { label: "Public", value: "public" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Hero treatment on the events page (next upcoming featured event).",
      },
    },
    {
      name: "rsvpUrl",
      type: "text",
      admin: {
        description: "URL — registration link.",
      },
    },
  ],
};
