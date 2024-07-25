import { BsExclamationCircle } from "react-icons/bs";
import RadialBarChart from "../radialBarChart/RadialBarChart";
import { baseUrl, userToken } from "../../utilities/lib";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import { useEffect, useState } from "react";

export const ChartCard = () => {
    const url = `${baseUrl}/user/dashboard`;
    const [scan_count, setScan_count] = useState(0);
    const { data, loading, error } = useFetchWithAuth(url, userToken);
    let scanData = data?.data?.tradingPlan?.scan_count;
    useEffect(() => {
        if (scanData === 0) {
            setScan_count(1);
        }
    }, [data]);

    // console.log("useFetchWithAuth", typeof scan_count);
    return (
        <div className="w-full h-full flex flex-1 flex-col gap-8 md:gap-5">
            <div className="w-full">
                <div className="flex items-center justify-between gap-4 w-full">
                    <p className="font-semibold text-sm  md:text-xl leading-5">
                        {data?.data?.tradingPlan?.name}
                    </p>
                    <button className="bg-white px-4 text-[#272264] font-semibold text-sm md:leading-4 h-[36px]  border border-[#272264] rounded-lg md:rounded flex-shrink-0">
                        Renew Plan
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    <div className=" border-[2.5px] border-[#D1FADF] bg-[#039855] rounded-full w-3 h-3"></div>

                    <p className="text-xs font-normal text-[#1E293B]">Active</p>
                </div>
            </div>

            <div className="relative">
                <RadialBarChart value={scan_count} />
                {/* <RadialBarChart value={scan_count} /> */}

                <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-xl font-semibold">
                        {data?.data?.tradingPlan?.scan_count}
                    </p>
                    <p className="text-[#64748B] text-sm">
                        /{data?.data?.tradingPlan?.no_of_scans} cards
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-start">
                    <BsExclamationCircle size={12} />
                    <div>
                        <p className="font-normal text-[13px] leading-[14px] text-[#64748B]">
                            Want to get a better deal out of your money?{" "}
                        </p>
                        <p className="text-[#272264] font-semibold text-[13px] leading-[14px] mt-1">
                            Upgrade Plan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChartCard;
