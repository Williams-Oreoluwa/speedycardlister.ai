import { ArchiveBox, Edit2 } from "iconsax-react";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import DeleteModal from "../deleteModal/DeleteModal";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

const EditOptionNav = () => {
    const {
        isUploadingToEbay,
        uploadCardsToEbay,
        setEditingCard,
        selectedCards,
        editSelectedCard,
        editingCardIds,
        editingCards,
        cancelEditingCard,
        isDeleting,
    } = useSelectedCards();
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = () => {
        if (selectedCards.length > 0) {
            console.log(selectedCards);
            selectedCards.forEach((cardId) => setEditingCard(cardId));
        } else {
            alert("Please select at least one card to edit.");
        }
    };
    const handleSaveAllClick = () => {
        editSelectedCard();
    };

    const handleCancelAllClick = () => {
        editingCardIds.forEach((cardId) => cancelEditingCard(cardId));
    };
    return (
        <div className="flex w-full justify-end items-center gap-4">
            {editingCardIds?.length > 0 ? (
                <>
                    <button
                        onClick={handleSaveAllClick}
                        disabled={editingCards}
                        className="bg-[#272264] text-white py-2 px-[24px] min-w-[80px] min-h-[34px] flex items-center justify-center text-sm font-semibold rounded-lg"
                    >
                        {editingCards ? (
                            <LoaderIcon
                                style={{ width: "14px", height: "14px" }}
                            />
                        ) : (
                            "Save"
                        )}
                    </button>
                    <button
                        onClick={handleCancelAllClick}
                        disabled={editingCards}
                        className="bg-[#D92D20] text-white py-2 px-4 text-sm font-semibold rounded-lg"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button
                        className=""
                        onClick={() => {
                            uploadCardsToEbay();
                        }}
                        disabled={isUploadingToEbay}
                    >
                        {isUploadingToEbay ? (
                            <LoaderIcon
                                style={{ width: "24px", height: "24px" }}
                            />
                        ) : (
                            <img
                                src="/ebayLogo.png"
                                className="h-[18px] md:h-6"
                                alt="ebay Logo"
                            />
                        )}
                    </button>

                    <Edit2
                        className="w-[18px] md:w-6 cursor-pointer"
                        color="#272264"
                        variant="Outline"
                        onClick={handleEditClick}
                    />

                    <button
                        className=""
                        onClick={() => {
                            setShowModal(true);
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <LoaderIcon
                                style={{ width: "24px", height: "24px" }}
                            />
                        ) : (
                            <ArchiveBox
                                className="w-[18px] md:w-6 cursor-pointer"
                                color="#FF8A65"
                                variant="Outline"
                            />
                        )}
                    </button>
                </>
            )}

            {/* Modal section  */}

            <DeleteModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default EditOptionNav;
