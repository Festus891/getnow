"use client";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/getnow logo.png";
import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import { IoCloseOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import { MdSwitchAccount } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const pathName = usePathname();
  const { productData } = useSelector((state: StateProps) => state.getNow);

  // const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  // console.log("user image", session?.user?.image);

  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const adminEmails = ["festus4537@gmail.com", "festus891@yahoo.com"];
  const isAdmin =
    session?.user && adminEmails.includes(session?.user?.email as string);

  // console.log("current user", session?.user?.email);
  const navBarList = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Shop",
      link: "/shop",
    },
    {
      title: `Cart`,
      link: "/cart",
      cartNo: `(${productData ? productData?.length : 0})`,
    },
  ];

  if (isAdmin) {
    navBarList.push({
      title: "Studio",
      link: "/studio",
    });
  }
  return (
    <div className="w-full h-20  bg-white border-b-[1px] border-b-gray-400 sticky top-0 z-[100]">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        <Link href={"/"}>
          <Image src={logo} alt="getnow logo" className="w-[10rem]" />
        </Link>

        {/* desktop searchbar */}
        <div className="relative w-full hidden md:inline-flex lg:w-[600px] ">
          <SearchBar />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:inline-flex items-center gap-2">
          {navBarList.map((item) => (
            <Link
              href={item?.link}
              key={item?.link}
              className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-600 hover:underline underline-offset-4 decoration-[1px] hover:text-gray-950 md:border-r-[2px] border-r-gray-500 duration-200 last:border-r-0 ${
                pathName === item?.link && "text-gray-950 underline"
              } `}
            >
              {item.title}
              <span className="pl-2">{item.cartNo}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              if (!session?.user) {
                signIn();
              }
            }}
            className="flex bg-white text-[#33475b] hover:font-medium  justify-center items-center p-2  hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600  duration-200 last:border-r-0"
          >
            {session?.user ? (
              <Image
                src={session?.user?.image || "./default"} // Default image fallback
                alt="user image"
                width={500}
                height={500}
                // style={{ width: 35, height: 35 }}
                className="rounded-full"
              />
            ) : (
              <>
                <MdSwitchAccount className="text-2xl pr-2" />
                <p>Sign in</p>
              </>
            )}
          </button>

          {session?.user && (
            <button
              onClick={() => signOut()}
              className="flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-red-600 md:border-r-[2px] border-r-gray-300 duration-200 last:border-r-0"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <HiMenuAlt2
          onClick={() => setIsOpen(true)}
          className="inline-flex md:hidden cursor-pointer w-8 h-6  "
        />
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <IoCloseOutline
            className="w-8 h-8 cursor-pointer text-gray-600 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Mobile Menu Items */}
        <ul className="flex flex-col items-center gap-4 text-lg font-medium">
          {navBarList.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className="text-gray-700 hover:text-blue-500"
                onClick={() => setIsOpen(false)} // Close menu when clicked
              >
                {item.title}
              </Link>
            </li>
          ))}

          {/* Sign In / Profile */}
          <li>
            <button
              onClick={() => {
                if (!session?.user) {
                  signIn();
                }
                setIsOpen(false);
              }}
              className="flex items-center text-gray-700 hover:text-blue-500"
            >
              {session?.user ? (
                <Image
                  src={session.user.image!}
                  alt="user image"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              ) : (
                <>
                  <MdSwitchAccount className="text-2xl pr-2" />
                  <p>Sign in</p>
                </>
              )}
            </button>
          </li>

          {/* Logout Button */}
          {session?.user && (
            <li>
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:text-red-500"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
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

export default Navbar;
