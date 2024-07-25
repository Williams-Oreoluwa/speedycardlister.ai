import React, { useState, useContext, useEffect } from "react";
import { Globalcontext } from "../../Context/Context";
import { StatusCards } from "../../components/cards/Cards";
import "react-responsive-modal/styles.css";
import useWindowSize from "../../hooks/useWindowSize";
import { baseUrl, userToken } from "../../utilities/lib";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import RecentCards from "../../components/Dashboard/RecentCards";
import ChartCard from "../../components/cards/ChartCard";
import HeroCard from "../../components/cards/HeroCard";
import IdleTimer from "../../components/idleTimer";

const myProfileEndpoint = "user/my-profile";
const Dashboard = () => {
    const { width } = useWindowSize();
    const {
        // loading,
        totalPendingCards,
        totalSentCards,
        totalCards,
        currentTableData,
        theme,
        setIsLoggin,
    } = useContext(Globalcontext);

    const reduceItem = currentTableData().slice(0, 4);
    // const [profile, setProfile] = useState({
    //   firstName: "",
    // });

    // const handleProfile = async () => {
    //   const accessToken = localStorage.getItem("accessToken");

    //   try {
    //     const response = await axios.get(`${baseURL}/v1/${myProfileEndpoint}`, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });

    //     setProfile(response.data.data);
    //   } catch (err) {
    //     console.log("Error fetching data");
    //   }
    // };

    // useEffect(() => {
    //   handleProfile();
    // }, []);

    // const { firstName } = profile;

    const screenToShowChart = width > 767 && width < 1024;

    const [isSelected, setIsSelected] = useState(false);

    // fetch user daboard details
    // const url = `${baseUrl}/user/dashboard`;
    // const { data, loading, error } = useFetchWithAuth(url, userToken);
    // console.log("user Token", data);
    // const url = `${baseUrl}/user/my-avatar`;
    // const { data, loading, error } = useFetchWithAuth(url, userToken);

    // useEffect(() => {
    // }, []);

    return (
        <section className="px- lg:py-6 w-full">
            <IdleTimer />
            {/* {loading ? (
        <Loader />
      ) : ( */}
            <main className="max-w-[1200px] mx-auto">
                <div className="flex flex-col gap-4">
                    <div className={`mt-4 md:mt-0`}>
                        <h1
                            className={`font-semibold text-xl md:text-2xl leading-8  ${
                                theme === "dark"
                                    ? "text-white"
                                    : "text-[#1E293B]"
                            }`}
                        >
                            Dashboard
                        </h1>
                        <div className="flex flex-col gap-10 lg:gap-3 mt-4 md:mt-6  lg:flex-row m:items-center w-full flex-1">
                            <div className="flex flex-col gap-8 lg:gap-4 justify-between w-full lg:w-3/5 ">
                                {/* here */}
                                <HeroCard />
                                <div className="flex gap-8">
                                    <div className="flex md:flex-col h-fit w-full md:w-[40%] lg:flex-row lg:w-full md:min-w-[200px]  gap-2 sm:gap-4">
                                        <StatusCards
                                            title={"Total Cards"}
                                            status={totalCards}
                                            card={"false"}
                                            img={"/cardTotal.png"}
                                        />
                                        <StatusCards
                                            title={"Pending Cards"}
                                            status={totalPendingCards}
                                            card={"false"}
                                            img={"/pendingCards.png"}
                                        />
                                        <StatusCards
                                            title={"Sent Cards"}
                                            status={totalSentCards}
                                            card={"false"}
                                            img={"/moneys.png"}
                                        />
                                    </div>

                                    <div
                                        className={`${
                                            screenToShowChart
                                                ? "bg-[#F8FAFC] w-full rounded-2xl border p-4 py-5 md:px-6 cardBg"
                                                : "hidden"
                                        }`}
                                    >
                                        <ChartCard />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full lg:w-[40%] md:flex-row gap-y-8 md:gap-x-8">
                                <div
                                    className={`${
                                        screenToShowChart
                                            ? "hidden"
                                            : "block bg-[#F8FAFC] w-full rounded-2xl border p-4 py-5 md:px-6 cardBg"
                                    }`}
                                >
                                    <ChartCard />
                                </div>
                            </div>
                        </div>
                    </div>

                    <RecentCards
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                    />
                </div>
            </main>
            {/* )} */}
        </section>
    );
};

export default Dashboard;
