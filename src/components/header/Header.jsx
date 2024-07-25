import React, { useContext, useEffect, useState } from "react";
import SearchBox from "../searchBox/SearchBox";
import axios from "axios";
import Details from "../Details.jsx/Details";
import Skeleton from "../Skeleton/Skeleton";
import { baseURL } from "../../api/axios";
import { Globalcontext } from "../../Context/Context";
import { FaSearch, FaWindowClose, FaArrowLeft, FaBars } from "react-icons/fa";
import { HambergerMenu, Notification } from "iconsax-react";

const myProfileEndpoint = "user/my-profile";

// const DesktopHeader = ({
//     visible,
//     isOpen,
//     loading,
//     profile,
//     avatar,
//     allCards,
//     setSearchResults,
//     theme,
// }) => {
//     return (
//         <header
//             className={`${
//                 visible
//                     ? "block z-10  fixed top-0  right-0 w-full py-1 border border-[#E2E8F0]"
//                     : "hidden"
//             } ${theme === "dark" ? "bg-black" : "bg-[#F8FAFC]"}  `}
//         >
//             <div className=" lg:z-9999 lg:ml-[17rem] 2xl:ml-[21.5rem] flex justify-end flex-1 lg:mr-16 rounded-[5px] px-3 md:px-5 py-1 md:py-[0.625rem]">
//                 <div className="flex items-center w-full flex-1 justify-between">
//                     <div className="xl:ml-[10%">
//                         {/* <SearchBox
//                 searchData={allCards}
//                 setSearchResults={setSearchResults}
//                 theme={theme}
//               /> */}
//                     </div>

//                     {loading ? (
//                         <Skeleton />
//                     ) : (
//                         // <Details theme={theme} {...profile} {...avatar} />
//                         <Details theme={theme} profile={profile} />
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

const MobileHeader = ({
    visible,
    isOpen,
    loading,
    profile,
    avatar,
    setIsOpen,
    allCards,
    setSearchResults,
    theme,
}) => {
    const [open, setOpen] = useState(false);

    const openSearch = () => {
        setOpen(!open);
    };

    return (
        <header
            className={`${
                visible
                    ? "block  z-20 fixed top-0 right-0 w-full p-4 bg-[#F8FAFC] border border-b-[#E2E8F0]"
                    : "hidden"
            } ${theme === "dark" ? "bg-[#161616]" : "bg-neutral-50"} `}
        >
            <div className="flex items-center justify-between w-full md gap-x-3">
                <div
                    className="text-[1.5rem] flex items-center rounded-full h-[50px]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <HambergerMenu size="32" color="#1E293B" />
                </div>
                <div className="flex items-center gap-1 w-full lg:w-[38] xl:w-[51%]">
                    <SearchBox
                        searchData={allCards}
                        setSearchResults={setSearchResults}
                        theme={theme}
                    />
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <p className="p-3 hidden md:block">
                        <Notification
                            size="24"
                            color="#272264"
                            className="  cursor-pointer"
                        />
                    </p>
                    <Details theme={theme} {...profile} {...avatar} />
                </div>
            </div>
        </header>
    );
};

const Header = ({ isOpen, setIsOpen }) => {
    const { setSearchResults, allCards } = useContext(Globalcontext);
    const [avatar, setAvatar] = useState({ imageUrl: "" });
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const { theme } = useContext(Globalcontext);

    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState(window.innerWidth);
    const monitorSize = () => {
        setSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", monitorSize);
        return () => {
            window.removeEventListener("resize", monitorSize);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos);
            setPrevScrollPos(currentScrollPos);
        };
    }, [prevScrollPos, visible]);

    // const handleProfile = async () => {
    //     const accessToken = localStorage.getItem("accessToken");

    //     try {
    //         const response = await axios.get(
    //             `${baseURL}/v1/${myProfileEndpoint}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         console.log("user profile fetch", response);

    //         setAvatar(response.data.data.avatar);
    //         setProfile(response.data.data);
    //     } catch (err) {
    //         console.log("Error fetching data");
    //     }
    // };

    // useEffect(() => {
    //     handleProfile();
    // }, []);

    return (
        <>
            <MobileHeader
                setSearchResults={setSearchResults}
                allCards={allCards}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                visible={visible}
                loading={loading}
                avatar={avatar}
                profile={profile}
                theme={theme}
            />
            {/* {size <= 1000 ? (
        
      ) : (
        <DesktopHeader
          setSearchResults={setSearchResults}
          allCards={allCards}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          visible={visible}
          loading={loading}
          avatar={avatar}
          profile={profile}
          theme={theme}
        />
      )} */}
        </>
    );
};

export default Header;
