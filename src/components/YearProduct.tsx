import Image from "next/image";
import React from "react";
import Container from "./Container";
// import productOfTheYear from "@/assets/productOfTheYear.webp";
import productOfTheYears from "@/assets/year.jpg";
// import productOfTheYears from "@/assets/newYEAR.jpg";
import Link from "next/link";

const YearProduct = () => {
  return (
    <div className="w-full bg-[#f3f3f3] relative">
      <Container className="relative py-0 mb-10">
        {/* Background Image */}
        <Image
          src={productOfTheYears}
          alt="Product Of The Year"
          className="w-full h-[500px] object-cover md:h-[600px] lg:h-[700px]"
        />

        {/* Text & Button Container */}
        <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:px-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Product of the Year
          </h1>
          <p className="text-sm md:text-base font-semibold text-white max-w-[600px] mt-2">
            Discover the top-rated product of the year with unbeatable quality
            and performance.
          </p>

          {/* Shop Now Button */}
          <Link
            href="/shop"
            className="bg-primeColor text-white text-sm md:text-lg px-6 py-2 hover:bg-black duration-300 font-bold flex items-center justify-center rounded-md mt-4"
          >
            Explore More
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default YearProduct;
