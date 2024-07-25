import React, { useEffect, useState } from "react";
import CustomSelectArrows from "../CustomSelectArrows";
import CustomRadio from "../Radio/CustomRadio";
// import { BiChevronDown } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
const MajorWeightSelector = ({ majorWeight, setMajorWeight }) => {
  const handleChange = (event) => {
    setMajorWeight(event.target.value);
    "major weight is:", event.target.value;
  };
  return (
    <div className="w-full font-medium grid  grid-cols-[1fr,6rem] gap-2 relative">
      <div className="relative">
        <select
          value={majorWeight}
          onChange={handleChange}
          id="mySelect"
          className="select"
          name="Major Weight"
        >
          <option value="" disabled hidden>
            Select major weight.
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <CustomSelectArrows />
      </div>
      <input readOnly type="text" name="" id="" value="kg" className="input" />
    </div>
  );
};

const MinorWeightSelector = ({ minorWeight, setMinorWeight }) => {
  const handleChange = (event) => {
    setMinorWeight(event.target.value);
    "major weight is:", event.target.value;
  };
  return (
    <div className="w-full font-medium grid  grid-cols-[1fr,6rem] gap-2">
      <div className="relative">
        <select
          value={minorWeight}
          onChange={handleChange}
          id="mySelect"
          className="select"
          name="Minor Weight"
        >
          <option value="" disabled hidden>
            Select minor weight.
          </option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
        <CustomSelectArrows />
      </div>
      <input readOnly type="text" name="" id="" value="kg" className="input" />
    </div>
  );
};

const ListingDurationSelector = ({ listingDuration, setListingDuration }) => {
  const handleChange = (event) => {
    setListingDuration(event.target.value);
    "listing time is:", event.target.value;
  };
  return (
    <div className="w-full font-medium grid  grid-cols-[1fr,6rem] gap-2">
      <div className="relative">
        <select
          value={listingDuration}
          onChange={handleChange}
          id="mySelect"
          className="select"
          name="Listing duration"
        >
          <option value="" disabled hidden>
            Select listing duration.
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <CustomSelectArrows />
      </div>
      <input
        readOnly
        type="text"
        name=""
        id=""
        value="days"
        // disabled
        className="input"
      />
    </div>
  );
};

const FutureListingSelector = ({ futureListing, setFutureListings }) => {
  const handleChange = (event) => {
    setFutureListings(event.target.value);
    "future listing is:", event.target.value;
  };
  return (
    <div className="w-full font-medium grid  grid-cols-[1fr,6rem] gap-2">
      <div className="relative">
        <select
          value={futureListing}
          onChange={handleChange}
          id="mySelect"
          className="select"
          name="FutureListing"
        >
          <option value="" disabled hidden>
            Select future listings.
          </option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select>
        <CustomSelectArrows />
      </div>
      <input
        readOnly
        type="text"
        name=""
        id=""
        value="days"
        className="input"
      />
    </div>
  );
};

const ProductListings = ({
  majorWeight,
  setMajorWeight,
  minorWeight,
  setMinorWeight,
  listingDuration,
  setListingDuration,
  futureListing,
  setFutureListings,
  listingType,
  setListingType,
  auction,
  bestOffer,
  setBestOffer,
  setAuction,
}) => {
  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setAuction(true);
      setBestOffer(false); // Uncheck the other checkbox
    } else if (checkboxNumber === 2) {
      setBestOffer(true);
      setAuction(false); // Uncheck the other checkbox
    }
  };

  if (auction && !bestOffer) {
    setListingType("buy it now");
  } else if (!auction && bestOffer) {
    setListingType("best offer");
  }
 

  return (
    <>
      <div className="pb-4">
        <label htmlFor="majorWeight" className="label">
          Major Weight
        </label>
        <div className="email-container w-full">
          <MajorWeightSelector
            majorWeight={majorWeight}
            setMajorWeight={setMajorWeight}
          />
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="minorWeight" className="label">
          Minor Weight
        </label>
        <div className="email-container w-full">
          <MinorWeightSelector
            minorWeight={minorWeight}
            setMinorWeight={setMinorWeight}
          />
        </div>
      </div>

      <div className="pb-4 flex flex-col gap-3">
        <label htmlFor="majorWeight" className="label">
          Listing Type
        </label>
        <div className="email-container w-full">
          <div className="flex gap-4">
            <CustomRadio
              value="buy it Now"
              name="Option 1"
              checked={auction}
              onChange={() => handleCheckboxChange(1)}
            />{" "}
            <CustomRadio
              value="best Offer"
              name="Option 2"
              checked={bestOffer}
              onChange={() => handleCheckboxChange(2)}
            />
          </div>
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="listingDuration" className="label">
          Listing Duration
        </label>
        <div className="email-container w-full">
          <ListingDurationSelector
            listingDuration={listingDuration}
            setListingDuration={setListingDuration}
          />
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="futureListings" className="label">
          Future Listing
        </label>
        <div className="email-container w-full">
          <FutureListingSelector
            futureListing={futureListing}
            setFutureListings={setFutureListings}
          />
        </div>
      </div>
    </>
  );
};

export default ProductListings;
