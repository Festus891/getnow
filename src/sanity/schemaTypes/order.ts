// sanity/schemas/order.ts
export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
    },
    {
      name: "paymentIntentId",
      title: "Payment Intent ID",
      type: "string",
    },
    {
      name: "amount",
      title: "Amount",
      type: "number",
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
    },
    {
      name: "lineItems",
      title: "Line Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
            { name: "image", type: "string", title: "Image URL" },
          ],
        },
      ],
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
