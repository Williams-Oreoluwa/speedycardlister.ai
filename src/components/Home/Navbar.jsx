import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <nav
        className={`${
          visible
            ? "fixed block top-0 bg-[#B8C3FE] z-10 md:px-[3rem] lg:px-[5rem] font-poppins w-full"
            : "hidden"
        }  `}
      >
        <div className="hidden md:flex lg:flex xl:flex 2xl:flex py-6  items-center justify-center text-white ">
          <div className="flex item-center justify-center gap-4">
            <img src="/Logo.png" alt="" className="h-12 w-12" />
            <h1 className="text-[1rem]">
              SpeedyCard <br />
              Lister.A.I
            </h1>
          </div>

          <ul className="text-[.8rem] cursor-pointer text-md uppercase list-none sm:flex hidden justify-end items-center flex-1  text-[#000]">
            <li className="hover:bg-white p-4 hover:text-[#594EDC] hover:rounded-md">
              Home
            </li>
            <li className="hover:bg-white p-4 hover:text-[#594EDC] hover:rounded-md">
              About
            </li>
            <li className="hover:bg-white p-4 hover:text-[#594EDC] hover:rounded-md">
              Services
            </li>
            <li className="hover:bg-white p-4 hover:text-[#594EDC] hover:rounded-md">
              Contact
            </li>

            <li>
              <button className="p-4 bg-[#161577] rounded-md">
                <h1 className="text-white">
                  <Link to="/auth/sign-in">Get Started</Link>
                </h1>
              </button>
            </li>
          </ul>
        </div>
        <div className="block  md:hidden lg:hidden xl:hidden 2xl:hidden w-full p-5">
          <div className=" rounded-xl">
            <div className="flex items-center justify-between p-2">
              <div className="flex item-center justify-center gap-4">
                <img src="/Logo.png" alt="" className="h-12 w-12" />
                <h1 className="text-[1rem]">
                  SpeedyCard <br />
                  Lister.A.I
                </h1>
              </div>
              <div className="z-10">
                <span onClick={handleNav} className={nav ? "hidden" : "block"}>
                  <img src="/hamburger.svg" alt="" />
                </span>
                <span onClick={handleNav} className={nav ? "block " : "hidden"}>
                  <img src="/closeArrow.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={
          nav
            ? " fixed overflow-hidden top-0 left-0 w-full h-[100vh] md:hidden z-[2] lg:hidden xl:hidden 2xl:hidden"
            : "hidden"
        }
      >
        <div className="px-4 h-screen left-0 text-[20px]  bg-[#B8C3FE]">
          <ul className="relative top-[20%] flex flex-col text-left font-bold font-poppins  ">
            <li className="hover:bg-white p-2 hover:text-[#594EDC] hover:rounded-md hover:p-4">
              Home
            </li>
            <li className="hover:bg-white p-2 hover:text-[#594EDC] hover:rounded-md hover:p-4">
              About
            </li>
            <li className="hover:bg-white p-2 hover:text-[#594EDC] hover:rounded-md hover:p-4">
              Services
            </li>
            <li className="hover:bg-white p-2 hover:text-[#594EDC] hover:rounded-md hover:p-4">
              Contact
            </li>

            <li>
              <button className="p-4 bg-[#161577]  rounded-md">
                <h1 className="text-white flex items-center justify-center">
                  <Link to="/auth/sign-in">Get Started</Link>
                </h1>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
