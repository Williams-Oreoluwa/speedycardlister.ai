import { useContext } from "react";
import { Minus } from "iconsax-react";

import { IoClose } from "react-icons/io5";
import FileUpload from "../uploadCardModal/FileUpload";

import { CardUploadContext } from "../../Context/CardUploadContext";
const UploadModal = () => {
    const {
        minimizeUpload,
        setMinimizeUpload,
        showUploadModal,
        setShowUploadModal,
        setStopScanning,
        uploadQueue,
        clearAll,
        uploads,
    } = useContext(CardUploadContext);

    const handleUseMinimize = () => {
        if (uploadQueue?.length > 0) {
            setMinimizeUpload(true);
        } else {
            return 0;
        }
    };

    const handleClose = () => {
        if (uploadQueue?.length > 0) {
            setStopScanning(true);
        } else {
            clearAll();
            setShowUploadModal(false);
        }
    };

    return (
        <div
            className={`${
                showUploadModal ? "fixed" : "hidden"
            } top-0 left-0 bottom-0 h-screen right-0 bg-opacity-70 bg-black z-50 flex md:items-center justify-center md:p-4   ${
                minimizeUpload ? "hiddeModal" : ""
            } `}
        >
            <div
                className={`bg-white md:rounded-2xl w-full md:max-w-[480px]  overflow-auto md:overflow-hidden  ${
                    uploads.length > 0 ? "md:h-[89vh]" : "h-fit"
                }  md:max-h-[760px] `}
            >
                <div className="w-full py-4 md:py-8">
                    <div className="w-full flex justify-between items-center gap-2 mb-6 px-4 md:px-8">
                        <p className="font-semibold text-sm ">Upload Cards</p>
                        <div className="flex items-center gap-4">
                            <Minus
                                size={18}
                                className="cursor-pointer"
                                onClick={handleUseMinimize}
                            />
                            <IoClose
                                onClick={handleClose}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <FileUpload
                    // handleCancelAllUploads={(cancelFn) =>
                    //     (cancelAllUploadsRef.current = cancelFn)
                    // }
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
