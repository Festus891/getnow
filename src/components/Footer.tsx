import React from "react";
import Container from "./Container";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full bg-[#F5F5F3]  -mb-0">
      <Container className="max-w-container mx-auto border-t-[1px] group">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2022 | GetNow Online Shopping | All Rights Reserved |
          <a href="https://festsus.codes/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Powered by Aderibigbe Festus
            </span>
          </a>
        </p>
      </Container>
    </div>
  );
};

export default Footer;
