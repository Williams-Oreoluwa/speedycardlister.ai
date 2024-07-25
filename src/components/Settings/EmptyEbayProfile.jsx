import React, { useState, useEffect, useContext } from "react";
import { Globalcontext } from "../../Context/Context";
import { Modal } from "react-responsive-modal";
import SignUpModal from "../../Pages/SignUpModal/ModalComponent";

const EmptyEbayProfile = () => {
    const { open, onCloseModal, settingsSignUpModal, controlModal } =
        useContext(Globalcontext);
    return (
        <main>
            {controlModal ? (
                <Modal
                    closeOnOverlayClick={false}
                    classNames={{
                        overlay: "customOverlay",
                        modal: "dashboardModal",
                        closeButton: "modalcloseBtn",
                    }}
                    open={open}
                    onClose={onCloseModal}
                    center
                >
                    <SignUpModal onCloseModal={onCloseModal} />
                </Modal>
            ) : (
                ""
            )}
            <div className="flex flex-col items-center justify-center text-base md:text-[18px] gap-6 text-center leading-[24px] flex-shrink">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div>
                        <img
                            src="/profile-svgrepo-com 1.png"
                            alt="complete profile"
                        />
                    </div>

                    <h1 className="font-[600] text-[#1E293B]">
                        Your profile is yet to be completed.
                    </h1>
                    <p className="text-sm md:text-base max-w-[388px]">
                        Kindly complete your profile to have access to all
                        features Speedy Card Lister.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={settingsSignUpModal}
                    className="cursor-pointer max-w-[173px] w-full py-3 px-4 text-sm md:text-base leading-[20px] font-[600] bg-[#272264]  rounded-lg text-white"
                >
                    Update Profile
                </button>
            </div>
        </main>
    );
};

export default EmptyEbayProfile;
