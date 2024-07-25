import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../../Context/Context";
import axios from "axios";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import MoveToCardErrorModal from "../moveToMarketErrorModal/MoveToCardErrorModal";
import { baseURL } from "../../api/axios";
import IdleTimer from "../../components/idleTimer";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import { baseUrl, userToken } from "../../utilities/lib";
import EditSellerProfile from "../cardsDetail/EditSellerProfile";
import EditAllCardDetails from "../cardsDetail/EditAllCardDetails";
import toast from "react-hot-toast";

const SingleCard = () => {
  const [selectedCard, setSelectedCard] = useState([]);
  const [editCard, setEditCard] = useState(false);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [editedFields, setEditedFields] = useState(new Set());
  const dropDown = {
    graded: false,
    sport: false,
  };
  const [showDropdown, setShowDropdown] = useState(dropDown);
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
    theme,
    isLoggin,
  } = useContext(Globalcontext);

  const { id } = useParams();

  const apiUrl = `${baseURL}/v1/cards?card_id=${id}`;
  const { data } = useFetchWithAuth(apiUrl, userToken);

  useEffect(() => {
    if (data?.data) {
      setSelectedCard(data?.data);
    }
  }, [data]);

  const editOptions = {
    editPriceAndTitle: false,
    editAllCardDetails: false,
    editUserProfile: false,
  };
  const [editOption, setEditOption] = useState(editOptions);
  const handleEditCardDetails = (id) => {
    setEditOption((prev) => ({ ...prev, [id]: true }));
    setEditCard(true);
  };

  const handleCloseEditCard = (id) => {
    setEditCard(false);
    setEditOption((prev) => ({ ...prev, [id]: false }));
  };

  // Slider Logic
  const images = data?.data?.pictureDetails;

  const initialImage = data?.data?.pictureDetails[0].imageUrl;

  const handleClick = (index = 0) => {
    const slider = images;
    setSliderData(slider[index].imageUrl);
  };

  const handleChangeCardDetails = (e, field) => {
    setSelectedCard({
      ...selectedCard,
      [field]: e.target.textContent,
    });
    // console.log("selected", selectedCard);
    // setEditedFields((prev) => new Set(prev.add(field)));
  };

  const handleEdit = () => {
    setEditCard(true);
    setIsFieldFocused(true);
  };

  let selectedP = selectedCard?.sport;
  const [sport, setSport] = useState(selectedP);

  const handleUpdateCardDetails = async (e, selectedCard) => {
    console.log("click");
    e.preventDefault();
    // if (editedFields.size === 0) {
    //   return;
    // }
    setIsSaving(true);
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
          cardYear: selectedCard.cardYear,
          cardNumber: selectedCard.cardNumber,
          gradeNo: selectedCard.gradeNo,
          gradingCompany: selectedCard.gradingCompany,
          manufacturer: selectedCard.manufacturer,
          Set: selectedCard.Set,
          sport: selectedCard.sport,
          graded: selectedCard.graded,
          conditionDescription: selectedCard.conditionDescription,
          description: selectedCard.description,
          price: Number(selectedCard.price),
          title: selectedCard.title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Card updated successfull");
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

  // useEffect(() => {
  //   if (isSuccessFull) {
  //     const timer = setTimeout(() => {
  //       setIsSuccessfull(false);
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isSuccessFull]);

  return (
    <section className="lg:p-6 w-full">
      <IdleTimer />
      {loading ? (
        <Loader />
      ) : (
        data?.data && (
          <>
            <div className="flex mt-4 w-full text-[#1E293B] items-center gap-5 lg:justify-between ">
              <h1
                className={`leading-[43.57px] font-extrabold text-4xl ${
                  theme === "dark" ? "text-[white]" : "text-[#161616]"
                }`}
              >
                Cards
              </h1>
              {/* <div className="absolute top- left-ml-4 w-3/4">
                {isSuccessFull ? (
                  <Success title={"Saved"} className={"w-[628px]"} />
                ) : null}
              </div> */}
            </div>
            <div className="">
              <Fragment>
                <div className="mt-[1.56rem] hidden bg-[#F8FAFC] px-4 rounded-lg md:flex items-center  w-full 2xl:max-w-screen-2xl 2xl:pr-4 ">
                  <div
                    className={`flex items-center p-4 rounded-[0.625rem]  ${
                      theme === "dark" ? "text-[white]" : "text-[#9E9DA8] "
                    }  font-medium text-base leading-6`}
                  >
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
                  <h2
                    className={`font-medium text-base leading-6  ${
                      theme === "dark" ? "text-white" : "text-[#121212]"
                    }`}
                  >
                    {selectedCard?.title}
                  </h2>
                </div>
                <div className="mt-[2.51rem] flex flex-col xl:justify-between xl:flex-row gap-6 lg:w-full">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-6">
                    <div className="flex gap-4  mx-auto">
                      <div className="flex flex-col items-center md:justify-start xl:justify-center gap-2 justify-center">
                        {images &&
                          images.map((item, index) => (
                            <div
                              className=" w-[40px] h-[40px]"
                              key={index}
                              onClick={() => {
                                handleClick(index);
                                setIsClicked(true);
                              }}
                            >
                              <img
                                className="z-10 w-full h-full rounded-[4.29px] object-cover"
                                src={item.imageUrl}
                                alt="card"
                              />
                            </div>
                          ))}
                      </div>
                      <div className="mx-auto md:mx-0 w-[160px] h-[160px]  md:h-[200px] ">
                        <div className="w-[130px] md:w-[160px] h-full md:h-[200px] ">
                          {isClicked ? (
                            <img
                              className="w-full h-full rounded-[5.33px] object-cover"
                              src={sliderData}
                              alt="sliderImg"
                            />
                          ) : (
                            <img
                              className="w-full h-full rounded-[5.33px] object-cover"
                              src={initialImage}
                              alt="sliderImg"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                      <div className="w-full flex flex-col items-center md:items-start">
                        <h2
                          className={`${
                            editCard && editOption.editPriceAndTitle
                              ? "border border-[#E2E8F0] p-2  outline-none"
                              : "px-1 py-[3px]"
                          } mt-4 text-center rounded-lg sm:min-w-[470px] md:text-start font-semibold text-lg leading-[24px] w-full ${
                            theme === "dark" ? "text-white" : ""
                          }`}
                          contentEditable={editCard}
                          suppressContentEditableWarning
                          onFocus={() => setIsFieldFocused(true)}
                          onBlur={(e) => {
                            handleChangeCardDetails(e, "title");
                          }}
                        >
                          {selectedCard?.title}
                        </h2>
                        <span
                          className={` flex items-center gap-1  ${
                            data?.data?.status === "pending"
                              ? "text-[#F79009]"
                              : "text-[#00FF29]"
                          }`}
                        >
                          <span
                            className={`xl:block  p-1 rounded-full ${
                              data?.data?.status === "pending"
                                ? "bg-[#F79009]"
                                : "bg-[#00FF29]"
                            }`}
                          ></span>
                          {selectedCard?.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start w-full">
                        <div className="flex py-2  mt-4 md:mt-0 px-3 w-3/4 md:flex-col md:w-[40%]  rounded-lg border border-[#E2E8F0] justify-center md:items-start bg-[#F8FAFC] gap-1 items-center ">
                          <img
                            src="/ebay.svg"
                            alt="ebay"
                            className="w-74px h-24px"
                          />
                          <div className="flex gap-1 items-center text-[#121212] text-3xl  leading-9 font-bold">
                            <span className="">$</span>
                            <h2
                              className={` ${
                                editCard && editOption.editPriceAndTitle
                                  ? "border border-[#E2E8F0] w-32 xl:w-28 md:min-w-full p-2 bg-white outline-none"
                                  : ""
                              }  rounded-lg`}
                              contentEditable={editCard}
                              suppressContentEditableWarning
                              onFocus={() => setIsFieldFocused(true)}
                              onBlur={(e) => {
                                handleChangeCardDetails(e, "price");
                              }}
                            >
                              {selectedCard?.price}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between flex-col w-full xl:w-1/3">
                    {editOption.editPriceAndTitle ? (
                      <div className="flex gap-3 justify-center md:justify-end">
                        <button
                          className="rounded-md text-sm w-20 xl:w-1/3 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#272264]"
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
                        <button
                          className="rounded-md text-sm w-20 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#D92D20]"
                          onClick={() =>
                            handleCloseEditCard("editPriceAndTitle")
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 md:mt-0 xl:mt-4 flex justify-center md:justify-start xl:justify-end xl:flex-col-reverse xl:items-end  gap-4 items-center  w-11/12 sm:w-4/5 lg:w-full mx-auto md:mr-[85px] xl:mr-0">
                        <div
                          className="px-4 py-2 cursor-pointer gap-3 rounded-md flex border border-[#272264]"
                          onClick={() => {
                            handleEditCardDetails("editPriceAndTitle");
                          }}
                        >
                          <img
                            src="/edit.png"
                            alt="edit"
                            className="w-74px h-24px"
                          />
                          Edit
                        </div>
                        <button
                          className={` rounded-md h-full text-sm  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#272264]`}
                          onClick={async () => {
                            try {
                              await moveCardToMarket(id);
                              // handleOpenModal("moveCardError");
                            } catch (error) {
                              toast.error(
                                error?.message || error.message
                                // "unable to send card"
                              );
                              console.error(
                                "Error moving card to market:",
                                error
                              );
                            }
                          }}
                        >
                          Send to Marketplace
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Fragment>
              <div className="w-full border-t flex flex-col gap-y-6 border-[#E2E8F0] mt-12">
                <EditAllCardDetails
                  handleCloseEditCard={handleCloseEditCard}
                  data={data}
                  selectedCard={selectedCard}
                  handleEditCardDetails={handleEditCardDetails}
                  editCard={editCard}
                  editOption={editOption}
                  isFieldFocused={isFieldFocused}
                  sport={sport}
                  setSport={setSport}
                  setSelectedCard={setSelectedCard}
                  handleUpdateCardDetails={handleUpdateCardDetails}
                  handleChangeCardDetails={handleChangeCardDetails}
                />
                <EditSellerProfile
                  handleCloseEditCard={handleCloseEditCard}
                  selectedCard={selectedCard}
                  data={data}
                  handleEditCardDetails={handleEditCardDetails}
                  editCard={editCard}
                  editOption={editOption}
                  setSelectedCard={setSelectedCard}
                  setIsFieldFocused={setIsFieldFocused}
                  isFieldFocused={isFieldFocused}
                />
              </div>
            </div>
          </>
        )
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
