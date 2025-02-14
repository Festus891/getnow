"use client";
// import React, { useState } from "react";
// import Container from "./Container";
import Link from "next/link";
import { AiOutlineCopyright } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";

const Footer = () => {
  // const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu
  // const { data: session } = useSession();

  return (
    <footer className="w-full bg-[#F5F5F3] py-8 border-t">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-primeColor duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primeColor duration-200"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-primeColor duration-200"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Account</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => {
                    signIn();
                  }}
                  className="hover:text-primeColor duration-200"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="hover:text-primeColor duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Policies</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-primeColor duration-200">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primeColor duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          {/* Copyright Section */}
          <p className="flex items-center">
            <AiOutlineCopyright className="mr-1" />
            Copyright {new Date().getFullYear()} | GetNow Online Shopping | All
            Rights Reserved |
            <a
              href="https://festsus.codes/"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-medium hover:text-primeColor"
            >
              Powered by Aderibigbe Festus
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-primeColor">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primeColor">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primeColor">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
