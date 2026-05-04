import type { CollectionConfig } from "payload";

// Public-facing humans: capital members (individuals + investment professionals
// at member firms), industry contacts, and elected board members.
//
// Identity is owned by Clerk; this collection mirrors Clerk users so we can
// (a) reference people in CMS content (event speakers, leadership, etc.),
// (b) track application/approval state, and (c) hold KPCA-internal role and
// firm affiliation. The Clerk webhook upserts here on user.* events.
//
// Source of truth split:
//   Clerk           → identity (email verification, MFA, social login, password)
//   Payload People  → KPCA role, firm affiliation, application status
//
// Roles propagate Payload → Clerk publicMetadata via an afterChange hook so
// Clerk-side authorization checks (middleware, frontend) can read them.
export const People: CollectionConfig = {
  slug: "people",
  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "email",
      "firstName",
      "lastName",
      "role",
      "applicationStatus",
      "organization",
    ],
  },
  fields: [
    {
      name: "clerkUserId",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Clerk user ID (user_xxx). Set by webhook; do not edit by hand.",
        readOnly: true,
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "member",
      index: true,
      options: [
        { label: "Member", value: "member" },
        { label: "Board", value: "board" },
        { label: "Chair", value: "chair" },
        { label: "Staff", value: "staff" },
      ],
      admin: {
        description:
          "KPCA-internal role. Source of truth lives here; synced to Clerk publicMetadata on change.",
      },
    },
    {
      name: "organization",
      type: "relationship",
      relationTo: "organizations",
      index: true,
      admin: {
        description:
          "Member firm. Null = individual capital member (no firm affiliation).",
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Job title at the member firm (e.g. \"Managing Partner\").",
      },
    },
    {
      name: "applicationStatus",
      type: "select",
      required: true,
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      admin: {
        description:
          "Application state. Set to pending on signup; KSTC staff transitions to approved/rejected.",
      },
    },
    {
      name: "approvedAt",
      type: "date",
      admin: {
        description: "Stamped when applicationStatus first becomes approved.",
        readOnly: true,
      },
    },
    {
      name: "approvedBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "KSTC staff member who approved the application.",
      },
    },
    {
      name: "linkedinUrl",
      type: "text",
      admin: {
        description: "Full https:// URL.",
      },
    },
    {
      name: "phone",
      type: "text",
    },
  ],
};
