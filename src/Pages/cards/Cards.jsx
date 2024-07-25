import { useContext, useState } from "react";
import { TableBody, TableHead } from "../../components/table/Table";
import { Globalcontext } from "../../Context/Context";
import Pagination from "../../components/pagination/Pagination";
import axios from "axios";
import { baseURL } from "../../api/axios";
import { FaPlus } from "react-icons/fa";
import IdleTimer from "../../components/idleTimer";
import { MdOutlineFilterList } from "react-icons/md";
import { StatusCards } from "../../components/cards/Cards";
import useWindowSize from "../../hooks/useWindowSize";
import SortDropdown from "../../components/cards/SortDropdown";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import EditOptionNav from "../../components/Dashboard/EditOptionNav";
import MobileTableCard from "../../components/cards/MobileTableCard";
import { CardUploadContext } from "../../Context/CardUploadContext";
import UploadModal from "../../components/cards/UploadModal";
import HeroCard from "../../components/cards/HeroCard";

const Cards = () => {
    const { width } = useWindowSize();
    const { selectedCards } = useSelectedCards();
    const { setShowUploadModal } = useContext(CardUploadContext);
    const {
        currentTableData,
        PageSize,
        allCards,
        setAllCards,
        currentPage,
        setCurrentPage,
        firstPageIndex,
        lastPageIndex,
        totalPendingCards,
        totalSentCards,
        totalCards,
        theme,
        getAllCards,
    } = useContext(Globalcontext);

    const [selectedTab, setSelectedTab] = useState(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("title");
    const handleTabClick = async (status) => {
        console.log("status", status);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            console.error("No access token found");
            return;
        }
        try {
            let pendingCardsResponse, sentCardsResponse;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };

            // Make multiple requests using axios.all()
            [pendingCardsResponse, sentCardsResponse] = await axios.all([
                axios.get(`${baseURL}/v1/cards?status=pending`, {
                    headers,
                }),
                axios.get(`${baseURL}/v1/cards?status=sent`, {
                    headers,
                }),
            ]);

            // Extract data from responses

            const pendingCards = pendingCardsResponse.data.data.cards;
            const sentCards = sentCardsResponse.data.data.cards;
            console.log("sent", sentCards);
            console.log("pending", pendingCards);
            // Update state accordingly
            if (status === "pending") {
                setAllCards(pendingCards);
            } else if (status === "sent") {
                setAllCards(sentCards);
            } else {
                setAllCards(allCards);
                getAllCards();
            }
            setSelectedTab(status);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };
    const tableData = currentTableData();

    const sortProducts = (tableData, criteria) => {
        return tableData?.slice().sort((a, b) => {
            if (criteria === "title") {
                return a.title?.localeCompare(b.title);
            } else if (criteria === "price") {
                return a.price - b.price;
            } else if (criteria === "dateAdded") {
                return new Date(a.dateAdded) - new Date(b.dateAdded);
            }
            return 0;
        });
    };

    const sortedProducts = sortProducts(tableData, sortCriteria);

    return (
        <>
            <section className="lg:p-6 lg:pl-0 w-full">
                <IdleTimer />
                <div className=" mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row mt-6 lg:mt-0 md:justify-between md:items-center">
                        <h1
                            className={`${
                                theme === "dark"
                                    ? "text-[#1E293B]"
                                    : "text-[#161616]"
                            } leading-[24px] font-extrabold text-xl mb-4 md:mb-0 `}
                        >
                            Cards
                        </h1>
                        {width < 767 ? (
                            <HeroCard />
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    className="px-[20px] text-base text-center max-w-full  items-center justify-center  flex gap-2 py-[10px] lg:my-0 rounded-md text-white cursor-pointer bg-[#272264]"
                                    onClick={() => setShowUploadModal(true)}
                                >
                                    Upload Cards
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex  w-full my-6 gap-2 items-center text-[#FCFEFF] sm:text-lg text-sm md:hidden">
                        <button
                            className={`p-3 sm:py-5 w-full rounded-full ${
                                selectedTab === null
                                    ? "bg-[#272264] text-[#FCFEFF]"
                                    : "bg-none text-[#1E293B]"
                            }`}
                            onClick={() => handleTabClick(null)}
                        >
                            All Cards
                        </button>
                        <button
                            className={`p-3 sm:py-5 w-full rounded-full ${
                                selectedTab === "pending"
                                    ? "bg-[#272264] text-[#FCFEFF]"
                                    : "bg-none text-[#1E293B]"
                            }`}
                            onClick={() => handleTabClick("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`p-3 sm:py-5 w-full rounded-full ${
                                selectedTab === "sent"
                                    ? "bg-[#272264] text-[#FCFEFF]"
                                    : "bg-none text-[#1E293B]"
                            }`}
                            onClick={() => handleTabClick("sent")}
                        >
                            Sent
                        </button>
                    </div>
                    <div className="hidden md:flex md:my-6 h-fit w-full xl:w-3/5 gap-2 sm:gap-4">
                        <StatusCards
                            title={"Total Cards"}
                            status={totalCards}
                            card={"true"}
                            img={"/cardTotal.png"}
                            handleTabClick={handleTabClick}
                        />
                        <StatusCards
                            title={"Pending Cards"}
                            status={totalPendingCards}
                            card={"true"}
                            img={"/pendingCards.png"}
                            handleTabClick={handleTabClick}
                        />
                        <StatusCards
                            title={"Sent Cards"}
                            status={totalSentCards}
                            card={"true"}
                            img={"/moneys.png"}
                            handleTabClick={handleTabClick}
                        />
                    </div>
                    <div className="relative px-2 flex mb-4 items-center justify-between w-full">
                        <p>All Cards</p>
                        <div>
                            {selectedCards?.length > 0 ? (
                                <EditOptionNav />
                            ) : (
                                <div>
                                    {isOpenDropdown ? (
                                        <SortDropdown
                                            isOpenDropdown={isOpenDropdown}
                                            setIsOpenDropdown={
                                                setIsOpenDropdown
                                            }
                                            setSortCriteria={setSortCriteria}
                                        />
                                    ) : (
                                        <MdOutlineFilterList
                                            size={24}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setIsOpenDropdown(true)
                                            }
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="shadow-sm pt-4  min-h-[calc(100vh-338px)]  rounded-3xl overflow-x-auto min-w-[340px]">
                        {width < 767 ? (
                            <MobileTableCard sortedProducts={sortedProducts} />
                        ) : (
                            <table className="w-full sm:rounded-t-3xl text-[#1E293B] rounded-b-lg ">
                                <TableHead />
                                <tbody
                                    className={`  ${
                                        theme === "dark"
                                            ? "text-white"
                                            : "text-[#1E293B]"
                                    }  rounded-b-lg   border-[#1c1c1c]/5 font-normal text-sm leading-[19.94px]  rounded-t-[5px] w-full h-full  ${
                                        theme === "dark"
                                            ? "bg-[#000000]"
                                            : "bg-[#FFFFFF]"
                                    } `}
                                >
                                    <TableBody
                                        sortedProducts={sortedProducts}
                                    />
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={allCards?.length}
                        pageSize={PageSize}
                        setCurrentPage={setCurrentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        firstPageIndex={firstPageIndex}
                        lastPageIndex={lastPageIndex}
                    />
                </div>
            </section>
            <UploadModal />
        </>
    );
};

export default Cards;
