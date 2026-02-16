"use client";

import React from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import WishlistItem from "../components/WishlistItem";
import { resetWishlist } from "@/redux/getNowSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import emptyCart from "@/assets/emptyCart.png";
import { motion } from "framer-motion";
import Link from "next/link";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state: StateProps) => state.getNow);

  const handleReset = () => {
    const confirm = window.confirm(
      "Are you sure you want to clear your wishlist?",
    );
    if (confirm) {
      dispatch(resetWishlist());
      toast.success("Wishlist cleared successfully");
    }
  };

  return (
    <Container>
      {productData.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-4 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Action</h2>
          </div>

          <div className="mt-5">
            {productData.map((item) => (
              <div key={item?._id}>
                <WishlistItem item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Clear wishlist
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <Image
              src={emptyCart}
              alt="Empty wishlist"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Wishlist is empty.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Tap the heart icon on products to save them here.
            </p>
            <Link
              href={"/shop"}
              className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300"
            >
              Browse products
            </Link>
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default Wishlist;
