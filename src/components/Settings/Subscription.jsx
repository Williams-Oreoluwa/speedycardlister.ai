import { useContext, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Globalcontext } from "../../Context/Context";
import { InfoCircle } from "iconsax-react";
import CircularProgressBar from "./ProgressBar";
import OtherPlans from "./OtherPlans";
import Modal from "react-responsive-modal";

const Subscription = () => {
    // const { currentPlan, userLocation, otherPlans, isProfileCompleted } =
    //     useContext(Globalcontext);
    const { currentPlan, userLocation, otherPlans } = useContext(Globalcontext);

    console.log(otherPlans);

    const value = currentPlan.scan_count;
    const total = currentPlan.no_of_scans;

    const data = 100 - (value / total) * 100;

    let colorCode;

    if (data <= 70) {
        colorCode = "#78D956";
    } else if (data > 70 && data < 95) {
        colorCode = "#F4AE2E";
    } else if (data >= 95) {
        colorCode = "#EF574C";
    } else {
        colorCode = "#78D956";
    }
    // Todo: remove this before push
    let isProfileCompleted = true;
    // console.log(isProfileCompleted);

    return (
        <section className="max-w-[1100px]">
            <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-center">
                <div className="relative  flex items-start justify-between  w-full md:max-w-[692px] rounded-xl border border-[#E2E8F0] md:p-6 p-4 cShadow ">
                    <div className="w-full">
                        <div className="flex justify-between items-start ">
                            <div className="flex flex-col md:pb-[30px]   md:justify-between md:gap-10">
                                <div>
                                    <h2 className="text-sm">Current Plan</h2>
                                    <h1 className="capitalize md:text-xl text-base font-semibold text-[#1E293B] mt-1">
                                        {currentPlan?.name}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex gap-1  text-[#1E293B] items-center justify-center text-lg md:text-xl font-semibold ">
                                <h1>${`${currentPlan.charge}`}</h1>

                                {isProfileCompleted < 100 ? (
                                    "USD"
                                ) : (
                                    <h4>{`${userLocation.currency}`}</h4>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-6 md:flex md:flex-row md:items-end md:justify-between md:gap-5 md:mt-[28px] mt-6 ">
                            <div className="flex items-center gap-1 ">
                                <InfoCircle size="16" color="#64748B" />
                                <h3>{`${currentPlan?.no_of_scans} Monthly AI card scans`}</h3>
                            </div>

                            <button className="max-w-[158px] w-full py-[14px] text-sm font-semibold bg-[#272264] text-[white] rounded-[4px]">
                                Renew Plan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:max-w-[376px]">
                    <div className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] p-4 shadow-sm">
                        <div className="flex items-center justify-between  gap-[19px]">
                            <CircularProgressBar
                                colorCode={colorCode}
                                value={currentPlan?.scan_count}
                                data={data}
                                maxValue={currentPlan?.no_of_scans}
                            />

                            <div className="  h-[168px] max-w-[1px] w-full  bg-[#E2E8F0] rounded-xl"></div>

                            <div className=" w-full max-w-[169px] flex items-center justify-center">
                                {/* <h2 className="text-[18px] lg:text-[22px] font-[600]">
                                    {`${currentPlan.scan_count} cards`}
                                </h2>
                                <h3 className="text-[14px] lg:text-[18px] font-[400] text-[#64748B]">
                                    used out of
                                </h3>
                                <h2>{currentPlan.no_of_scans}</h2> */}

                                <div className="max-w-[78px]">
                                    <h2 className="text-sm  font-normal">
                                        <span className="text-base font-semibold text-[#1E293B]">
                                            {" "}
                                            {`${
                                                currentPlan?.scan_count || 0
                                            } cards `}
                                        </span>
                                        used out of{" "}
                                        <span className="text-base font-semibold text-[#64748B]">
                                            {currentPlan?.no_of_scans || 500}
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other cards section */}
            <hr className="text-[#E2E8F0] h-2 md:mt-12 mt-7 hidden md:block " />
            <OtherPlans otherPlans={otherPlans} userLocation={userLocation} />
        </section>
    );
};

export default Subscription;
