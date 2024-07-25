import React, { useContext } from "react";
import ModalWrapper from "../modalWrapper/ModalWrapper";
import { Globalcontext } from "../../Context/Context";
import { useSelectedCards } from "../../Context/SelectedCardsContext";

const DeleteModal = ({
    showModal,
    setShowModal,
    handleCloseModal,
    deleteCard,
    item,
    handleDeleteCard,
}) => {
    const { deleteSelectedCards, selectedCards } = useSelectedCards();
    return (
        <ModalWrapper
            showModal={showModal}
            handleCloseModal={() => setShowModal(false)}
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
                    Delete Card(s)
                </h2>
                <p className=" text-sm md:text-base font-normal mt-2 text-[#64748B]">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        {selectedCards?.length}
                    </span>{" "}
                    card{selectedCards?.length > 1 && `(s)`}? This action cannot
                    be undone.
                </p>
                <div className="flex items-center justify-between w-full flex-1 mt-8 gap-3">
                    <button
                        className="w-full cursor-pointer py-3 px-6 rounded-md shadow-sm text-sm font-semibold border border-[#E2E8F0] text-[#1E293B] focus:outline-none "
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-full cursor-pointer py-3 px-6 rounded-md shadow-sm text-sm font-semibold text-white focus:outline-none bg-[#D92D20] hover:bg-[#D92D20]"
                        onClick={() => {
                            deleteSelectedCards();
                            setShowModal(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default DeleteModal;
