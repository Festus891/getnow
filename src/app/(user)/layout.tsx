import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import PageButton from "@/components/PageButton";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "GetNow store || Best place to shop",
  description: "Trusted online shopping",
  icons: {
    icon: "/fav.png", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">
        <Layout>
          <Navbar />
          <PageButton />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
