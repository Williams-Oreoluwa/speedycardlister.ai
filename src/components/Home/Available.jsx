import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Available = () => {
  React.useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section className=" bg-[#5347C2]/20">
      <div data-aos="flip-left" className="p-8 lg:px-[108px]">
        <div    className="flex flex-col-reverse md:flex-row items-center justify-between ">
          <div className="md:ml-20 xl:ml-44">
            <div className="flex mb-4 item-center justify-center gap-4">
              <img src="/Logo.png" alt="" className="h-12 w-12" />
              <h1 className="text-[1rem] flex items-center">
                SpeedyCard <br className="hidden sm:block" />
                Lister.A.I
              </h1>
            </div>
            <h1 className="text-[#000000] font-bold leading-[31.65px] text-2xl ">
              Now Available on{" "}
            </h1>
            <div className="flex mt-[28px] gap-2 items-center justify-center ">
              <img src="/playstore.svg" className="w-8 lg:w-12 h-12" />
              <img src="/appleStore.svg" className="w-8 lg:w-12 h-12" />
              <img src="/microsoftstore.svg" className="w-8 lg:w-12 h-12" />
            </div>
            <button className="bg-[#0304FF] mt-7 p-4 w-full text-white rounded-[20px]">
              Download Now
            </button>
          </div>
          <div className="w-3/5 lg:">
            <img src="/phone.svg" alt="" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Available;
