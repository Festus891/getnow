import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductProps } from "../../../../type";
import { urlFor } from "@/lib/sanityClient";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async (request: NextRequest) => {
  try {
    // ✅ FIX: await the auth() function since it returns a Promise
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Get current user info
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "No email found for this account" },
        { status: 400 },
      );
    }

    // ✅ Parse request body
    const reqBody = await request.json();
    const { items } = reqBody as { items: ProductProps[] };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ✅ Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
    });

    // ✅ Format items for Stripe
    const updatedItems = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "NGN",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          description: item.description,
          images: [urlFor(item.image).url()],
        },
      },
    }));

    // ✅ Get base URL from environment
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // ✅ Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: updatedItems,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      metadata: {
        userId, // ✅ Important for tracking orders
        email, // ✅ Backup email reference
      },
    });

    return NextResponse.json({
      message: "Checkout session created",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session" },
      { status: 500 },
    );
  }
};
