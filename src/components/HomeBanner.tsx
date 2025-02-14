// import banner from "@/assets/banner1.jpg";
import banner from "@/assets/newYEAR.jpg";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div>
      <Image src={banner} alt="banner image" className="w-full h-full" />
    </div>
  );
};

export default HomeBanner;
