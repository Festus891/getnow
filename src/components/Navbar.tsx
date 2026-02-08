"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import logo from "@/assets/getnow logo.png";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import { MdSwitchAccount } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar";
import avatar from "@/assets/default_avatar.jpg";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const pathName = usePathname();
  const { productData } = useSelector((state: StateProps) => state.getNow);

  const { user } = useUser(); // ✅ Clerk user (replaces useSession)
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userImage = user?.imageUrl;

  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const adminEmails = useMemo(
    () => ["festus4537@gmail.com", "festus891@yahoo.com"],
    [],
  );

  const isAdmin = !!userEmail && adminEmails.includes(userEmail);

  const navBarList = useMemo(() => {
    const base = [
      { title: "Home", link: "/" },
      { title: "Shop", link: "/shop" },
      {
        title: "Cart",
        link: "/cart",
        cartNo: `(${productData ? productData.length : 0})`,
      },
    ];

    if (isAdmin) base.push({ title: "Studio", link: "/studio" });

    return base;
  }, [productData, isAdmin]);

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400 sticky top-0 z-[100]">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        <Link href={"/"}>
          <Image src={logo} alt="getnow logo" className="w-[10rem]" />
        </Link>

        {/* desktop searchbar */}
        <div className="relative w-full hidden md:inline-flex lg:w-[600px]">
          <SearchBar />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:inline-flex items-center gap-2">
          {navBarList.map((item) => (
            <Link
              href={item.link}
              key={item.link}
              className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-600 hover:underline underline-offset-4 decoration-[1px] hover:text-gray-950 md:border-r-[2px] border-r-gray-500 duration-200 last:border-r-0 ${
                pathName === item.link && "text-gray-950 underline"
              }`}
            >
              {item.title}
              <span className="pl-2">{(item as any).cartNo}</span>
            </Link>
          ))}

          {/* ✅ Clerk Sign in / Avatar */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex bg-white text-[#33475b] hover:font-medium justify-center items-center p-2 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-200">
                <MdSwitchAccount className="text-2xl pr-2" />
                <p>Sign in</p>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button
              className="flex bg-white text-[#33475b] hover:font-medium justify-center items-center p-2 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-200"
              type="button"
            >
              <Image
                src={userImage || avatar}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            </button>

            <SignOutButton>
              <button className="flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-red-600 md:border-r-[2px] border-r-gray-300 duration-200 last:border-r-0">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex gap-6">
          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <BiSearch
              onClick={() => setShowMobileSearch(true)}
              className="text-2xl cursor-pointer text-gray-600"
            />
          </div>

          {/* ✅ Mobile Avatar / Sign-in */}
          <SignedIn>
            <Image
              src={userImage || avatar}
              alt="user image"
              width={32}
              height={32}
              className="rounded-full inline-flex md:hidden cursor-pointer w-8 h-8 object-cover"
              onClick={() => setIsOpen(true)}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Image
                src={avatar}
                alt="user image"
                width={32}
                height={32}
                className="rounded-full inline-flex md:hidden cursor-pointer w-8 h-8 object-cover"
                onClick={() => setIsOpen(false)}
              />
            </SignInButton>
          </SignedOut>

          <HiMenuAlt2
            onClick={() => setIsOpen(true)}
            className="inline-flex md:hidden cursor-pointer w-8 h-6"
          />
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-[101] p-4 flex items-center justify-center">
          <SearchBar />
          <IoCloseOutline
            onClick={() => setShowMobileSearch(false)}
            className="absolute top-4 right-4 text-3xl cursor-pointer text-gray-600 hover:text-red-600"
          />
        </div>
      )}

      {/* Mobile Navigation Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
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
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}

          {/* ✅ Sign In / Profile */}
          <li>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <MdSwitchAccount className="text-2xl pr-2" />
                  <p>Sign in</p>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <Image
                  src={userImage || avatar}
                  alt="user image"
                  width={35}
                  height={35}
                  className="rounded-full w-9 h-9 object-cover"
                />
                <span className="text-gray-700 text-sm">
                  {userEmail || "Signed in"}
                </span>
              </div>
            </SignedIn>
          </li>

          {/* ✅ Logout Button */}
          <SignedIn>
            <li>
              <SignOutButton>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-red-500"
                >
                  Logout
                </button>
              </SignOutButton>
            </li>
          </SignedIn>
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
