import { useContext, useEffect } from "react";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import { baseUrl, userToken } from "../../utilities/lib";
import { Globalcontext } from "../../Context/Context";

const Details = ({ theme, profile }) => {
    const { isLoggin } = useContext(Globalcontext);
    const url = `${baseUrl}/user/profile`;

    const { data, loading, error } = useFetchWithAuth(url, userToken, isLoggin);
    // console.log("data", data);

    return (
        <div className="grid place-items-center md:flex items-center gap-2">
            {loading ? (
                <p className="rounded-[50%] overflow-hidden w-10 h-10 object-cover"></p>
            ) : (
                <>
                    {data?.data?.avatar?.imageUrl ? (
                        <img
                            src={data?.data?.avatar?.imageUrl}
                            // src="/pexels-ekaterina-nt-9961810.jpg"
                            alt="profile pic"
                            className="rounded-[50%] w-10 h-10 object-cover"
                        />
                    ) : (
                        <p className="rounded-[50%] w-10 h-10 object-cover flex items-center  justify-center text-md font-bold border bg-[#272264] text-white uppercase ">
                            {data?.data?.fullName?.[0]}
                        </p>
                    )}
                </>
            )}

            <div className="hidden md:flex flex-col items-center justify-center xl:pr-6">
                <div className="flex gap-1 font-raleway">
                    <h2
                        className={`${
                            theme === "dark" ? "text-[white]" : ""
                        } capitalize text-[#423535] font-semibold text-base`}
                    >
                        {/* <p>{firstName}</p> */}
                        {data?.message === "profile retrieved successfully" ? (
                            <div>
                                <p className="text-base text-[#1E293B]  font-semibold">
                                    {data?.data?.fullName}
                                </p>
                                <p className="text-sm font-normal text-[#94A3B8]">
                                    Admin
                                </p>
                            </div>
                        ) : loading ? (
                            <div>
                                <p className="text-base text-[#1E293B]  font-semibold">
                                    Data is Loading
                                </p>
                                <p className="text-sm font-normal text-[#94A3B8]">
                                    Admin
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <h2 className="text-base  text-[#1E293B] font-semibold">
                                    No Data Yet
                                </h2>
                                <p className="text-sm font-normal text-[#94A3B8]">
                                    Admin
                                </p>
                            </div>
                        )}
                    </h2>
                    {/* <h2 className={`${theme === "dark" ? "text-[white]" : ''} uppercase font-bold`}>{lastName.length > 6 ? `${lastName.substring(0, 6)}...` : ''}</h2> */}
                </div>

                <h2
                    className={`${
                        theme === "dark" ? "text-[white]" : ""
                    } font-light  text-sm  leading-[16.94px] text-[#7A7474]"`}
                >
                    {/* {email.length > 10 ? `${email.substring(0, 10)}...` : ''} */}
                </h2>
            </div>
        </div>
    );
};

export default Details;
