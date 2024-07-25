import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Selector from "./Selector";
import ListDropdown from "./ListDropdown";
import YearPicker from "./YearPicker";
import CustomRadio from "../Radio/CustomRadio";
import Spinner from "../spinner/Spinner";

const sports = [
  { id: 1, name: "Football" },
  { id: 2, name: "Gold" },
  { id: 3, name: "Basketball" },
  { id: 4, name: "Baseball" },
  { id: 5, name: "Ricket" },
  { id: 6, name: "Handball" },
];

const gradedOptions = [{ name: "Yes" }, { name: "No" }];

const EditAllCardDetails = ({
  data: { data },
  handleEditCardDetails,
  editCard,
  editOption,
  // isFieldFocused,
  selectedCard,
  setSelectedCard,
  sport,
  setSport,
  handleCloseEditCard,
  handleUpdateCardDetails,
  handleChangeCardDetails,
}) => {
  const [conditionDescription, setConditionDescription] = useState("used");
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccessFull, setIsSuccessfull] = useState(false);

  const handleRadioChange = (e) => {
    setConditionDescription(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mt-6">
        <h2 className="font-semibold text-base leading-5 text-[#1E293B]">
          Card Details
        </h2>

        <div>
          {editOption.editAllCardDetails ? (
            <div className="flex gap-3">
              <button
                className="rounded-md ml-auto text-sm w-20 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#272264]"
                onClick={async (event) => {
                  setIsSaving(true);
                  await handleUpdateCardDetails(event, selectedCard);
                  setIsSaving(false);
                  setIsSuccessfull(true);
                  handleCloseEditCard("editAllCardDetails");
                }}
              >
                {isSaving ? <Spinner width={"20"} height={"20"} /> : "Save"}
              </button>
              <button
                className="rounded-md ml-auto text-sm w-20 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#D92D20]"
                onClick={() => {
                  handleCloseEditCard("editAllCardDetails");
                  setIsFieldFocused(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              className="px-4 py-2 gap-3 cursor-pointer rounded-lg flex border border-[#272264]"
              onClick={() => {
                handleEditCardDetails("editAllCardDetails");
              }}
            >
              <img src="/edit.png" alt="edit" className="w-74px h-24px" />
              Edit
            </div>
          )}
        </div>
      </div>
      <div className="relative w-full">
        <div
          className={`top-0 left-0 absolute bg-[#F8FAFC]  z-10  h-full ${
            editCard && editOption?.editAllCardDetails
              ? "w-full sm:w-full md:w-[28%] xl:w-[190px]"
              : "w-[48%] sm:w-[28%] xl:w-[190px]"
          }`}
        ></div>
        <div
          className="p-2  relative z-10 text-opacity-30 text-sm flex flex-col
                xl:flex-row xl:gap-2 w-full gap-y-6"
        >
          <div className="flex flex-col gap-8 fl xl:w-[57%]">
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Title:
              </h2>
              <div
                className={`text-[#1E293B] ${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white  min-h-10"
                    : ""
                } flex-1 sm:flex-none xl:w-[55%]`}
              >
                <p
                  className="outline-none"
                  contentEditable={editCard}
                  suppressContentEditableWarning
                  onFocus={() => setIsFieldFocused(true)}
                  onBlur={(e) => {
                    handleChangeCardDetails(e, "title");
                  }}
                >
                  {selectedCard?.title}
                </p>
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Starting Price:
              </h2>
              <div
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-[68px] min-h-10"
                    : ""
                } text-[#1E293B] flex flex-1 sm:flex-none`}
              >
                <p>$</p>
                <p
                  className="outline-none"
                  contentEditable={editCard}
                  suppressContentEditableWarning
                  onFocus={() => setIsFieldFocused(true)}
                  onBlur={(e) => {
                    handleChangeCardDetails(e, "price");
                  }}
                >
                  {selectedCard?.price}
                </p>
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex-1 sm:flex-none w-1/2 sm:w-[28%] xl:w-[200px]">
                Buy it Now Price:
              </h2>
              <div
                className={`flex flex-col ${
                  editCard && editOption?.editAllCardDetails
                    ? "w-full"
                    : "w-1/2"
                }`}
              >
                <p
                  className={`${
                    editCard && editOption?.editAllCardDetails
                      ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none md:w-[68px] min-h-10"
                      : "w-1/2"
                  } text-[#1E293B] flex-1 sm:flex-none`}
                  contentEditable={editCard}
                  suppressContentEditableWarning
                  onFocus={() => setIsFieldFocused(true)}
                  onBlur={(e) => {
                    handleChangeCardDetails(e, "price");
                  }}
                >
                  $35.00
                </p>
                {editOption?.editAllCardDetails && (
                  <div className="flex mt-1 items-center gap-1 text-[#94A3B8]">
                    <HiOutlineExclamationCircle size={14} className="" />
                    <p className="text-xs leading-3 font-normal">
                      Price must be greater than 30% of starting price
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Card Year:
              </h2>
              <div className="w-1/2">
                {editOption?.editAllCardDetails ? (
                  <YearPicker year={data?.cardYear} />
                ) : (
                  <p
                    className={`${"min-h-10 p-2 bg-white outline-none w-[68px]"} text-[#1E293B] flex-1 sm:flex-none`}
                  >
                    {selectedCard?.cardYear}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[198px]">
                Card Number:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-[68px] min-h-10"
                    : ""
                } text-[#1E293B] flex-1 sm:flex-none`}
              >
                {selectedCard?.cardNumber}
              </p>
            </div>
          </div>

          <div className="p-2 relative z-10 flex flex-col pt-2 gap-8 fl xl:w-[43%]">
            <div className="hidden xl:block top-0 left-0 absolute bg-[#F8FAFC] w-[48%] xl:w-[200px] z-10  h-full"></div>

            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full md:items-center gap-1 relative z-`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none w sm:w-[28%] xl:w-[200px] z-10">
                Sport:
              </h2>
              <div
                className={`relative ${
                  editOption.editAllCardDetails ? "w-full" : "w-1/2"
                } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
              >
                {editOption.editAllCardDetails ? (
                  <Selector
                    data={sports}
                    selected={sport}
                    setSelected={setSport}
                    setSelectedCard={setSelectedCard}
                    setIsFieldFocused={setIsFieldFocused}
                    property="sport"
                  />
                ) : (
                  <div
                    className={`${
                      editCard && editOption?.editAllCardDetails
                        ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                        : ""
                    } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                  >
                    <p className="outline-none w-full">{selectedCard?.sport}</p>
                    {editOption.editAllCardDetails && (
                      <IoIosArrowDown className="text-[#94A3B8] cursor-pointer text-base" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1 relative z-10`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Manufacturer:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                    : ""
                } text-[#1E293B] flex-1 sm:flex-none`}
              >
                {selectedCard?.manufacturer}
              </p>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1 relative z-10`}
            >
              <h2 className="text-[#64748B] flex  items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Set:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                    : ""
                } text-[#1E293B] flex-1 sm:flex-none`}
              >
                {selectedCard?.Set}
              </p>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1 relative z-10`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Condition Description:
              </h2>
              {editOption.editAllCardDetails ? (
                <div className="flex gap-4">
                  <CustomRadio
                    value="used"
                    name="listingType"
                    checked={conditionDescription === "used"}
                    onChange={handleRadioChange}
                  />
                  <CustomRadio
                    value="new"
                    name="listingType"
                    checked={conditionDescription === "new"}
                    onChange={handleRadioChange}
                    defaultValue={true}
                  />
                </div>
              ) : (
                <p className="text-[#1E293B] flex-1">
                  {selectedCard?.conditionDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6 ">
        <div className="relative w-full">
          <div
            className={`top-0 left-0 absolute bg-[#F8FAFC] ${
              editCard && editOption?.editAllCardDetails ? "w-full" : ""
            } w-[48%] sm:w-[28%] xl:w-[190px] z-10  h-full`}
          ></div>
          <div className="p-2 relative z-10 text-opacity-30 text-sm flex flex-col gap-y-6">
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Graded:
              </h2>
              <div
                className={`relative ${
                  editOption.editAllCardDetails ? "w-full" : "w-1/2"
                } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
              >
                {editOption.editAllCardDetails ? (
                  <ListDropdown
                    values={gradedOptions}
                    setSelectedCard={setSelectedCard}
                    setIsFieldFocused={setIsFieldFocused}
                    selectedCard={selectedCard}
                    property="graded"
                    isFieldFocused={isFieldFocused}
                  />
                ) : (
                  <div
                    className={`${
                      editCard && editOption?.editAllCardDetails
                        ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                        : ""
                    } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                  >
                    <p className="outline-none w-full">
                      {selectedCard?.graded}
                    </p>
                    {editOption.editAllCardDetails && (
                      <IoIosArrowDown className="text-[#94A3B8] cursor-pointer text-base" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Grading Company:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-w-[68px] w-fit min-h-10"
                    : ""
                } text-[#1E293B] flex-1 sm:flex-none`}
              >
                {selectedCard?.gradingCompany}
              </p>
            </div>
            <div
              className={`flex ${
                editCard && editOption?.editAllCardDetails
                  ? "flex-col md:flex-row"
                  : "flex-row"
              }  w-full gap-1`}
            >
              <h2 className="text-[#64748B] flex items-center flex-1 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Grade Number:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editAllCardDetails
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-w-[68px] w-fit min-h-10"
                    : ""
                } text-[#1E293B] flex-1 sm:flex-none`}
              >
                {selectedCard?.gradeNo}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
          <div className="bg-[#F8FAFC] p-4 h-fit w-[48%] sm:w-[28%] xl:w-[190px] ">
            <h2 className="font-normal flex items-center text-sm text-[rgb(100,116,139)]">
              Description:
            </h2>
          </div>
          <p
            className={`${
              editCard && editOption?.editAllCardDetails
                ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                : ""
            } xl:max-w-[520px] xl:p-2 font-normal text-sm leading-[22px] text-[#1E293B]`}
          >
            {selectedCard?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default EditAllCardDetails;
