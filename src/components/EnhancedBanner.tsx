"use client";
import { urlFor } from "@/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import { ArrowRight, Sparkles } from "lucide-react";

const EnhancedBanner = ({ banners }: any) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    speed: 800,
    pauseOnHover: false,
    beforeChange: (prev: any, next: any) => {
      setActiveSlide(next);
    },
    appendDots: (dots: any) => (
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <ul className="flex items-center justify-center gap-2 m-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <button
        className={`transition-all duration-300 ${
          i === activeSlide
            ? "w-12 h-1.5 bg-white"
            : "w-8 h-1.5 bg-white/40 hover:bg-white/60"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {banners?.map((item: any, index: number) => (
          <div key={item?._id} className="relative">
            {/* Image Container */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
              <Image
                src={urlFor(item.image).url()}
                alt={item.title || "Banner image"}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />

              {/* Gradient Overlays for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                  <div className="max-w-2xl space-y-6 animate-fadeIn">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>New Collection 2026</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                      {item.title || "Elevate Your Style"}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-white/90 max-w-xl font-semibold leading-relaxed">
                      {item.subtitle ||
                        "Discover premium quality products crafted for the modern lifestyle"}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <span>Shop Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <span>View Collections</span>
                      </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center gap-6 pt-4 text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>4.9/5 Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span>Secure Checkout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-30 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
        <span className="font-bold">
          {String(activeSlide + 1).padStart(2, "0")}
        </span>
        <span className="text-white/60">
          {" "}
          / {String(banners?.length || 0).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default EnhancedBanner;
