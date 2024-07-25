import { useContext, useState } from "react";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import { CardUploadContext } from "../../Context/CardUploadContext";

const MinimizeTray = () => {
    // const { useMinimize, setUseMinimize } = useSelectedCards();
    const {
        minimizeUpload,
        setMinimizeUpload,
        uploadQueue,
        calculateOverallProgress,
    } = useContext(CardUploadContext);

    const handleViewMinimize = () => {
        setMinimizeUpload(false);
    };
    return (
        <div
            className={` ${
                minimizeUpload ? "block" : "hidden"
            }  w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-3`}
        >
            <div>
                <p className="text-[#1E293B] font-semibold ">
                    Uploading Cards...
                </p>
                <p className="mt-1">{uploadQueue?.lenght} cards remaining</p>
                <div className="flex items-center justify-start mt-10">
                    <div className="w-full bg-[#F1F5F9] h-[6px]  ">
                        <p
                            style={{ width: `${calculateOverallProgress()}%` }}
                            className=" bg-[#7F56D9] rounded-[4px] h-full "
                        ></p>
                    </div>
                    <p className="text-[10px] font-semibold ">
                        {Math.floor(calculateOverallProgress())}%
                    </p>
                </div>

                <button
                    onClick={handleViewMinimize}
                    className="mt-4 text-[#272264] text-[11px] font-semibold"
                >
                    view details
                </button>
            </div>
        </div>
    );
};

export default MinimizeTray;
