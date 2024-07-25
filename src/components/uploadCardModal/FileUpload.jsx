import React, { useContext, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Card, CloseCircle } from "iconsax-react";
import StopScanning from "./StopScanning";
import { baseUrl, userToken } from "../../utilities/lib";
import { Globalcontext } from "../../Context/Context";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import { CardUploadContext } from "../../Context/CardUploadContext";
import SuccessUplaod from "./SuccessUplaod";
import Modal from "react-responsive-modal";

const FileUpload = () => {
    const { getPendingCardsCount, getSentCardsCount, getTotalCardsCount } =
        useContext(Globalcontext);
    const { getDashBoardCards } = useSelectedCards();

    const {
        stopScanning,
        setStopScanning,
        uploadQueue,
        setUploadQueue,
        allUploadsDone,
        setAllUploadsDone,
        handleCloseSuccessModal,
        setShowUploadModal,
        uploads,
        setUploads,
        error,
        setError,
        indexNo,
        setIndexNo,
        isUploading,
        setIsUploading,
        clearAll,
        setMinimizeUpload,
    } = useContext(CardUploadContext);

    const processQueue = useCallback(() => {
        if (uploadQueue.length > 0 && !isUploading) {
            const nextUpload = uploadQueue[0];
            setIsUploading(true);
            uploadFiles(
                nextUpload.files,
                nextUpload.index,
                nextUpload.cancelTokenSource
            );
        }
    }, [uploadQueue, isUploading]);

    useEffect(() => {
        processQueue();
    }, [uploadQueue, processQueue]);

    useEffect(() => {
        if (uploadQueue.length === 0 && uploads.length > 0) {
            const allDone = uploads.every(
                (upload) => upload.status === "success"
                // || upload.status === "error"
            );
            if (allDone) {
                setAllUploadsDone(true);
                setShowUploadModal(false);
                setMinimizeUpload(false);
                // clearAll();
            }
        }
    }, [uploadQueue, uploads]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length % 2 !== 0) {
            setError("You must upload an even number of images.");
            return;
        }

        setError("");
        const pairs = [];
        // turning uploaded files into pairs
        for (let i = 0; i < acceptedFiles.length; i += 2) {
            pairs.push([acceptedFiles[i], acceptedFiles[i + 1]]);
        }

        pairs.forEach((pair, index) => {
            const cancelTokenSource = axios.CancelToken.source();
            const newUpload = {
                files: pair,
                progress: 0,
                status: "queued",
                cancelTokenSource: cancelTokenSource,
            };
            setUploads((prevUploads) => [...prevUploads, newUpload]);
            setUploadQueue((prevQueue) => [
                ...prevQueue,
                {
                    files: pair,
                    index: uploads.length + index,
                    cancelTokenSource,
                },
            ]);
        });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
    });

    const uploadFiles = (files, uploadIndex, cancelTokenSource) => {
        const url = `${baseUrl}/cards/upload`;
        const formData = new FormData();
        formData.append("card", files[0]);
        formData.append("card", files[1]);

        const updateProgress = () => {
            setUploads((prevUploads) => {
                const newUploads = [...prevUploads];
                if (newUploads[uploadIndex]) {
                    newUploads[uploadIndex].progress += 5;
                }
                return newUploads;
            });
        };

        const interval = setInterval(() => {
            setUploads((prevUploads) => {
                const newUploads = [...prevUploads];
                if (
                    newUploads[uploadIndex] &&
                    newUploads[uploadIndex].progress < 90
                ) {
                    newUploads[uploadIndex].progress += 1;
                }
                return newUploads;
            });
        }, 100);

        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userToken}`,
                },
                cancelToken: cancelTokenSource.token,
            })
            .then((response) => {
                clearInterval(interval);
                console.log("Files uploaded successfully", response.data);
                setUploads((prevUploads) => {
                    const newUploads = [...prevUploads];
                    if (newUploads[uploadIndex]) {
                        newUploads[uploadIndex].progress = 100;
                        newUploads[uploadIndex].status = "success";
                    }
                    return newUploads;
                });

                getDashBoardCards();
                getPendingCardsCount();
                getSentCardsCount();
                getTotalCardsCount();

                setUploadQueue((prevQueue) => prevQueue.slice(1));
                setIsUploading(false);
            })
            .catch((error) => {
                clearInterval(interval);
                if (axios.isCancel(error)) {
                    console.log("Upload canceled", error.message);
                } else {
                    console.error("Error uploading files", error);
                }
                setUploads((prevUploads) => {
                    const newUploads = [...prevUploads];
                    if (newUploads[uploadIndex]) {
                        newUploads[uploadIndex].status = "error";
                    }
                    return newUploads;
                });

                setUploadQueue((prevQueue) => prevQueue.slice(1));
                setIsUploading(false);
            });
    };

    const handleCancelUpload = (index) => {
        const upload = uploads[index];
        const cancelTokenSource = upload.cancelTokenSource;

        if (upload.status === "uploading" && cancelTokenSource) {
            cancelTokenSource.cancel("Upload canceled by user.");
            setUploads((prevUploads) => {
                const newUploads = [...prevUploads];
                if (newUploads[index]) {
                    newUploads[index].status = "canceled";
                    newUploads[index].progress = 0;
                }
                return newUploads;
            });
            setUploadQueue((prevQueue) =>
                prevQueue.filter((_, i) => i !== index)
            );
            setIsUploading(false);
        } else if (upload.status === "queued") {
            setUploads((prevUploads) => {
                const newUploads = [...prevUploads];
                newUploads.splice(index, 1);
                return newUploads.map((upload, i) => ({
                    ...upload,
                    index: i,
                }));
            });
            setUploadQueue((prevQueue) =>
                prevQueue
                    .filter((_, i) => i !== index)
                    .map((upload, i) => ({
                        ...upload,
                        index: i,
                    }))
            );
        }
        setStopScanning(false);
        processQueue(); // Continue with the next in queue if any
    };

    const handleCloseModal = (index) => {
        setStopScanning(true);
        setIndexNo(index);
    };

    return (
        <>
            <div className="mx-auto p-0 ">
                <div className="px-4 md:px-8">
                    <div
                        {...getRootProps()}
                        className="border-2 px-2 flex items-center justify-center bg-[#F8FAFC] border-dashed border-gray-300 rounded cursor-pointer h-[196px] focus:outline-none"
                    >
                        <input {...getInputProps()} className="hidden" />
                        <div>
                            <p className="flex justify-center">
                                <Card size="48px" color="#CBD5E1" />
                            </p>
                            <p className="text-center text-gray-500 mt-8">
                                <span className="text-[#1E293B]">
                                    Drag and drop cards here
                                </span>{" "}
                                or
                                <span className="text-sm text-[#272264] font-semibold">
                                    {" "}
                                    Browse File
                                </span>
                            </p>
                        </div>
                    </div>
                    {error && (
                        <p className="mt-2 text-center text-red-600">{error}</p>
                    )}
                    {uploadQueue?.length > 0 && (
                        <div className="py-4 text-sm text-[#1E293B] ">
                            Cards remaining:{" "}
                            <span className="font-semibold">
                                {uploadQueue?.length}
                            </span>
                        </div>
                    )}{" "}
                    {/* <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                        onClick={clearAll}
                    >
                        Clear All
                    </button> */}
                </div>

                <div className="overflow-y-auto cardHeigth pl-4 pb-4 md:pl-8 mr-3 md:pr-[14px]  ">
                    <div>
                        {uploads.map((upload, i) => (
                            <div
                                key={i}
                                className={`${
                                    upload.status === "uploading" ||
                                    upload.status === "success"
                                        ? "opacity-100"
                                        : "opacity-50"
                                } transition-opacity duration-300`}
                            >
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-sm">Card {i + 1}</p>
                                    <p>
                                        <CloseCircle
                                            size="18"
                                            color="#94A3B8"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleCancelUpload(i)
                                            }
                                        />
                                    </p>
                                </div>
                                {upload?.files?.map((item) => (
                                    <div
                                        key={item?.name}
                                        className={`flex items-center justify-between gap-3 p-[6px] rounded mt-[7px] border-[0.5px] ${
                                            upload.status === "error" ||
                                            upload.status === "canceled"
                                                ? "border-red-500"
                                                : "border-[#7F56D9]"
                                        }`}
                                    >
                                        <img
                                            src="/cloud_icon.png"
                                            alt="icon"
                                            className="w-8 h-8 mr-[6px]"
                                        />
                                        <div className="h-[8px] w-full bg-[#F1F5F9] rounded">
                                            <p
                                                style={{
                                                    width: `${
                                                        upload.status ===
                                                        "error"
                                                            ? "9px"
                                                            : upload?.progress
                                                    }%`,
                                                }}
                                                className={`h-full progressBar ${
                                                    upload.status === "error" ||
                                                    upload.status === "canceled"
                                                        ? "bg-red-500"
                                                        : "bg-[#7F56D9]"
                                                } rounded`}
                                            ></p>
                                        </div>
                                        <p className="text-sm font-semibold">
                                            {upload.progress}%
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <StopScanning
                handleCloseModal={handleCloseModal}
                handleCancelUpload={handleCancelUpload}
                indexNo={indexNo}
                clearAll={clearAll}
            />
            <Modal
                closeOnOverlayClick={false}
                classNames={{
                    overlay: "customOverlay",
                    modal: "dashboardModal",
                    closeButton: "modalcloseBtn hiddeModal",
                }}
                open={allUploadsDone}
                onClose={handleCloseSuccessModal}
                center
            >
                <SuccessUplaod clearAll={clearAll} />
            </Modal>
        </>
    );
};

export default FileUpload;
