import { useContext } from "react";

import { FaPlus } from "react-icons/fa";
import { Globalcontext } from "../../Context/Context";

export const TotalCard = ({ totalCards }) => {
    const { theme } = useContext(Globalcontext);
    return (
        <div
            className={`col-span-2 h-32 flex flex-col gap-[28px] lx:gap-0 lg:justify-b 2xl:gap-10 md:w-3/5 xl:w-full ${
                theme === "dark" ? "bg-[#161616]" : "bg-[#FCF2FC]"
            }  ${theme === "dark" ? "text-white" : "text-black"}  ${
                theme === "dark" ? "border-one" : ""
            }    p-4 rounded-lg `}
        >
            <div className="sm:w-4/5 lg:w-full">
                <div className="flex items-center gap-8 justify-between">
                    <img
                        src="/cardTotal.png"
                        alt="walletminuss"
                        className="w-6 h-6"
                    />
                    <div className="w-3/5 flex justify-center gap-4 flex-col">
                        <h2 className="text-base font-medium leading-[19.36px] text-[#7A7474]">
                            Total cards
                        </h2>

                        <div className="flex items-center justify-between w-full">
                            <h2 className=" flex items-center font-bold leading-[29.05px] text-2xl">
                                {totalCards}
                            </h2>
                            <p>view</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            name=""
                        />
                        <label
                            className=" text-base max-w-full  items-center flex gap-2 rounded-md text-white cursor-pointer bg-[#8173DE]"
                            htmlFor="file"
                        >
                            <FaPlus size={12} />
                            Upload Cards
                        </label>
                    </div>
                </div>

                {/* <div className="w-full h-[23.29px] rounded-[18.38px]  mt-6  bg-[#9795FF]/10">
          <div className="w-3/5 h-[23.29px] bg-gradient-to-l from-blue-950 to-violet-300 rounded-[18.38px]"></div>
        </div> */}
            </div>

            {/* <div className="flex flex-col sm:flex-row sm:items-center gap-4 2xl:justify-between mt-auto  sm:w-11/12 2xl:w-3/4 2xl:mt-0">
        <div className="bg-[#67FD64] w-fit py-1 px-3 rounded-[20px] mt-auto  flex gap-2 items-center">
          <img src="/arrow.svg" alt="arrow" className="w-[12px] h-[11.16px]" />
          <span className="font-medium leading-[16.94px] text-sm">+25%</span>
        </div>
        <h2 className="text-xs sm:text-base text-[#7A7474]">
          Average card created{" "}
        </h2>
      </div> */}
        </div>
    );
};

export default TotalCard;
