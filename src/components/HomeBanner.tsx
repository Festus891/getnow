// import banner from "@/assets/banner1.jpg";
import banner from "@/assets/cooker.jpg";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="relative">
      <Image src={banner} alt="banner image" className="w-full h-full" />
      <Link
        href="/shop"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="relative bg-primeColor text-white text-sm md:text-lg px-6 py-2 font-bold rounded-md overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/60 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-700 animate-[shine_2s_linear_infinite]"></span>
          <span className="relative z-10">Explore More</span>
        </span>
      </Link>
    </div>
  );
};

export default HomeBanner;
