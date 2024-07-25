import { useContext, useState } from "react";
import { Modal } from "react-responsive-modal";

import { useSelectedCards } from "../../Context/SelectedCardsContext";
import UploadModal from "./UploadModal";
import { CardUploadContext } from "../../Context/CardUploadContext";

export const HeroCard = () => {
    const {
        useMinimize,
        setUseMinimize,
        // setUseShowUploadModal,
        useShowUploadModal,
    } = useSelectedCards();

    const { setShowUploadModal } = useContext(CardUploadContext);

    const handleOpenUploadModal = () => {
        setShowUploadModal(true);
    };

    return (
        <>
            <div className="relative overflow-hidden bg-[#272264] rounded-2xl px-6 py-5  md:py-8 flex items-center justify-between flex-col md:flex-row gap-[48px]">
                <div className="absolute top-0 md:-top-[2px] left-0">
                    <img
                        src="/card-pattern.png"
                        alt="walletminuss"
                        className="w-16 h-16 md:w-[85px] md:h-[85px]"
                    />
                </div>
                <h2 className="font-semibold text-center md:text-start text-white w-full max-w-[309px]   text-base md:text-2xl leading-[22.4px] md:leading-9">
                    Automatically extract your cards details and turn them into
                    cash!
                </h2>

                <button
                    className="text-sm md:text-base items-center flex gap-2 px-4 py-[10px] md:py-[14px] rounded-lg  cursor-pointer bg-white font-semibold max-h-12 flex-shrink-0"
                    onClick={() => handleOpenUploadModal()}
                >
                    Upload Cards
                </button>

                <div className="absolute right-2 md:right-1/4 bottom-0 ">
                    <img
                        src="/stars-patern.png"
                        alt="walletminuss"
                        className="w-24  md:w-32  "
                    />
                </div>
            </div>

            <UploadModal />
        </>
    );
};

export default HeroCard;
