import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { CardUploadContext } from "../../Context/CardUploadContext";
import { useNavigate } from "react-router-dom";
const SuccessUplaod = () => {
    const { handleCloseSuccessModal, setShowUploadModal, clearAll, uploads } =
        useContext(CardUploadContext);
    const navigate = useNavigate();

    const closeModal = () => {
        handleCloseSuccessModal();
        setShowUploadModal(false);
        clearAll();
    };
    const handleViewCard = () => {
        navigate("/cards");
        clearAll();
    };
    const backToDashboard = () => {
        handleCloseSuccessModal();
        clearAll();
    };

    const handleContinueUpload = () => {
        handleCloseSuccessModal();
        clearAll();
        setShowUploadModal(true);
    };

    return (
        <main>
            <div className="">
                <div className="flex items-center justify-between w-full">
                    <h2 className=" w-full font-semibold text-lg text-[#1E293B] ">
                        Scanning Completed!
                    </h2>
                    <p className="flex-shrink-0">
                        <IoIosClose
                            size={28}
                            className="cursor-pointer"
                            color="#64748B"
                            onClick={closeModal}
                        />
                    </p>
                </div>

                <div>
                    <p className="mt-4 text-sm">
                        Total Cards Scanned:{" "}
                        <span className="font-semibold">
                            {" "}
                            {uploads?.length}{" "}
                        </span>{" "}
                    </p>
                </div>

                <div className="flex rounded-full items-center justify-center md:h-[200px] my-[24px]">
                    <img
                        src="/successGif.gif"
                        alt="sucess"
                        className="successGif w-[275px]"
                    />
                </div>
                <p className="mt-6 flex gap-3">
                    <button
                        type="button"
                        // onClick={}
                        className="cursor-pointer w-full h-[48px] text-sm md:text-base leading-[20px] font-[600] bg-[#272264] px-4 rounded-lg text-white"
                        onClick={handleViewCard}
                    >
                        View Cards
                    </button>
                    <button
                        type="button"
                        // onClick={}
                        className="cursor-pointer w-fit h-[48px] text-sm md:text-base font-semibold bg-transparent  px-[18px] rounded-lg border border-[#272264] text-[#272264] flex-shrink-0  "
                        onClick={backToDashboard}
                    >
                        Return to Dashboard
                    </button>
                </p>

                <div className="mt-6 text-sm ">
                    Want to upload more cards?{" "}
                    <span
                        className="text-base font-semibold cursor-pointer "
                        onClick={handleContinueUpload}
                    >
                        Upload
                    </span>
                </div>
            </div>
        </main>
    );
};

export default SuccessUplaod;
