import Banner from "@/components/Banner";
import BestSeller from "@/components/BestSeller";
import HomeBanner from "@/components/HomeBanner";
import NewArrival from "@/components/NewArrival";
import YearProduct from "@/components/YearProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

// in case we add more banner image on sanity , it revalidate to display on the frontend
export const revalidate = 10;

//Query to fetch banner data from sanity studio
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

//Query to fetch by New arrival data from sanity studio
const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrivals']{
 ...
} | order(_createdAt asc)`;

//Query to fetch  by BestSeller data from sanity studio
const bestSellerQuery = groq`*[_type == 'product' && position == 'BestSeller']{
 ...
} | order(_createdAt asc)`;

//Query to fetch by Special offer data from sanity studio
const specialOfferQuery = groq`*[_type == 'product' && position == 'Special Offers']{
 ...
} | order(_createdAt asc)`;

const HomePage = async () => {
  const banners = await client.fetch(bannerQuery);
  const newArivalsProduct = await client.fetch(bestSellerQuery);
  const bestSellersProduct = await client.fetch(bestSellerQuery);
  const specialOfferProduct = await client.fetch(specialOfferQuery);
  // console.log("banner data:", banners);
  return (
    <main className="text-sm overflow-hidden min-h-screen">
      <Banner banners={banners} />
      <NewArrival products={newArivalsProduct} />
      <HomeBanner />
      <BestSeller products={bestSellersProduct} title="Best Selling Products" />
      <YearProduct />
      <BestSeller products={bestSellersProduct} title="Special Offers" />
    </main>
  );
};

export default HomePage;
