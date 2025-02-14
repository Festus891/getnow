"use client";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Link from "next/link";
// import { ImCross } from "react-icons/im";
import Price from "./Price";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/getNowSlice";
import { MdDelete } from "react-icons/md";
interface Props {
  item: ProductProps;
}
const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  // Function to handle qunantity decrease  button click
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity({ _id: item?._id }));
    toast.success("product reduced successfully");
  };

  // Function to handle qunantity increase  button click
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity({ _id: item?._id }));
    toast.success("product increased successfully");
  };

  // Function to handle delete product from cart  button click
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(item?._id));
    toast.success(`${item?.title.substring(0, 12)}... deleted from cart`);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 border py-4 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 items-center gap-4 ml-4">
        <div className="flex flex-col items-center justify-center text-primeColor hover:text-red-500 cursor-pointer duration-300 ">
          <MdDelete onClick={handleDeleteProduct} />
          <p>Remove Item</p>
        </div>

        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt="product image"
            width={50}
            height={50}
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
          />
        </Link>
        <h1 className="text-sm sm:text-base font-semibold text-center md:text-left">
          {item?.title.substring(0, 20)}
        </h1>
      </div>

      <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center justify-between py-2 md:py-0 px-2 md:px-4">
        <p className="w-full md:w-1/3 text-lg font-semibold text-center md:text-left">
          <Price amount={item?.price} />
        </p>
        <div className="flex items-center gap-4 text-lg">
          <span
            onClick={handleDecreaseQuantity}
            className="w-8 h-8 sm:w-6 sm:h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border border-gray-300 hover:border-gray-500"
          >
            -
          </span>
          <p>{item?.quantity}</p>
          <span
            onClick={handleIncreaseQuantity}
            className="w-8 h-8 sm:w-6 sm:h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border border-gray-300 hover:border-gray-500"
          >
            +
          </span>
        </div>

        <p className="w-full md:w-1/3 text-lg font-bold text-center md:text-left">
          <Price amount={item.quantity * item.price} />
        </p>
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

export default CartItem;
