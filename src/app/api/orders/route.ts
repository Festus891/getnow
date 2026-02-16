import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export async function GET() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = groq`*[_type == "order" && userId == $userId]
    | order(createdAt desc) {
      _id,
      userId,
      email,
      userName,
      status,
      paymentIntentId,
      amount,
      currency,
      lineItems,
      createdAt
    }`;

  const orders = await client.fetch(query, { userId });

  return NextResponse.json({ orders });
}
