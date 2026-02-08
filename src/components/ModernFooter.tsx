"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineCopyright,
  AiOutlineMail,
  AiOutlineSend,
} from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { BiPhone, BiEnvelope, BiMapPin, BiTime } from "react-icons/bi";
import {
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlineSecurity,
} from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import Image from "next/image";
import logo from "@/assets/getnow logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import toast from "react-hot-toast";

const ModernFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);

    // Simulate API call - replace with actual newsletter signup logic
    setTimeout(() => {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={logo}
                alt="GetNow logo"
                className="w-40 hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted online shopping destination for quality products at
              unbeatable prices. We deliver excellence with every order.
            </p>

            {/* Newsletter Subscription */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AiOutlineMail className="text-lg" />
                Subscribe to Newsletter
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AiOutlineSend className="text-lg" />
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-700 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-2.5">
              <SignedOut>
                <li>
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                      Sign In
                    </button>
                  </SignInButton>
                </li>
              </SignedOut>

              <SignedIn>
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <SignOutButton>
                    <button className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-0 h-px bg-red-600 group-hover:w-4 transition-all duration-200"></span>
                      Logout
                    </button>
                  </SignOutButton>
                </li>
              </SignedIn>

              <li>
                <Link
                  href="/track-order"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 mb-6">
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-200"></span>
                  FAQ
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <BiPhone className="text-gray-600 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-gray-900 hover:text-gray-700"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BiEnvelope className="text-gray-600 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:support@getnow.com"
                    className="text-sm text-gray-900 hover:text-gray-700"
                  >
                    support@getnow.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            {/* Copyright */}
            <p className="flex items-center flex-wrap justify-center gap-1">
              <AiOutlineCopyright className="flex-shrink-0" />
              <span>
                {currentYear} GetNow Online Shopping. All Rights Reserved.
              </span>
              <span className="hidden md:inline">|</span>
              <a
                href="https://festsus.codes/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 hover:underline"
              >
                Powered by Aderibigbe Festus
              </a>
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                We Accept:
              </span>
              <div className="flex gap-2">
                <div className="w-10 h-7 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-600">
                    VISA
                  </span>
                </div>
                <div className="w-10 h-7 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  </div>
                </div>
                <div className="w-10 h-7 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-700">
                    AMEX
                  </span>
                </div>
                <div className="w-10 h-7 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-500">
                    PayPal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
