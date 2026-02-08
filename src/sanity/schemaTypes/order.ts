import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",

  fields: [
    // ===== Ownership / Auth =====
    defineField({
      name: "userId",
      title: "Clerk User ID",
      type: "string",
      description: "Clerk userId of the customer",
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
    }),

    // ===== Stripe =====
    defineField({
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
    }),

    defineField({
      name: "paymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
    }),

    // ===== Order Info =====
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Order",
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "string",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
          { title: "Refunded", value: "refunded" },
        ],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "method",
      title: "Payment Method",
      type: "string",
    }),

    // ===== Pricing =====
    defineField({
      name: "amount",
      title: "Total Amount",
      type: "number",
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "NGN",
    }),

    // ===== Optional: line items =====
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "price", title: "Price", type: "number" }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),
            defineField({ name: "image", title: "Image", type: "string" }),
          ],
        },
      ],
    }),

    // ===== Metadata =====
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
});
