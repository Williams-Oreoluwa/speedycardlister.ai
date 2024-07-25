import { useContext } from "react";
import ModalWrapper from "../modalWrapper/ModalWrapper";
import { CardUploadContext } from "../../Context/CardUploadContext";

const StopScanning = ({ handleCancelUpload, handleCloseModal, indexNo }) => {
    // const { deleteSelectedCards, selectedCards } = useSelectedCards();
    // const [indexNo, setindexNo] = useState("")
    const {
        stopScanning,
        setStopScanning,
        setShowUploadModal,
        uploadQueue,
        clearAll,
    } = useContext(CardUploadContext);

    const closeStopScanningModal = () => {
        clearAll();
        setStopScanning(false);
    };

    return (
        <ModalWrapper
            showModal={stopScanning}
            handleCloseModal={handleCloseModal}
            dialogClassName={"w-[480px] modal p-[24px] "}
        >
            <div className="flex flex-col">
                <div className="w-full flex items-start justify-start">
                    <img
                        src="/delete.png"
                        className="w-[48px] h-[48px]"
                        alt="warning icon"
                    />
                </div>
                <h2 className="font-semibold text-base md:text-lg mt-5 text-[#1E293B]">
                    Stop Scanning
                </h2>
                <p className=" text-sm md:text-base font-normal mt-2 text-[#64748B]">
                    Are you sure you want to stop scanning {uploadQueue?.length}{" "}
                    cards?
                </p>
                <div className="flex items-center justify-between w-full flex-1 mt-8 gap-3">
                    <button
                        className="w-full cursor-pointer py-3 px-6 rounded-md shadow-sm text-sm font-semibold border border-[#E2E8F0] text-[#1E293B] focus:outline-none "
                        onClick={closeStopScanningModal}
                    >
                        Stop Scan
                    </button>
                    <button
                        className="w-full cursor-pointer py-3 px-6 rounded-md shadow-sm text-sm font-semibold text-white focus:outline-none bg-[#D92D20] hover:bg-[#D92D20]"
                        onClick={() => {
                            closeStopScanningModal();
                            clearAll();
                            setShowUploadModal(false);
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default StopScanning;
