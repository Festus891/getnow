// app/api/webhook/route.ts
import { client } from "@/lib/sanityClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  try {
    // Retrieve line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    // Create order in Sanity
    const order = await client.create({
      _type: "order",
      userId: session.metadata?.userId || "",
      email: session.metadata?.email || session.customer_email || "",
      userName: session.metadata?.userName || "",
      status: session.payment_status,
      paymentIntentId: session.payment_intent as string,
      amount: session.amount_total! / 100,
      currency: session.currency?.toUpperCase() || "NGN",
      lineItems: lineItems.data.map((item: any) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.price?.unit_amount! / 100,
        image: (item.price?.product as any)?.images?.[0] || "",
      })),
      createdAt: new Date().toISOString(),
    });

    console.log("Order created successfully:", order);

    return NextResponse.json({
      message: "Payment done",
      status: true,
      orderId: order._id,
    });
  } catch (error: any) {
    console.error("Error fulfilling order:", error?.message);
    throw error;
  }
};

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);

    if (event?.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      return fulfillOrder(session)
        .then(() => NextResponse.json({ received: true, status: 200 }))
        .catch((err) =>
          NextResponse.json({ error: err?.message }, { status: 500 }),
        );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook error:", err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}
