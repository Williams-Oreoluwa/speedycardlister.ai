import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0304FF] flex flex-col lg:flex-col-reverse p-8  lg:px-36 py-14 lg:py-14 text-white">
      <nav className="flex gap-10 sm:gap-40 justify-center my-8 lg:my-20 lg:flex-col lg:gap-4 underline">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Service</Link>
      </nav>
      <div className="flex  flex-col gap-y-8 lg:flex-row items-center justify-between">
        <div className="flex item-center justify-center gap-4">
          <img src="/Logo.png" alt="" className="h-12 w-12" />
          <h1 className="text-[1rem] flex items-center">
            SpeedyCard <br className="hidden sm:block" />
            Lister.A.I
          </h1>
        </div>
        <div className="text-medium text-base leading-5 ">
          2017 - 2023 Company Name Inc.
        </div>
        <div className="flex gap-2 items-center">
          <img src="/instagram.svg" className="w-8 h-8" />
          <img src="/twitter.svg" className="w-8 h-8" />
          <img src="/youtube.svg" className="w-8 h-8" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
