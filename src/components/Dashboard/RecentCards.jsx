import { TableBody, TableHead } from "../../components/table/Table";
// import { MobileTableCard } from "../../components/cards/Cards";
import "react-responsive-modal/styles.css";
// import { ArchiveBox, Edit2 } from "iconsaax-react";
import useWindowSize from "../../hooks/useWindowSize";
import { useContext } from "react";
import { Globalcontext } from "../../Context/Context";
import MobileTableCard from "../cards/MobileTableCard";
import EditOptionNav from "./EditOptionNav";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import card from "@material-tailwind/react/theme/components/card";

const RecentCards = ({ isSelected, setIsSelected }) => {
    const { width } = useWindowSize();
    const { selectedCards, cards } = useSelectedCards();

    const { theme } = useContext(Globalcontext);

    const reduceItem = cards;

    return (
        <>
            {/* Recent Cards section */}
            <div className="mt-4 flex justify-between gap-4">
                <p className="font-semibold text-lg leading-6 w-full">
                    Recent Cards
                </p>

                {/* Display this only if a card have been selected */}
                {selectedCards?.length > 0 && <EditOptionNav />}
            </div>
            <div
                className={`col-span-3 sm:min-h-[calc(100vh-650px)] rounded-lg   ${
                    theme === "dark" ? "bg-black" : "bg-white"
                } overflow-x-auto min-w-[3] `}
            >
                {width < 767 ? (
                    <MobileTableCard
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        sortedProducts={reduceItem}
                        currentTableData={reduceItem}
                    />
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
                                sortedProducts={reduceItem}
                                currentTableData={reduceItem}
                                isSelected={isSelected}
                                setIsSelected={setIsSelected}
                            />
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default RecentCards;
