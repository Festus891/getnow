"use client";
import Container from "./Container";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import product from "@/sanity/schemaTypes/product";
import CartItem from "./CartItem";

const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.getNow);

  return (
    <Container>
      {productData.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2"> Product</h2>
            <h2 className=""> Price</h2>
            <h2 className=""> quantity</h2>
            <h2 className=""> Sub Total</h2>
          </div>
          <div>
            {productData.map((item) => (
              <div key={item._id}>
                {" "}
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No Product available in cart</p>
        </div>
      )}
    </Container>
  );
};

export default Cart;
