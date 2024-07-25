import { useContext } from "react";
import { Globalcontext } from "../../Context/Context";

export const StatusCards = ({ status, title, card, img }) => {
    const { theme } = useContext(Globalcontext);
    return (
        <div
            className={`flex-1 flex h-full rounded-lg ${
                card === "true"
                    ? "hover:bg-[#272264] cursor-pointer   bg-[#FFFFFF] hover:text-white border border-[#272264]"
                    : "border-[#E2E8F0] border  md:p-4"
            }  flex-col justify-between px-[0.37rem] py-2 sm:p-2 ${
                theme === "dark"
                    ? "bg-[#161616] border-none text-white"
                    : "bg-[#F1F5F9] text-black"
            }`}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-3">
                <div className="md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full bg-white flex-shrink-0 ">
                    <img
                        src={img}
                        alt="walletminuss"
                        className="md:w-6 md:h-6 w-5 h-5 "
                    />
                </div>
                <div className=" flex md:justify-center lg:py-[9px] lg:mt-3 flex-col">
                    <h2 className="text-[13px] sm:text-base font-normal leading-[19.36px] text-[#64748B] flex-shrink-0">
                        {title}
                    </h2>

                    <div className="flex items-center justify-between w-full">
                        <h2 className="md:mt-[4px] flex items-center font-semibold text-base md:text-2xl">
                            {status}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCards;
