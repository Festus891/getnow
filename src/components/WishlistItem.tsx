"use client";

import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanityClient";
import Price from "./Price";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "@/redux/getNowSlice";
import { MdDelete } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";

interface Props {
  item: ProductProps;
}

const WishlistItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlist(item._id));
    toast.success(`${item?.title.substring(0, 12)}... removed`);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      }),
    );
    toast.success(`${item?.title.substring(0, 12)}... added to cart`);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 border py-4 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 items-center gap-4 ml-4">
        <div className="flex flex-col items-center justify-center text-primeColor hover:text-red-500 cursor-pointer duration-300 ">
          <MdDelete onClick={handleRemove} />
          <p>Remove</p>
        </div>

        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt="product image"
            width={80}
            height={80}
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
          />
        </Link>

        <h1 className="text-sm sm:text-base font-semibold text-center md:text-left">
          {item?.title.substring(0, 25)}
        </h1>
      </div>

      <p className="text-lg font-semibold flex items-center justify-center md:justify-start">
        <Price amount={item?.price} />
      </p>

      <div className="flex items-center justify-center md:justify-start">
        <button
          onClick={handleAddToCart}
          className="bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-2 hover:bg-gray-950 hover:text-white duration-200"
        >
          <RiShoppingCart2Fill />
          Add to cart
        </button>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default WishlistItem;
