import { NextResponse } from "next/server";
import { products } from "@/lib/sanityClient"; // Ensure this import is correct

export async function GET() {
  try {
    const productData = await products();
    return NextResponse.json(productData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
