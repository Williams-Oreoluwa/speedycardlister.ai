import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Globalcontext } from "../../Context/Context";
import Preloader from "../Loader";
import { Home3, LoginCurve, Personalcard, Setting } from "iconsax-react";
import MinimizeTray from "../minimizeTray/MinimizeTray";
export const menuItems = [
    {
        id: 0,
        label: "Dashboard",
        path: "/dashboard",
        icon: <Home3 size="18" />,
    },
    {
        id: 1,
        label: "Cards",
        path: "/cards",
        icon: <Personalcard size="18" />,
        path1: "singleCard",
        // path1: <Personalcard size="18"  />,
    },
    {
        id: 2,
        label: "Settings",
        path: "/settings",
        icon: <Setting size="18" />,
    },
];
const Sidebar = ({ isOpen, setIsOpen }) => {
    const { theme } = useContext(Globalcontext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const handleNavigate = (getMenu) => {
        navigate(getMenu.path);
    };

    const logOut = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.clear();
            navigate("/login");
        }, 3000);
    };

    return (
        <aside
            className={`flex ${
                theme === "dark" ? "bg-black" : "bg-[#F8FAFC]"
            }  lg:p-0 lg:items-center  fixed top-0 left-0 h-screen flex-col lg:w-[22.5%]  xl:w-[16.8%] border border-[#E2E8F0]   duration-300 ease-linear lg:fixed lg:translate-x-0 ${
                isOpen
                    ? "translate-x-0 w-full h-screen z-10"
                    : "-translate-x-full  z-40"
            }`}
        >
            <div
                className={`lg:fixed top-0 left-0 px-[17px] h-auto w-[235px]  ${
                    theme === "dark"
                        ? "bg-[#161616] text-white md:bg-black"
                        : " bg-[#F8FAFC]/50"
                }   p-10  py-4`}
            >
                <div className="flex items-center mt-4">
                    <div className=" flex items-center justify-center text-center">
                        <img
                            src={`/new_logo-removebg-preview.png`}
                            alt=""
                            className="w-[118px] h-10 opacity-0 md:opacity-[1] lg:opacity-[1] xl:opacity-[1] 2xl:opacity-[1]"
                        />
                    </div>
                </div>
                <div className="w-full h-[86vh] relative flex flex-col">
                    <div className="w-full flex-grow flex flex-col mt-8 lg:mt-[4.19rem]">
                        <div className="w-full">
                            {menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex cursor-pointer items-center gap-2 text-[#272264] ${
                                        location.pathname === item.path ||
                                        location.pathname.includes(item.path1)
                                            ? "bg-[#E2E8F0] color-[#272264] font-semibold"
                                            : ""
                                    } mb-[1.56rem] px-4 py-[12px] rounded-lg`}
                                    onClick={() => {
                                        handleNavigate(item);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span
                                        className={`text-[#00035C] font-medium text-semibold leading-[18.78px] ${
                                            location.pathname === item.path ||
                                            location.pathname.includes(
                                                item.path1
                                            )
                                                ? "color-[#272264] font-semibold"
                                                : ""
                                        }`}
                                    >
                                        {item?.icon}
                                    </span>
                                    <span
                                        className={`text-[#00035C] font-medium text-semibold leading-[18.78px] ${
                                            location.pathname === item.path ||
                                            location.pathname.includes(
                                                item.path1
                                            )
                                                ? "color-[#272264] font-semibold"
                                                : ""
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={`absolute bottom-0 left-0 right-0`}>
                            {/*  */}
                            <MinimizeTray />
                            {/*  */}

                            <div className="w-full flex items-center mt-6 ">
                                <button
                                    onClick={logOut}
                                    className="rounded-[27px] p-3 flex justify-center items-center"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* <img
                                        src="/logout.svg"
                                        className={`${
                                            loading ? "hidden" : "block"
                                        }`}
                                    /> */}

                                        <div className="flex gap-3 items-center">
                                            {" "}
                                            {loading ? (
                                                <Preloader />
                                            ) : (
                                                <LoginCurve
                                                    size="24"
                                                    color="#D92D20"
                                                />
                                            )}
                                            <h2 className="text-[#D92D20] text-base leading-5">
                                                Logout
                                            </h2>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
