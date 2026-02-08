"use client";

import Container from "@/components/Container";
import { resetCart } from "@/redux/getNowSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SuccessPage = ({ searchParams }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams?.session_id) {
      router.replace("/");
      return;
    }

    // Clear cart after successful payment
    dispatch(resetCart());
  }, [dispatch, router, searchParams?.session_id]);

  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          🎉 Payment Successful!
        </h2>

        <p className="text-gray-600 max-w-md">
          Thank you for shopping with GetNow. Your order has been placed
          successfully.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href="/orders">
            <button className="bg-primeColor text-white w-48 h-12 rounded-full text-base font-semibold hover:bg-black duration-300">
              View My Orders
            </button>
          </Link>

          <Link href="/">
            <button className="bg-black text-white w-48 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
