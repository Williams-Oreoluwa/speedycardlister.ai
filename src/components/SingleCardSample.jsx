import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Success from "../success/Success";
import { Globalcontext } from "../../Context/Context";
import axios from "axios";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import TextReveal from "../textReveal/TextReveal";
import MoveToCardErrorModal from "../moveToMarketErrorModal/MoveToCardErrorModal";
import { baseURL } from "../../api/axios";
import IdleTimer from "../../components/idleTimer";

const SingleCard = () => {
  const [selectedCard, setSelectedCard] = useState([]);
  const [editCard, setEditCard] = useState(false);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const {
    isSuccessFull,
    setIsSuccessfull,
    loading,
    setLoading,
    handleOpenModal,
    handleCloseModal,
    showModal,
    moveCardToMarket,
    moveToMarket,
  } = useContext(Globalcontext);
  const { id } = useParams();
  const [sliderData, setSliderData] = useState([]);

  const getSelectedCard = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const apiUrl = `${baseURL}/v1/cards?card_id=${id}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setSelectedCard(response.data.data);

      // Set the first image as the initial state for sliderData
      if (response.data.data && response.data.data.cardAvatars.length > 0) {
        setSliderData(response.data.data.cardAvatars[0].imageUrl);
      }
    } catch (error) {
      console.error(
        "error all cards",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSelectedCard();
  }, [id]);
  const clickedCard = selectedCard;
  const images = selectedCard.cardAvatars;

  const handleChangeCardDetails = (e, field) => {
    setSelectedCard({
      ...selectedCard,
      [field]: e.target.textContent,
    });
    handleUpdateCardDetails(e, selectedCard);
  };

  const handleEdit = () => {
    setEditCard(true);
    setIsFieldFocused(true);
  };

  // Slider Logic
  const handleClick = (index = 0) => {
    const slider = images;
    setSliderData(slider[index].imageUrl);
  };

  const handleUpdateCardDetails = async (e, selectedCard) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const apiUrl = `${baseURL}/v1/cards`;

      const response = await axios.patch(
        apiUrl,
        {
          card_id: selectedCard._id,
          estimatedPrice: Number(selectedCard.estimatedPrice),
          cardYear: selectedCard.cardYear,
          cardNumber: selectedCard.cardNumber,
          gradeNumber: selectedCard.gradeNumber,
          gradingCompany: selectedCard.gradingCompany,
          variety: selectedCard.variety,
          certificateNumber: selectedCard.certificateNumber,
          sentDate: selectedCard.sentDate,
          changeOverWeekPercent: selectedCard.changeOverWeekPercent,
          brand: selectedCard.brand,
          printRun: selectedCard.printRun,
          dateAdded: selectedCard.dateAdded,
          serialNo: selectedCard.serialNo,
          lowEstimatedPrice: Number(selectedCard.lowEstimatedPrice),
          highEstimatedPrice: Number(selectedCard.highEstimatedPrice),
          subject: selectedCard.subject,
          category: selectedCard.category,
          cost: Number(selectedCard.cost),
          title: selectedCard.title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("alledit", response.data);
      setIsSuccessfull(true);
      setIsFieldFocused(false);
      setEditCard(false);
    } catch (error) {
      console.error(
        "error all cards",
        error.response ? error.response.data : error
      );
    } finally {
      setIsSaving(false);
      setIsFieldFocused(false);
      setEditCard(false);
    }
  };

  useEffect(() => {
    if (isSuccessFull) {
      const timer = setTimeout(() => {
        setIsSuccessfull(false);
      }, 2000);

      // Clean up function to clear the timeout when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isSuccessFull]);

  return (
    <section className="">
      <IdleTimer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex mt-[5rem] w-full items-center gap-5 lg:justify-between ">
            <h1 className="leading-[43.57px] font-extrabold text-4xl text-[#161616]">
              Cards
            </h1>
            <div className="absolu top- left- ml-4 w-3/4">
              {isSuccessFull ? (
                <Success title={"Saved"} className={"w-[628px]"} />
              ) : null}
            </div>
          </div>
          <div className="container">
            <Fragment>
              <div className="mt-[1.56rem] flex flex-col sm:flex-row sm:items-center  w-full 2xl:max-w-screen-2xl 2xl:pr-4 ">
                <div className="flex items-center p-4 rounded-[0.625rem]  text-[#9E9DA8] font-medium text-base leading-6">
                  <h2 className="cursor-pointer">Cards</h2>
                  <img
                    src="/navigate-arrow.svg"
                    className="w-6 h-6 cursor-pointer"
                  />
                  <h2 className="cursor-pointer" onClick={() => navigate(-1)}>
                    All Cards
                  </h2>
                  <img
                    src="/navigate-arrow.svg"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <h2 className="font-medium text-base leading-6 text-[#121212] ">
                  {clickedCard?.title}
                </h2>
              </div>
              <div className="mt-[2.51rem] flex flex-col sm:flex-row gap-6 lg:w-11/12">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col items-center gap-5 justify-center">
                      {images &&
                        images.map((item, index) => (
                          <div
                            className=" w-[80px] h-[80px]"
                            key={index}
                            onClick={() => {
                              handleClick(index);
                              setIsClicked(true);
                            }}
                          >
                            <img
                              className="z-10 w-full h-full rounded-2xl object-cover"
                              src={item.imageUrl}
                              alt="card"
                            />
                          </div>
                        ))}
                    </div>
                    <div className="mx-auto md:mx-0 w-[240px] h-[300px] md:h-[320px]">
                      <div className="w-full h-full">
                        <img
                          className="w-full h-full rounded-3xl object-cover"
                          src={sliderData}
                          alt="sliderImg"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={`md:font-semibold rounded-md  py-[10px] md:px-[56px] text-white text-base leading-[28px] ${
                      selectedCard.status === "sent"
                        ? "bg-[#6454D6]/50 cursor-not-allowed"
                        : "bg-[#6454D6]"
                    }`}
                    onClick={async () => {
                      try {
                        await moveCardToMarket(id);
                        handleOpenModal("moveCardError");
                      } catch (error) {
                        console.error("Error moving card to market:", error);
                      }
                    }}
                  >
                    Send to Marketplace
                  </button>
                </div>
                <div className="flex justify-between flex-col-rever w-full">
                  <div>
                    <div className="w-full">
                      <h2 className="mt-4 px-1 py-[3px] font-semibold text-base leading-10 w-full">
                        {selectedCard.title}
                      </h2>
                    </div>

                    <div className="flex gap-8 items-start mt-6 ">
                      <div className="px-[0.56rem] shadow-md lg:w-52 h-[115px] py-[0.44rem] border rounded-[0.625rem] bg-[#F2F5F3] ">
                        <img
                          src="/ebay.svg"
                          alt="ebay"
                          className="w-74px h-24px"
                        />
                        <h2 className="mt-4 p-2 border w-fit text-[#121212] text-3xl leading-9 font-bold rounded-lg bg-[#F2F5F3]">
                          {`$ ${selectedCard.cost}`}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="ml-">
                    <button
                      className={` rounded-[0.46rem] py-[0.57rem] px-[1.15rem] text-white font-semibold leading-4 ${
                        selectedCard.status === "pending"
                          ? "bg-[#C2B10F]"
                          : "bg-[#00FF29]"
                      }`}
                    >
                      {selectedCard.status}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mt-8 sm:w-11/12">
                  <h2 className="leading-10 font-semibold text-2xl text-[#121212]">
                    Card Details
                  </h2>
                  <div>
                    {isFieldFocused ? (
                      <button
                        className="bg-[#6454D6]/70 flex gap-1 items-center justify-center py-[12.25px] px-[24.5px] rounded-lg font-medium text-[21.44px] leading-[25.17px] text-[#FFFFFF]"
                        onClick={async (event) => {
                          setIsSaving(true);
                          await handleUpdateCardDetails(event, selectedCard);
                          setIsSaving(false);
                          setIsSuccessfull(true);
                        }}
                      >
                        {isSaving ? (
                          <Spinner width={"20"} height={"20"} />
                        ) : (
                          "Save"
                        )}
                      </button>
                    ) : (
                      <button
                        className={`bg-[#FFF7F1] flex gap-1 items-center justify-center py-[10.76px] px-[21.51px] rounded-lg ${
                          selectedCard.status === "sent" ? "hidden" : "block"
                        }`}
                        onClick={handleEdit}
                      >
                        <img
                          src="/edit.svg"
                          alt="edit"
                          className="w-11px h-[11px]"
                        />
                        <h2 className="font-medium text-[#FF6D03] text-[18.82px] leading-[22.1px] cursor-pointer">
                          Edit
                        </h2>
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
                <div className="flex flex-col xl:flex-row py-6 md:px-4 overflow-x-auto w-full scrollbar-hide">
                  <div className="flex-1">
                    <table className="table-auto w-full">
                      <thead className="hidden">
                        <tr>
                          <th className="bg-gray-200"></th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 min-w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Title
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "title");
                            }}
                          >
                            {selectedCard.title}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Cost
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "cost");
                            }}
                          >
                            {selectedCard.cost}
                          </td>
                        </tr>

                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            Card Year:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "cardYear");
                            }}
                          >
                            {selectedCard.cardYear}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Card Number:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 flex w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "cardNumber");
                            }}
                          >
                            {selectedCard.cardNumber}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Grade Number:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 flex w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "gradeNumber");
                            }}
                          >
                            {selectedCard.gradeNumber}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Grading Company:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 flex w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "gradingCompany");
                            }}
                          >
                            {selectedCard.gradingCompany}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Variety:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "variety");
                            }}
                          >
                            {selectedCard.variety}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Certificate Number:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "certificateNumber");
                            }}
                          >
                            {selectedCard.certificateNumber}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Sent Date:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "sentDate");
                            }}
                          >
                            {selectedCard.sentDate}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            changeOverWeekPercent:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(
                                e,
                                "changeOverWeekPercent"
                              );
                            }}
                          >
                            {selectedCard.changeOverWeekPercent}
                          </td>
                        </tr>
                        {/* <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            id:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "_id");
                            }}
                          >
                            <TextReveal text={selectedCard._id} />
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-1">
                    <table className="table-auto w-full">
                      <thead className="hidden">
                        <tr>
                          <th className="bg-gray-200"></th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            Estimated price
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "estimatedPrice");
                            }}
                          >
                            {selectedCard.estimatedPrice}
                          </td>
                        </tr>
                        <tr className="flex gap-10 w-full ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Brand:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] sm:min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "brand");
                            }}
                          >
                            {selectedCard.brand}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            PrintRun:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] sm:min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "printRun");
                            }}
                          >
                            {selectedCard.printRun}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 min-w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Date Added:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "dateAdded");
                            }}
                          >
                            <TextReveal text={selectedCard.dateAdded} />
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Serial Number:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "serialNo");
                            }}
                          >
                            {selectedCard.serialNo}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Low Estimated Price:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "lowEstimatedPrice");
                            }}
                          >
                            {selectedCard.lowEstimatedPrice}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            High Estimated Price:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "highEstimatedPrice");
                            }}
                          >
                            {selectedCard.highEstimatedPrice}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Notes:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "brand");
                            }}
                          >
                            {selectedCard.brand}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 min-w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Subject:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "subject");
                            }}
                          >
                            <TextReveal text={selectedCard.subject} />
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Category:
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "category");
                            }}
                          >
                            <TextReveal text={selectedCard.category} />
                          </td>
                        </tr>
                        {/* <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Cost
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "cost");
                            }}
                          >
                            {selectedCard.cost}
                          </td>
                        </tr>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 min-w-[220px] md:w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Title
                          </td>
                          <td
                            className={`px-[10px] py-[3px] min-w-10 max-w- flex overflow-x- w-fit h-fit text-center  outline-none ${
                              editCard ? "border border-[#cccccc] px-1" : ""
                            } rounded-md text-[#121212] font-medium leading-[18.78px] text-base`}
                            contentEditable={editCard}
                            suppressContentEditableWarning
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={(e) => {
                              handleChangeCardDetails(e, "title");
                            }}
                          >
                            {selectedCard.title}
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </>
      )}
      <MoveToCardErrorModal
        showModal={showModal.moveCardError}
        handleCloseModal={() => {
          handleCloseModal("moveCardError");
        }}
        moveToMarket={moveToMarket}
      />
    </section>
  );
};

export default SingleCard;
