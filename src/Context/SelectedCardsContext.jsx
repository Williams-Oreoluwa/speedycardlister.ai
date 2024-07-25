// SelectedCardsContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { baseUrl, userToken } from "../utilities/lib";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import toast from "react-hot-toast";
import usePostWithAuth from "../hooks/usePostWithAuth";
import useDelete from "../hooks/useDelete";
import axios from "axios";
import { Globalcontext } from "./Context";

const SelectedCardsContext = createContext();
export const useSelectedCards = () => useContext(SelectedCardsContext);

export const SelectedCardsProvider = ({ children }) => {
    const { getPendingCardsCount, getSentCardsCount, getTotalCardsCount } =
        useContext(Globalcontext);
    // const tableCard = currentTableData;
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [editingCards, setEditingCards] = useState(false);
    const [editingCardIds, setEditingCardIds] = useState([]);
    const [editValues, setEditValues] = useState({});
    const [isUploadingToEbay, setIsUploadingToEbay] = useState(false);
    const [isGettingDashBoardDetails, setIsGettingDashBoardDetails] =
        useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [getDashBoardCardError, setGetDashBoardCardError] = useState(false);
    const [useMinimize, setUseMinimize] = useState(false);
    const [useShowUploadModal, setUseShowUploadModal] = useState(false);
    const [stopScanning, setStopScanning] = useState(false);
    //  Fetching the Dashboard details
    const getDashBoardCards = async () => {
        const fetchUserUrl = `${baseUrl}/user/dashboard`;
        setIsGettingDashBoardDetails(true);
        try {
            const response = await axios.get(fetchUserUrl, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setCards(response?.data?.data?.recentCards);
        } catch (err) {
            setGetDashBoardCardError(err);
        } finally {
            setIsGettingDashBoardDetails(false);
        }
    };

    // Use effect section
    useEffect(() => {
        getDashBoardCards();
    }, []);

    // deletselected card section

    // Uplaod to ebay post request import
    const upLoadToEbayUrl = `${baseUrl}/cards/move-to-marketplace`;

    // Selcte mutttiple cadrs function
    const handleCheckboxChange = (id) => {
        setSelectedCards((prevSelectedCards) =>
            prevSelectedCards?.includes(id)
                ? prevSelectedCards?.filter((cardId) => cardId !== id)
                : [...prevSelectedCards, id]
        );
    };

    //***> delete card component
    const deleteSelectedCards = async () => {
        const payload = [];
        selectedCards?.forEach((card) => payload.push(card));
        let formData = { card_ids: payload };
        const url = `${baseUrl}/cards/max_card_rm`;

        console.log(formData);
        setIsDeleting(true);

        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    // "Content-Type": "application/json",
                },
                data: formData,
            });

            toast.success(response?.data?.message);
            setSelectedCards([]);
            getDashBoardCards();
            getPendingCardsCount();
            getSentCardsCount();
            getTotalCardsCount();
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setIsDeleting(false);
        }
    };

    //***>  Move Card toz ebay fetching

    const uploadCardsToEbay = async () => {
        const payload = [];
        selectedCards?.forEach((card) => payload.push({ card_id: card }));

        setIsUploadingToEbay(true);
        try {
            const response = await axios.post(upLoadToEbayUrl, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("Response data:", response.data);
            getDashBoardCards();
            toast.success(`${"Success"}}`);
        } catch (err) {
            toast.error(`${err?.response?.data?.message}`);
        } finally {
            setIsUploadingToEbay(false);
        }
    };

    //***>  Edit fuction

    const getEditedCards = () => {
        return editingCardIds.map((id) => {
            const originalCard = cards?.find((card) => card?._id === id);
            return {
                cardId: id,
                title: editValues[id]?.title ?? originalCard.title,
                sellingPrice: parseFloat(
                    editValues[id]?.price ?? originalCard.price
                ),
            };
        });
    };

    const setEditingCard = (id) => {
        setEditingCardIds((prevEditingCardIds) =>
            prevEditingCardIds.includes(id)
                ? prevEditingCardIds
                : [...prevEditingCardIds, id]
        );
    };

    const cancelEditingCard = (id) => {
        setEditingCardIds((prevEditingCardIds) =>
            prevEditingCardIds.filter((cardId) => cardId !== id)
        );
        setEditValues((prevEditValues) => {
            const newEditValues = { ...prevEditValues };
            delete newEditValues[id];
            return newEditValues;
        });
    };
    //===> Edit card Api
    const editSelectedCard = async () => {
        setEditingCards(true);
        const editCardUrl = `${baseUrl}/cards/max_card_edit`;
        const formData = { cards: getEditedCards() };

        try {
            const response = await axios.patch(editCardUrl, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            toast.success(response.data.message);
            getDashBoardCards();
            setEditingCardIds([]);
            setEditValues({});

            // toast.success(`${"Success"}}`);
        } catch (err) {
            toast.error(`${err?.response?.data?.message}`);
        } finally {
            setEditingCards(false);
        }
    };

    return (
        <SelectedCardsContext.Provider
            value={{
                selectedCards,
                handleCheckboxChange,
                cards,
                setCards,
                deleteSelectedCards,
                uploadCardsToEbay,
                isUploadingToEbay,
                editSelectedCard,
                setEditingCard,
                cancelEditingCard,
                editingCardIds,
                setEditValues,
                editValues,
                getEditedCards,
                editingCards,
                isGettingDashBoardDetails,
                getDashBoardCardError,
                isDeleting,
                getDashBoardCards,
                useMinimize,
                setUseMinimize,
                useShowUploadModal,
                setUseShowUploadModal,
                stopScanning,
                setStopScanning,
            }}
        >
            {children}
        </SelectedCardsContext.Provider>
    );
};
