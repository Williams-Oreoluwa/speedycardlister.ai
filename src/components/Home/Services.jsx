import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Services = () => {
  React.useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="md:p-4 xl:p-4 lg:p-4 pb-[3rem] bg-[#FFFFFF] flex flex-col items-center justify-center gap-4">
      <h1 className="text-[2rem] text-[#0304FF] font-semibold">
        Our Best Services
      </h1>
      <h4>We specialize in sports card trading services.</h4>
      <div   className="flex w-full  pb-[3rem] p-2 flex-col gap-10  md:grid md:grid-cols-2 md:gap-6  lg:grid lg:grid-cols-4 lg:gap-6">
        <div data-aos="flip-left"  className="relative bg-[#E5DFDF] shadow-lg flex flex-col gap-2 p-2 rounded-lg h-[12rem]">
          <span  className="absolute top-[-1rem] left-4 bg-[#110DFC] text-white w-[3rem] h-[3rem] rounded-[50%]  flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </span>
          <div className="absolute top-[4rem] flex flex-col gap-4">
            <h2 className="font-semibold  text-[#00000080] text-[1.3rem]">
              Upload
            </h2>
            <p className="font-semibold text-[1rem] text-[#00000080]">
              Take a picture of your card <br /> and upload
            </p>
          </div>
        </div>
        <div data-aos="flip-left"  className="relative bg-[#E5DFDF] shadow-lg flex flex-col gap-2 p-2 rounded-lg h-[12rem]">
          <span className="absolute top-[-1rem] left-4 bg-[#2497D1] text-white w-[3rem] h-[3rem] rounded-[50%]  flex items-center justify-center">
            <img src="/scan.png" alt="" />
          </span>
          <div className="absolute top-[4rem] flex flex-col gap-4">
            <h2 className="font-semibold  text-[#00000080] text-[1.3rem]">
              AI-scan
            </h2>
            <p className="font-semibold text-[1rem] text-[#00000080]">
              Let the AI scan your cards <br /> digitally.
            </p>
          </div>
        </div>
        <div data-aos="flip-left"  className="relative bg-[#E5DFDF] shadow-lg flex flex-col gap-2 p-2 rounded-lg h-[12rem]">
          <span className="absolute top-[-1rem] left-4 bg-[#2497D1] text-white w-[3rem] h-[3rem] rounded-[50%]  flex items-center justify-center">
            <img src="/clipboard-text.png" />
          </span>
          <div className="absolute top-[4rem] flex flex-col gap-4">
            <h2 className="font-semibold  text-[#00000080] text-[1.3rem]">
              Generate Details
            </h2>
            <p className="font-semibold text-[1rem] text-[#00000080]">
              The card details will be generated and listed <br /> by the AI.
            </p>
          </div>
        </div>
        <div data-aos="flip-left"  className="relative bg-[#E5DFDF] shadow-lg flex flex-col gap-2 p-2 rounded-lg h-[12rem]">
          <span className="absolute top-[-1rem] left-4 bg-[#03DA75] text-white w-[3rem] h-[3rem] rounded-[50%]  flex items-center justify-center">
            <img src="/send-2.png" alt="" />
          </span>
          <div className="absolute top-[4rem] flex flex-col gap-4">
            <h2 className="font-semibold  text-[#00000080] text-[1.3rem]">
              {" "}
              Auto post to E-bay
            </h2>
            <p className="font-semibold text-[1rem] text-[#00000080]">
              Your details will immediately be <br /> posted to e-bay to process{" "}
              <br />
              your payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
