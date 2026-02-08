"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import logo from "@/assets/getnow logo.png";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import { MdSwitchAccount } from "react-icons/md";
import {
  BiSearch,
  BiUser,
  BiLogOut,
  BiCog,
  BiHeart,
  BiPackage,
} from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar";
import avatar from "@/assets/default_avatar.jpg";
import { FiShoppingBag } from "react-icons/fi";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

const ModernNavbar = () => {
  const pathName = usePathname();
  const { productData } = useSelector((state: StateProps) => state.getNow);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userName = user?.fullName || user?.firstName || "User";
  const userNames = user?.username || "User";

  const userImage = user?.imageUrl;

  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminEmails = useMemo(
    () => ["festus4537@gmail.com", "festus891@yahoo.com"],
    [],
  );

  const isAdmin = !!userEmail && adminEmails.includes(userEmail);

  const navBarList = useMemo(() => {
    const base = [
      { title: "Home", link: "/" },
      { title: "Shop", link: "/shop" },
    ];

    if (isAdmin) base.push({ title: "Studio", link: "/studio" });

    return base;
  }, [isAdmin]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const cartItemCount = productData ? productData.length : 0;

  return (
    <>
      <div
        className={`w-full h-20 bg-white border-b border-gray-200 sticky top-0 z-[100] transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href={"/"} className="flex-shrink-0 z-[102]">
            <Image
              src={logo}
              alt="getnow logo"
              className="w-[10rem] hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="relative w-full hidden md:flex lg:max-w-[600px]">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navBarList.map((item) => (
              <Link
                href={item.link}
                key={item.link}
                className={`relative px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group ${
                  pathName === item.link ? "text-gray-900" : ""
                }`}
              >
                {item.title}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform origin-left transition-transform duration-200 ${
                    pathName === item.link
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
            >
              <div className="relative">
                <FiShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Auth Section */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                  <MdSwitchAccount className="text-lg" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* Profile Dropdown */}
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                >
                  <Image
                    src={userImage || avatar}
                    alt="user profile"
                    width={36}
                    height={36}
                    className="rounded-full w-9 h-9 object-cover border-2 border-gray-200"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {userNames}
                    </p>
                    {/* <p className="text-xs text-gray-500 leading-tight">
                      {userEmail?.split("@")[0]}
                    </p> */}
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fadeIn">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {userEmail}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <BiUser className="text-lg text-gray-600" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <BiPackage className="text-lg text-gray-600" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <BiHeart className="text-lg text-gray-600" />
                        <span>Wishlist</span>
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <BiCog className="text-lg text-gray-600" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <SignOutButton>
                        <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 w-full">
                          <BiLogOut className="text-lg" />
                          <span>Sign Out</span>
                        </button>
                      </SignOutButton>
                    </div>
                  </div>
                )}
              </div>
            </SignedIn>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <BiSearch className="text-2xl" />
            </button>

            {/* Mobile Cart */}
            <Link href="/cart" className="relative p-2">
              <FiShoppingBag className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              <HiMenuAlt2 className="w-7 h-7" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-[101] flex flex-col animate-slideDown">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Products
            </h3>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoCloseOutline className="text-3xl text-gray-700" />
            </button>
          </div>
          <div className="p-4">
            <SearchBar />
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-[101] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoCloseOutline className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Mobile User Profile Section */}
        <SignedIn>
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Image
                src={userImage || avatar}
                alt="user profile"
                width={56}
                height={56}
                className="rounded-full w-14 h-14 object-cover border-2 border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">
                  {userName}
                </p>
                <p className="text-sm text-gray-600 truncate">{userEmail}</p>
              </div>
            </div>
          </div>
        </SignedIn>

        {/* Mobile Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navBarList.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 ${
                    pathName === item.link
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/cart"
                className={`flex items-center justify-between gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 ${
                  pathName === "/cart"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-gray-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Mobile Profile Links */}
          <SignedIn>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Account
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BiUser className="text-xl text-gray-600" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BiPackage className="text-xl text-gray-600" />
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BiHeart className="text-xl text-gray-600" />
                    <span>Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BiCog className="text-xl text-gray-600" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </SignedIn>
        </nav>

        {/* Mobile Menu Footer */}
        <div className="p-4 border-t border-gray-200">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                <MdSwitchAccount className="text-xl" />
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 text-base font-medium rounded-full hover:bg-red-100 transition-colors"
              >
                <BiLogOut className="text-xl" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
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
    </>
  );
};

export default ModernNavbar;
