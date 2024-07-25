import React, { useState, useEffect, useContext } from "react";
import Info from "./Info";
import EbayProfile from "./EbayProfile";
import Password from "./Password";
import Subscription from "./Subscription";
import EmptyEbayProfile from "./EmptyEbayProfile";
import { Globalcontext } from "../../Context/Context";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

// const buttons = [
//   {
//     label: "Personal-Info",
//     path: "#personal-info",
//     icon: <FaUser />,
//   },
//   {
//     label: "Password",
//     path: "#password",
//     icon: <FaLock />,
//   },
// ];
function SettingsTab() {
    //   const [value, setValue] = useState(0);

    //   const switchTabs = (value) => {
    //     setValue(value);
    //   };

    //   const { theme } = useContext(Globalcontext);

    // return (
    //<section className="hidden lg:block xl:block 2xl:block">
    //   <div className="flex items-start justify-start w-full gap-10">
    //     <div className="flex flex-col items-center justify-center gap-[1rem]">
    //       <div>
    //         <img
    //           src="/pexels-ekaterina-nt-9961810.jpg"
    //           alt=""
    //           className="rounded-[50%] h-[15rem] w-[15rem]"
    //         />
    //       </div>
    //       <div className="rounded-md flex gap-4 p-2 text-[#272264] border-2 border-[#272264] items-center justify-center">
    //         <img src="/Icons/Export Icon.png" alt="" className="h-6 w-6" />
    //         <h2 className="text-[16px]">Upload Picture</h2>
    //       </div>
    //     </div>
    //     <div>
    //       <form action="" className="flex flex-col gap-4">
    //         <div className="flex flex-col gap-2">
    //           <h2>First Name</h2>
    //           <input
    //             type="text"
    //             name=""
    //             id=""
    //             className="w-[250%] h-[3rem] border-2 border-[#E2E8F0] rounded-md "
    //           />
    //         </div>
    //         <div className="flex flex-col gap-2">
    //           <h2>Last Name</h2>
    //           <input
    //             type="text"
    //             name=""
    //             id=""
    //             className="w-[250%]  h-[3rem] border-2 border-[#E2E8F0] rounded-md "
    //           />
    //         </div>{" "}
    //         <div className="flex flex-col gap-2">
    //           <h2>Email</h2>
    //           <input
    //             type="text"
    //             name=""
    //             id=""
    //             className="w-[250%]  h-[3rem] border-2 border-[#E2E8F0] rounded-md "
    //           />
    //         </div>
    //         <div>
    //           <button className="w-[10rem] bg-[#272264] p-4 rounded-md text-white">
    //             Save Changes
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    {
        /* <div className="fixed text-center flex flex-col gap-5 items-center justify-center ">
        <div className="w-[150%]">
          <h1 className={`${theme === 'dark' ? 'text-[#FFFF]' : ''} text-[1.6rem] font-bold`}>Account Settings</h1>
          <h3 className="text-[1rem] text-[#A1A1A1]">Update your account information.</h3>
        </div>
        <div className={`p-4 ${theme === 'dark' ? 'bg-[#a1a0a011]' : ''}  shadow-lg jobs-center rounded-lg`}>
        
            <div className="btn-container  flex flex-col items-left justify-center gap-6">
              {buttons.map((button, index) => {
                return (
                  <a href={button.path}>
                    <button
                      key={button.id}
                      onClick={()=>switchTabs(index)}
                      className={`settings-btn flex text-[#A1A1A1]  flex-row gap-3 ${
                        index === value && "active-btn"
                      }`}
                    >
                      {button.icon}
                      {button.label}
                    </button>
                  </a>
                );
              })}
            </div>
          </div>
        </div> */
    }
    // </section>
    // );
    const { isProfileCompleted, ebayStatus } = useContext(Globalcontext);

    const [activeTab, setActiveTab] = React.useState("Personal-Info");
    const data = [
        {
            label: (
                <div className="flex gap-1">
                    <h2>Personal</h2>
                    <h2>Information</h2>
                </div>
            ),
            value: "Personal-Info",
            desc: <Info />,
        },
        {
            label: (
                <div className="flex flex-1 gap-1">
                    <h2>eBay</h2>
                    <h2>Profile</h2>
                </div>
            ),
            value: "eBay-Profile",
            desc:
                isProfileCompleted !== 100 ||
                ebayStatus === false ||
                (isProfileCompleted !== 100 && ebayStatus === false) ? (
                    <EmptyEbayProfile />
                ) : (
                    <EbayProfile />
                ),
            // desc: false ? <EmptyEbayProfile /> : <EbayProfile />,
        },
        {
            label: "Subscription",
            value: "subscription",
            desc: <Subscription />,
        },
        {
            label: "Password",
            value: "password",
            desc: <Password />,
        },
    ];
    return (
        <div className="mt-[3rem] md:mt-0 ">
            <div className="text-[24px] leading-[32px] font-[600] text-[#1E293B] py-8">
                <h1>Settings</h1>
            </div>
            <Tabs value={activeTab}>
                <div className="tab-scroll-bar w-[100%] overflow-x-scroll max-w-[872px] ">
                    <TabsHeader
                        className="rounded-none bg-transparent gap-2 sm:gap-10 md:gap-[80px] "
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2  border-[#272264] shadow-none  rounded-none  ",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                style={{ zIndex: "1" }}
                                className={` max-w-fit
                                    ${
                                        activeTab === value
                                            ? "text-[#272264] font-[600] "
                                            : "text-[#64748B] font-[500]  "
                                    }
                                            
                                `}
                            >
                                <div className="md:text-[16px]">{label}</div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </div>
                <br />
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel className="p-0" key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default SettingsTab;
