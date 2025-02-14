"use client";
import { useDispatch } from "react-redux";
import { ProductProps } from "../../type";
import Price from "./Price";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/getNowSlice";

interface Props {
  product: ProductProps;
}
const ProductInfo = ({ product }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.title.substring(0, 12)}... added to cart`);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        {product?.title}
      </h2>

      {/* Pricing Section */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <p className="text-base sm:text-lg font-normal text-gray-500 line-through">
          <Price amount={product?.rowprice} />
        </p>

        <Price
          amount={product?.price}
          className="text-base sm:text-lg font-bold"
        />

        <p className="text-xs sm:text-sm">
          You saved{" "}
          <Price
            className="bg-green-700 text-white px-2 rounded-md"
            amount={product?.rowprice - product?.price}
          />{" "}
          on this item
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{product?.description}</p>
      <p className="text-xs sm:text-sm text-gray-500">
        Be the first to leave a review.
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 sm:py-4 bg-primeColor hover:bg-black transition duration-300 text-white text-sm sm:text-lg rounded-md"
      >
        Add to Cart
      </button>

      {/* Categories */}
      <p className="text-xs sm:text-sm font-normal">
        <span className="text-sm sm:text-base font-medium">Categories:</span>{" "}
        Spring collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
