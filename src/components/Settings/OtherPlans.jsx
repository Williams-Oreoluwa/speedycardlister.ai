import { Unlimited } from "iconsax-react";
import { useState } from "react";
import Modal from "react-responsive-modal";
import ContactForm from "./ContactForm";

const OtherPlans = ({ otherPlans, userLocation }) => {
    const [isConatct, setIsConatct] = useState(false);
    const handleCloseContact = () => {
        setIsConatct(false);
    };
    const handleOpenContact = () => {
        setIsConatct(true);
    };

    return (
        <div className="max-w-[1100px]">
            {" "}
            <div>
                <div className="mt-4">
                    <h2 className="text-[18px] leading-[24px] font-[600]">
                        Other Plans
                    </h2>
                </div>
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-6 gap-[11px] mt-6 rounded-md ">
                        {otherPlans?.map((otherPlan, i) => {
                            return (
                                <div
                                    key={i}
                                    className="items-center justify-center  w-[100%] md:p-4 p-2 bg-[#F8FAFC]  gap-8 rounded-2xl  "
                                >
                                    <img
                                        src="/image 3.png"
                                        alt="label"
                                        className="w-full rounded-xl md:h-40 h-[90px] object-cover"
                                    />
                                    <h2 className="text-sm md:text-lg font-semibold text-[#1E293B] mt-2 md:mt-4 sm:text-center">
                                        {otherPlan?.name}
                                    </h2>

                                    <h2 className="sm:text-center md:mt-16 mt-7 md:text-2xl font-semibold text-[#1E293B]">
                                        {otherPlan?.charge === "unlimited"
                                            ? ""
                                            : `$${otherPlan?.charge} USD`}
                                    </h2>

                                    <h3 className="text-sm md:text-[13px] font-[400] text-[#64748B] sm:text-center  md:mt-2 ">
                                        {otherPlan?.no_of_scans === "unlimited"
                                            ? "Need additional scans?"
                                            : `${otherPlan?.no_of_scans}, ${otherPlan?.plan} AI scans.`}
                                    </h3>

                                    <button
                                        className="md:max-w-[131px] text-sm md:text-base font-semibold block w-full py-2 mx-auto bg-[#272264] text-[white] rounded-lg md:mt-16 mt-7 "
                                        onClick={() => {
                                            if (
                                                otherPlan?.charge ===
                                                "unlimited"
                                            ) {
                                                handleOpenContact();
                                            } else {
                                                return;
                                            }
                                        }}
                                    >
                                        {otherPlan?.charge === "unlimited"
                                            ? "Contact"
                                            : "Upgrade"}
                                    </button>
                                </div>
                            );
                        })}

                        {/* <div className="flex flex-shrink flex-col items-center justify-center  w-[100%]  px-4  py-4 bg-[#F8FAFC]  gap-8 rounded-md">
             <img src="/img2.png" alt="" className="w-[90%] rounded-md" />
             <h2>{lateRound.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B]">
               <h2>{`${lateRound.charge}${userLocation.currency}`}</h2>
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B] text-center">
               {`${lateRound.no_of_scans}, monthly AI scans.`}
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Upgrade
               </button>
             </div>
           </div>

           <div className="flex  flex-shrink flex-col items-center justify-center   w-[100%]  px-4 py-4 bg-[#F8FAFC]  gap-8 rounded-md">
             <img src="/img3.png" alt="" className="w-[90%] rounded-md" />
             <h2>{midRound.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B]">
               <h2>{`${midRound.charge}${userLocation.currency}`}</h2>
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B] text-center">
               {`${midRound.no_of_scans}, monthly AI scans.`}
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Upgrade
               </button>
             </div>
           </div>

           <div className="flex flex-shrink flex-col items-center justify-center   w-[100%]  px-4 py-4 bg-[#F8FAFC]  gap-8 rounded-md">
             <img src="/img4.png" alt="" className="w-[90%] rounded-md" />
             <h2>{lateRound.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B]">
               <h2>{`${lateRound.charge}${userLocation.currency}`}</h2>
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B] text-center">
               {`${lateRound.no_of_scans}, monthly AI scans.`}
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Upgrade
               </button>
             </div>
           </div>
           <div className="flex flex-shrink flex-col items-center justify-center  w-[100%]  px-4 py-4 bg-[#F8FAFC]  gap-8 rounded-md">
             <img src="/img5.png" alt="" className="w-[90%] rounded-md" />
             <h2>{topTenDraft.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B]">
               <h2>{`${topTenDraft.charge}${userLocation.currency}`}</h2>
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B] text-center">
               {`${topTenDraft.no_of_scans}, monthly AI scans.`}
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Upgrade
               </button>
             </div>
           </div>

           <div className="flex flex-shrink flex-col items-center justify-center w-[100%]  px-4 py-4 bg-[#F8FAFC]  gap-8 rounded-md">
             <img src="/img6.png" alt="" className="w-[70%] rounded-md" />
             <h2>{firstOverAll.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B]">
               {`${firstOverAll.charge}${userLocation.currency}`}
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B] text-center">
               {`${firstOverAll.no_of_scans}, monthly AI scans.`}
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Upgrade
               </button> */}
                        {/* </div>
           </div> */}
                        {/* <div className="flex flex-shrink flex-col items-center justify-center   w-[100%]  px-4 py-4 bg-[#F8FAFC]  gap-[2rem] rounded-md">
             <img src="/img7.png" alt="" className="w-[90%] rounded-md" />
             <h2>{theGoat.name}</h2>
             <div className="flex flex-row text-[20px] leading-[24px] font-[600] text-[#1E293B] text-center">
               <h2>$</h2>
               <h2>Need additional scans?</h2>
             </div>
             <h3 className="text-[16px] font-[400] text-[#64748B]">
               500 monthly AI card scans.
             </h3>
             <div>
               <button className="h-[40px] px-[40px] py-[8px] text-[14px] leading-[16px] bg-[#272264] text-[white] rounded-md">
                 Contact
               </button>
             </div>
           </div> */}
                    </div>
                </div>
            </div>
            <Modal
                closeOnOverlayClick={false}
                classNames={{
                    overlay: "customOverlay",
                    modal: "dashboardModal",
                    closeButton: "modalcloseBtn",
                }}
                open={isConatct}
                onClose={handleCloseContact}
                center
            >
                <ContactForm handleCloseContact={handleCloseContact} />
            </Modal>
        </div>
    );
};

export default OtherPlans;
