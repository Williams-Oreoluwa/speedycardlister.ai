/* eslint-disable react/prop-types */
const AuthPageLayout = ({ children, formTitle, formDes, isOtpEmail = "" }) => {
    return (
        <section>
            <div className="relative font-raleway w-full p-[1rem] flex flex-col items-center justify-start gap-8 min-h-screen bg-[#ffff] bgImage">
                {/* <div className="absolute top-0 left-0 flex items-center justify-center w-full min-h-screen">
                    <img
                        src="/Login Page (1).png"
                        alt="logo"
                        className="min-h-screen w-full"
                    />
                </div> */}
                <div className="z-10 py-6 px-4 md:py-10 md:px-10  my-[3rem] bg-[#FCFEFF] border-2 border-[#272264] shadow-lg rounded-2xl w-full max-w-[31.25rem] flex flex-col gap-6">
                    <div className="flex items-center justify-center text-center ">
                        <img
                            src="/new_logo.jpg"
                            alt="logo"
                            className=" w-[7.375rem] md:w-[165.2px] h-10 md:h-[56px]"
                        />
                    </div>

                    <div className="text-center flex flex-col mt-3 gap-1 md:gap-2">
                        <h2 className=" text-[#1E293B] text-2xl md:text-[1.75rem] font-[600] leading-[32px] ">
                            {formTitle}
                        </h2>
                        <h4 className=" text-[0.875rem] md:text-[1rem] font-[400] leading-[20px] md:leading-[27px] max-w-[20.5rem] md:max-w-full mx-auto text-[#1E293B]">
                            {formDes}{" "}
                            {isOtpEmail && (
                                <span className="font-bold">{isOtpEmail}</span>
                            )}
                        </h4>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default AuthPageLayout;
