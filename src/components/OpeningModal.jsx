import React, { useState, useEffect } from "react";

const OpeningModal = () => {
    // const [loading, setLoading] = useState(false);
    return (
        <main>
            <div>
                <div className="flex flex-col gap-[30px] md:gap-10 items-center justify-center ">
                    <div>
                        <h2 className=" text-xl md:text-[24px] text-[#1E293B] leading-[32px] font-bold text-center">
                            Welcome to Speedy Card Lister!
                        </h2>
                        <h3 className="text-[#64748B] text-[14px] leading-[20px] text-center">
                            Your AI-Powered Solutions for all your Trading Card
                            needs.
                        </h3>
                    </div>

                    <div className="mb-[60px] md:mb-[30px]">
                        <img
                            className="w-20 h-20 md:w-[120px] md:h-[120px] block mx-auto"
                            src="/image 10.png"
                            alt="img"
                        />
                        <h3 className="text-center text-sm max-w-[335px]">
                            Complete your profile to have access to all features
                            of Speedy Card Lister.
                        </h3>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OpeningModal;
