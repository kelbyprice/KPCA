import type { CollectionConfig } from "payload";

// Member organizations (firms): capital + industry. Public-facing label is
// still "Members" (see /members directory page). Will mirror Clerk Orgs once
// Phase 2 auth lands; individual humans live in the People collection.
//
// Source: MEMBER_CAPITAL + MEMBER_INDUSTRY in prototype members.jsx.
// `featuredOnHome` drives the founding-coalition strip on the home page.
export const Organizations: CollectionConfig = {
  slug: "organizations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "kind", "city", "state", "featuredOnHome"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "clerkOrgId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Clerk organization ID (org_xxx). Paste from the Clerk dashboard once the firm has been created there. Webhook uses this to sync memberships.",
      },
    },
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
      name: "type",
      type: "text",
      admin: {
        description:
          "Capital only: Fund, Angel network, Family Office, CVC. Leave blank for industry members.",
        condition: (data) => data?.kind === "capital",
      },
    },
    {
      name: "sector",
      type: "text",
      admin: {
        description: "Industry only: Spirits & Beverage, Healthcare, etc.",
        condition: (data) => data?.kind === "industry",
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
      name: "note",
      type: "textarea",
    },
    {
      name: "website",
      type: "text",
      admin: {
        description: "URL — full https:// link.",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "featuredOnHome",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show on the home-page founding coalition strip.",
      },
    },
    {
      name: "county",
      type: "relationship",
      relationTo: "counties",
    },
    {
      name: "tier",
      type: "relationship",
      relationTo: ["capitalTiers", "industryTiers"],
      admin: {
        description: "Polymorphic — capital members link to capitalTiers, industry to industryTiers.",
      },
    },
  ],
};
