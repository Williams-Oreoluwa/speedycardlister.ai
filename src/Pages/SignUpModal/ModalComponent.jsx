import React, { useState, useEffect, useContext } from "react";
import Location from "../../components/DashboardModal/Location";
import Preferences from "../../components/DashboardModal/Preferences";
import OpeningModal from "../../components/OpeningModal";
import ProductListings from "../../components/DashboardModal/ProductListings";
import Confirmation from "../../components/DashboardModal/Confirmation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Globalcontext } from "../../Context/Context";
import Preloader from "../../components/Loader";

const SignUpModal = ({ onCloseModal }) => {
  // const [loading, setLoading] = useState(false);

  const {
    ebayStatus,
    ebayTokens,
    handleProfileCompleted,
    page,
    setPage,
    shippingTime,
    setShippingTime,
    shippingMethod,
    setShippingMethod,
    listingType,
    setListingType,
    currencyValue,
    setCurrencyValue,
    locationValue,
    setLocationValue,
    postalCode,
    setPostalCode,
    majorWeight,
    setMajorWeight,
    minorWeight,
    setMinorWeight,
    listingDuration,
    setListingDuration,
    futureListing,
    setFutureListings,
    selectedCountry,
    setSelectedCountry,
    auction,
    setAuction,
    bestOffer,
    setBestOffer,
    countries,
    setCountries,
    loader,
  } = useContext(Globalcontext);

  const FormTitles = [
    "Welcome Screen",
    "Location Information",
    "Product Listings",
    "Shipping Information",
    "Confirmation",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <OpeningModal />;
    } else if (page === 1) {
      return (
        <Location
          locationValue={locationValue}
          setLocationValue={setLocationValue}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          currencyValue={currencyValue}
          setCurrencyValue={setCurrencyValue}
          countries={countries}
          setCountries={setCountries}
        />
      );
    } else if (page === 2) {
      return (
        <ProductListings
          majorWeight={majorWeight}
          setMajorWeight={setMajorWeight}
          minorWeight={minorWeight}
          setMinorWeight={setMinorWeight}
          listingDuration={listingDuration}
          setListingDuration={setListingDuration}
          futureListing={futureListing}
          setFutureListings={setFutureListings}
          listingType={listingType}
          setListingType={setListingType}
          auction={auction}
          bestOffer={bestOffer}
          setBestOffer={setBestOffer}
          setAuction={setAuction}
        />
      );
    } else if (page === 3) {
      return (
        <Preferences
          shippingTime={shippingTime}
          setShippingTime={setShippingTime}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />
      );
    } else {
      return <Confirmation />;
    }
  };
  return (
    <main className="">
      <div
        className={`${
          page === 0 ? "hidden" : "block"
        } flex flex-col space-y-2  items-center justify-center font-raleway`}
      >
        <div
          className={`${
            page === 0 ? "hidden" : "block"
          } flex items-center justify-start  md:gap-[39.5px] w-full relative mt-10 md:mt-0 `}
        >
          <span
            type="button"
            onClick={() => setPage((currPage) => currPage - 1)}
            className={`${
              page === 0 || page === FormTitles.length - 1 ? "hidden" : "block"
            } cursor-pointer flex items-center justify-center h-[42px] w-[42px] rounded-[50%] border-2 border-[#E2E8F0] flex-shrink-0 z-50`}
          >
            <BsArrowLeft />
          </span>

          <div className="absolute left-[50%] w-full transform translate-x-[-50%] ">
            <div className="">
              <h2
                className={`${
                  page === FormTitles.length - 1 ? "hidden" : "block"
                } text-[#1E293B] text-xl md:text-[24px] text-center font-semibold flex-shrink-0 `}
              >
                {FormTitles[page]}
              </h2>

              <div
                className={`${
                  page === 0 || page === FormTitles.length - 1
                    ? "hidden"
                    : "block"
                } grid grid-cols-3  gap-2 w-full mx-auto mt-3 max-w-40`}
              >
                <div
                  className={`${
                    page === 1 || page > 1 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                  }  rounded-lg  w-full h-2`}
                ></div>
                <div
                  className={`${
                    page === 2 || page > 2 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                  }  rounded-lg  w-full h-2`}
                ></div>
                <div
                  className={`${
                    page === 3 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                  }  rounded-lg  w-full h-2`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleProfileCompleted}
        className="max-w-[1280px] pt-8 space-y-4 flex flex-col rounded-md"
      >
        <div className="w-full gap-4">{PageDisplay()}</div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[40%,1fr] gap-4">
            <button
              onClick={onCloseModal}
              type="button"
              className={`${
                page < FormTitles.length - 2 || page === FormTitles.length - 1
                  ? "block"
                  : "hidden"
              } w-full cursor-pointer py-3 px-6 rounded-md shadow-sm text-sm font-semibold border border-[#272264] text-[#272264] focus:outline-none hover:bg-[#bebbbb]`}
            >
              Skip
            </button>

            {/* <button
                type="button"
                disabled={page == 0 ? false : true}
                onClick={() => setPage((currPage) => currPage + 1)}
                className={`${
                  page < FormTitles.length - 2 ? "block" : "hidden"
                } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Continue
              </button> */}
            <button
              type="button"
              // disabled={
              //   page == 1 &&
              //   postalCode &&
              //   locationValue &&
              //   selectedCountry
              //     ? false
              //     : true
              // }
              onClick={() => setPage((currPage) => currPage + 1)}
              className={`${
                page < FormTitles.length - 2 ? "block" : "hidden"
              } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none`}
            >
              Continue
            </button>
            {!ebayStatus ? (
              <a
                href={ebayTokens}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  page === FormTitles.length - 1 ? "block" : "hidden"
                } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none`}
              >
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-[1rem]">Link to eBay</h2>
                  <span className="text-[1.5rem]">
                    <BsArrowRight />
                  </span>
                </div>
              </a>
            ) : (
              <button
                className={`${
                  page === FormTitles.length - 1 ? "block" : "hidden"
                } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none`}
              >
                Authenticated
              </button>
            )}
          </div>
          <button
         
            disabled={
              
              (listingType &&
              locationValue &&
              shippingTime &&
              shippingMethod &&
              listingType &&
              currencyValue &&
              locationValue &&
              postalCode &&
              majorWeight &&
              minorWeight &&
              listingDuration &&
              futureListing &&
              countries ? false : true)
            }
            type="submit"
            className={`${
              page === FormTitles.length - 2 ? "block" : "hidden"
            } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loader ? <Preloader /> : "Finish"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpModal;
