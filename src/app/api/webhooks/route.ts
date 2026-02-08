// import { client } from "@/lib/sanityClient";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// const fullfillOrder = async (session: any) => {
//   try {
//     await client.create({
//       _type: "order",
//       status: session.status,
//       message: "Payment done",
//       description: session?.description || " message from orders",
//       title: session?.id || "Orders",
//       method: session.confirmation_method,
//       amount: session.amount / 100,
//       // lineItem: lineItems,
//     });
//   } catch (error: any) {
//     console.log("error", error?.message);
//   }

//   console.log("session", session);
//   NextResponse.json({
//     message: "Payment done",
//     status: true,
//     method: session.status,
//     data: session,
//   });
// };

// export async function POST(req: Request) {
//   const payload = await req.text();
//   const signature = req.headers.get("stripe-signature");

//   let event: Stripe.Event | null = null;
//   try {
//     event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);

//     if (event?.type === "payment_intent.succeeded") {
//       const session = event.data.object;
//       return fullfillOrder(session)
//         .then(() => NextResponse.json({ status: 200 }))
//         .catch((err) =>
//           NextResponse.json({ error: err?.message }, { status: 500 })
//         );
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       return NextResponse.json({ message: err.message }, { status: 400 });
//     }
//   }

//   return NextResponse.json({ received: true });
// }

import { client } from "@/lib/sanityClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    // ✅ Correct event for Stripe Checkout
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const email = session.metadata?.email;

      // Avoid duplicates if webhook retries
      const stripeSessionId = session.id;

      const existing = await client.fetch(
        `*[_type=="order" && stripeSessionId==$id][0]{_id}`,
        { id: stripeSessionId },
      );

      if (!existing?._id) {
        await client.create({
          _type: "order",
          stripeSessionId,
          userId: userId || null,
          email: email || session.customer_details?.email || null,

          status: session.payment_status, // "paid" | "unpaid" | "no_payment_required"
          message: "Payment done",
          title: `Order ${stripeSessionId}`,
          amount: (session.amount_total ?? 0) / 100,
          currency: session.currency?.toUpperCase() || "NGN",
          createdAt: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
