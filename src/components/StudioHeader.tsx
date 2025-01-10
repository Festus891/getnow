import Link from "next/link";
import React from "react";
import logo from "@/assets/getnow logo.png";
import Image from "next/image";
import { IoReturnDownBack } from "react-icons/io5";

const StudioHeader = (props: any) => {
  return (
    <div>
      <div className="p-5 bg-black text-gray-100 flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-3 font-semibold hover:text-blue-600 duration-200"
        >
          <IoReturnDownBack className="text-2xl" /> Go back to website
        </Link>
        <Image alt="getnow logo" src={logo} className="w-24" />
        <p className="text-sm">
          Admin studio of GetNow website online shopping
        </p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioHeader;
