/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CardUploadContext = createContext();
const CardUploadContextProvider = ({ children }) => {
    const [minimizeUpload, setMinimizeUpload] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [stopScanning, setStopScanning] = useState(false);
    const [uploadQueue, setUploadQueue] = useState([]);
    const [allUploadsDone, setAllUploadsDone] = useState(false);
    const [uploads, setUploads] = useState([]);
    const [error, setError] = useState("");
    const [indexNo, setIndexNo] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleCloseSuccessModal = () => {
        setAllUploadsDone(false);
    };

    const clearAll = () => {
        setUploads([]);
        setUploadQueue([]);
        setError("");
        setIndexNo("");
        setIsUploading(false);
        setAllUploadsDone(false);
        setStopScanning(false);
    };

    const calculateOverallProgress = () => {
        if (uploads.length === 0) return 0;
        const totalProgress = uploads.reduce(
            (acc, upload) => acc + upload.progress,
            0
        );
        return totalProgress / uploads.length;
    };

    const passedValues = {
        minimizeUpload,
        setMinimizeUpload,
        showUploadModal,
        setShowUploadModal,
        stopScanning,
        setStopScanning,
        uploadQueue,
        setUploadQueue,
        allUploadsDone,
        setAllUploadsDone,
        handleCloseSuccessModal,
        uploads,
        setUploads,
        error,
        setError,
        indexNo,
        setIndexNo,
        isUploading,
        setIsUploading,
        clearAll,
        calculateOverallProgress,
    };
    return (
        <CardUploadContext.Provider value={passedValues}>
            {children}
        </CardUploadContext.Provider>
    );
};

export default CardUploadContextProvider;
