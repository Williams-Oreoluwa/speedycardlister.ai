import React, { useState } from "react";
import ListDropdown from "./ListDropdown";
import Selector from "./Selector";
import { Country } from "country-state-city";
import CustomRadio from "../Radio/CustomRadio";
import Spinner from "../spinner/Spinner";
import axios from "axios";
import { baseURL } from "../../api/axios";
import toast from "react-hot-toast";

const quantity = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
  { name: "6" },
  { name: "7" },
  { name: "8" },
  { name: "9" },
  { name: "10" },
];
const shippingMethodList = [
  { name: "Free shipping" },
  { name: "Pick up in store" },
  { name: "Shipping" },
];

const EditSellerProfile = ({
  data: {
    data: {
      User: { productListing, location, shippingInfo },
    },
  },
  handleEditCardDetails,
  editCard,
  editOption,
  handleCloseEditCard,
}) => {
  let getCountries = Country.getAllCountries();
  let getCurrencies = Country.getCountryByCode();
  // console.log("cont1", getCountries);
  // console.log("cont2", getCurrencies);
  const [userDetails, setUserDetails] = useState({
    ...productListing,
    ...location,
    ...shippingInfo,
  });
  // console.log("userInfo", userDetails);
  const [country, setCountry] = useState(getCountries[0]);
  const [currency, setCurrency] = useState();
  const [listingTypeValue, setListingTypeValue] = useState(
    userDetails.listingType
  );
  // console.log(listingTypeValue);

  const handleRadioChange = (e) => {
    setListingTypeValue(e.target.value);
    setUserDetails((prev) => ({
      ...prev,
      listingType: e.target.value,
    }));
    setIsFieldFocused(true);
  };

  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateUserProfile = async (e) => {
    const accessToken = localStorage.getItem("accessToken");

    e.preventDefault();
    try {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const apiUrl = `${baseURL}/v1/user/profile`;

      const response = await axios.patch(
        apiUrl,
        {
          address: userDetails.address,
          postalCode: userDetails.postalCode,
          country: userDetails.country,
          currency: userDetails.currency,
          listingType: userDetails.listingType,
          listingDuration: userDetails.listingDuration,
          weightMajor: userDetails.weightMajor,
          weightMinor: userDetails.weightMinor,
          futureListing: userDetails.futureListing,
          dispatchTimeMax: userDetails.dispatchTimeMax,
          shippingMethod: userDetails.shippingMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User profile updated");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
    }
    // setLoading(false);
  };

  return (
    <div className="w-full border-t border-[#E2E8F0]">
      <div className="flex items-center justify-between w-full mt-6">
        <h2 className="font-semibold text-base leading-5 text-[#1E293B]">
          Seller Profile
        </h2>
        <div>
          {editOption.editUserProfile ? (
            <div className="flex gap-3">
              <button
                className="rounded-md ml-auto text-sm w-20 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#272264]"
                onClick={async (e) => {
                  setIsSaving(true);
                  await handleUpdateUserProfile(e, userDetails);
                  handleCloseEditCard("editUserProfile");
                  setIsSaving(false);
                  // setIsSuccessfull(true);
                }}
              >
                {isSaving ? <Spinner width={"20"} height={"20"} /> : "Save"}
              </button>
              <button
                className="rounded-md ml-auto text-sm w-20 h-fit  py-[14px] px-4 text-[#F8FAFC] font-semibold leading-4 bg-[#D92D20]"
                onClick={() => {
                  handleCloseEditCard("editUserProfile");
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
                handleEditCardDetails("editUserProfile");
              }}
            >
              <img src="/edit.png" alt="edit" className="w-74px h-24px" />
              Edit
            </div>
          )}
        </div>
      </div>
      <div className="relative w-full mt-6">
        <div
          className={`${
            editCard && editOption?.editUserProfile ? "w-full" : ""
          } top-0 left-0 absolute bg-[#F8FAFC] w-[57%] sm:w-[28%] xl:w-[200px] z-10 h-full`}
        ></div>
        <div className="p-2 relative z-10 text-opacity-30 text-sm flex flex-col xl:flex-row xl:gap-2 w-full gap-y-6">
          <div className="flex flex-col gap-8 flex-1">
            <div
              className={`flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row items-center"
              }`}
            >
              <h2 className="text-[#64748B] flex items-center w-3/5 sm:flex-none sm:w-[28%] z-10 xl:w-[200px]">
                Major Weight:
              </h2>
              <div className="flex md:w-full gap-1  items-center">
                <div
                  className={`relative ${
                    editOption?.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={quantity}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="weightMajor"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[232px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full min-h-10 flex items-center">
                        {userDetails?.weightMajor} kg
                      </p>
                    </div>
                  )}
                </div>
                {editOption.editUserProfile && (
                  <p className="min-w-14 min-h-10 xl:w-[20%] text-[#94A3B8] h-fit border border-[#E2E8F0] p-2 rounded-lg">
                    kg
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex w-full gap-1  ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] flex items-center w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Minor Weight:
              </h2>
              <div className="flex md:w-full gap-1 items-center">
                <div
                  className={`relative ${
                    editOption.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={quantity}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="weightMinor"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full min-h-10 flex items-center">
                        {userDetails?.weightMinor} kg
                      </p>
                    </div>
                  )}
                </div>
                {editOption.editUserProfile && (
                  <p className="min-w-14 min-h-10 xl:w-[20%] text-[#94A3B8] h-fit border border-[#E2E8F0] p-2 rounded-lg">
                    kg
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Listing Type:
              </h2>

              {editOption.editUserProfile ? (
                <div className="flex gap-4">
                  <CustomRadio
                    value="buy it now"
                    name="listingType"
                    checked={listingTypeValue === "buy it now"}
                    onChange={handleRadioChange}
                    defaultValue={true}
                  />
                  <CustomRadio
                    value="best offer"
                    name="listingType"
                    checked={listingTypeValue === "best offer"}
                    onChange={handleRadioChange}
                  />
                </div>
              ) : (
                <p
                  className={`${
                    editCard && editOption?.editUserProfile
                      ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                      : ""
                  }text-[#1E293B] md:w-[40%] sm:flex-none`}
                >
                  {userDetails?.listingType}
                </p>
              )}
            </div>
            <div
              className={`flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] items-center w-3/5 flex sm:flex-none sm:w-[28%] xl:w-[200px]">
                Listing Duration:
              </h2>
              <div className="flex md:w-full gap-1 items-center">
                <div
                  className={`relative ${
                    editOption.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={quantity}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="listingDuration"
                      classname="xl:-top-[15.5rem]"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full min-h-10 flex items-center">
                        {userDetails?.listingDuration} days
                      </p>
                    </div>
                  )}
                </div>
                {editOption.editUserProfile && (
                  <p className="min-w-14 min-h-10 xl:w-[20%] text-[#94A3B8] h-fit border border-[#E2E8F0] p-2 rounded-lg">
                    days
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] items-center  w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Shipping and Handling Time:
              </h2>
              <div className="flex md:w-full gap-1 items-center">
                <div
                  className={`relative ${
                    editOption.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={quantity}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="listingDuration"
                      classname="xl:-top-[15.5rem]"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full min-h-10 flex items-center">
                        {userDetails?.listingDuration} days
                      </p>
                    </div>
                  )}
                </div>
                {editOption.editUserProfile && (
                  <p className="min-w-14 min-h-10 xl:w-[20%] text-[#94A3B8] h-fit border border-[#E2E8F0] p-2 rounded-lg">
                    days
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B]  w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Address:{" "}
              </h2>
              <p
                className={`${
                  editCard && editOption?.editUserProfile
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                    : ""
                }text-[#1E293B] md:w-[40%] sm:flex-none md:max-w-[250px]`}
              >
                {userDetails?.address}
              </p>
            </div>
          </div>
          {/* flex */}
          <div className="p-2 relative z-20 flex flex-col pt-2 gap-8 flex-1">
            <div className="hidden xl:block top-0 left-0 absolute bg-[#F8FAFC] w-[57%] xl:w-[200px] z-10  h-full"></div>
            <div
              className={`relative z-10 flex w-full gap-1 ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Postal Code:
              </h2>
              <p
                className={`${
                  editCard && editOption?.editUserProfile
                    ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none min-h-10"
                    : ""
                }text-[#1E293B] md:w-[40%] sm:flex-none`}
              >
                {userDetails?.postalCode}
              </p>
            </div>
            <div
              className={`relative flex gap-1 w-full ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] z-10 w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Country:{" "}
              </h2>
              <div
                className={`relative ${
                  editOption.editUserProfile ? "w-full" : ""
                } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
              >
                {editOption.editUserProfile ? (
                  <Selector
                    data={getCountries}
                    selected={country}
                    setSelected={setCountry}
                  />
                ) : (
                  <div
                    className={`${
                      editCard && editOption?.editUserProfile
                        ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                        : ""
                    } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                  >
                    <p className="outline-none w-full">
                      {userDetails?.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`relative flex gap-1 w-full ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] z-10 w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Currency:
              </h2>
              <div
                className={`relative ${
                  editOption.editUserProfile ? "w-full" : ""
                } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
              >
                {editOption.editUserProfile ? (
                  <Selector
                    data={getCountries}
                    selected={currency}
                    setSelected={setCurrency}
                  />
                ) : (
                  <div
                    className={`${
                      editCard && editOption?.editUserProfile
                        ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                        : ""
                    } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                  >
                    <p className="outline-none w-full">
                      {userDetails?.currency}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`relative z-10 flex gap-1 w-full ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Future Listing
              </h2>
              <div className="flex md:w-full gap-1 items-center">
                <div
                  className={`relative ${
                    editOption.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={quantity}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="futureListing"
                      classname="-top-[16rem]"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full">
                        {userDetails?.futureListing} days
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`relative flex gap-1 w-full ${
                editCard && editOption?.editUserProfile
                  ? "flex-col sm:flex-row"
                  : "flex-row"
              }`}
            >
              <h2 className="text-[#64748B] z-10 w-3/5 sm:flex-none sm:w-[28%] xl:w-[200px]">
                Shipping Method:
              </h2>
              <div className="flex md:w-full gap-1 items-center">
                <div
                  className={`relative ${
                    editOption.editUserProfile ? "w-full" : "w-1/5 flex-grow"
                  } md:min-w-[68px] md:w-1/2 min-h-10 xl:w-[230px] `}
                >
                  {editOption.editUserProfile ? (
                    <ListDropdown
                      values={shippingMethodList}
                      setSelectedCard={setUserDetails}
                      setIsFieldFocused={setIsFieldFocused}
                      selectedCard={userDetails}
                      property="shippingMethod"
                      classname="-top-[8rem]"
                    />
                  ) : (
                    <div
                      className={`${
                        editCard && editOption?.editUserProfile
                          ? "border border-[#E2E8F0] p-2 rounded-lg bg-white outline-none w-full md:min-w-[68px] md:w-fit min-h-10 xl:w-[230px]"
                          : ""
                      } text-[#1E293B] flex justify-between items-center flex-1 sm:flex-none`}
                    >
                      <p className="outline-none w-full">
                        {userDetails?.shippingMethod}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSellerProfile;
