import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className=" font-poppins text-left  min-h-screen">
      <section className="flex mt-[.8rem] flex-col  py-[5rem] p-12  2xl:px-0 ">
        <div className="mx-2 my-auto flex flex-col item-center justify-between sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <div className="flex flex-col item-center justify-center  gap-6">
            <h1 className="mt-[30%] md:mt-[20%] lg:mt-0 xl:mt-0 2xl:mt-0 xl:p-12 2xl:p-12 text-[2rem] md:text-[2.5rem] lg:text-[4.5rem] xl:text-[4.5rem] 2xl:text-[4.7rem] font-semibold text-black">
              Best solution for <br /> your <span className="text-[#0304FF] p-1 bg-slate-50 rounded-md">
                {" "}
                 sport's card{" "}
              </span>{" "}
              <br />
              Trading.
            </h1>
            <div className=" xl:p-12 2xl:p-12  flex flex-col gap-6  ">
              <div>
                Upload your sports card for trading and <br />
                instant crediting of your account on <br />
                SpeedyCardLister.A.I
              </div>
              <div className=" after:xl:py-12 2xl:py-12 flex items-center justify-start gap-4 ">
                <button className="bg-[#0304FF] p-2 rounded-lg text-[1.5rem] text-white">
                  <Link to="/auth/register">Sign Up</Link>
                </button>
                <button className="bg-transparent p-2 rounded-lg text-[1.5rem] border-2 border-[#0304FF] text-[#0304FF]">
                  <Link to="/auth/sign-in">Sign In</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="relative md:p-[4rem] lg:p-[4rem]">
            <div class="absolute card-img top-[22rem] right-[0] md:right-0 mr-[35%]  mx-auto my-2 md:top-[40%] slide-container">
              <div className="slide">
                <img
                  src="/front-UPLOAD.png"
                  alt=""
                  className="w-[150rem] h-[14rem]"
                />
              </div>

              <div className="slide">
                <img
                  src="/card-2.png"
                  alt=""
                  className="w-[150rem] h-[14rem]"
                />
              </div>
              <div className="slide">
                <img
                  src="/card-3.png"
                  alt=""
                  className="w-[150rem] h-[14rem]"
                />
              </div>
              <div className="slide">
                <img
                  src="/card-4.png"
                  alt=""
                  className="w-[150rem] h-[14rem]"
                />
              </div>
            </div>

            <div>
              <img
                src="/Component 23.png"
                alt=""
                className="w-[300px] h-[600px] mb-[2rem] xl:w-[400px] xl:h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
