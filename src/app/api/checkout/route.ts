// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductProps } from "../../../../type";
import { urlFor } from "@/lib/sanityClient";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // Get Clerk user authentication
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { items } = await reqBody;

    const updatedItems = items.map((item: ProductProps) => ({
      quantity: item.quantity,
      price_data: {
        currency: "NGN",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [urlFor(item.image).url()],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: updatedItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      metadata: {
        userId: userId, // Clerk user ID
        email: user.emailAddresses[0]?.emailAddress || "",
        userName: `${user.firstName} ${user.lastName}`,
      },
    });

    return NextResponse.json({
      message: "Connection is alive",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
