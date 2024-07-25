import React, { useState, useEffect, useContext } from "react";
import { Globalcontext } from "../../Context/Context";
import CustomSelectArrows from "../CustomSelectArrows";
import CustomRadio from "../Radio/CustomRadio";
import Preloader from "../Loader";
import { countryList } from "../../countries";
import { baseURL } from "../../api/axios";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EbayProfile = () => {
    const {
        userLocation,
        productListings,
        shippingInfo,
        setProductListings,

        setBestOffer,
        setAuction,

        setUserLocation,
        loading,
        setShippingInfo,
        setLoading,
    } = useContext(Globalcontext);

    // const {
    //     // address = "thwkk",bay
    //     // postalCode = "",
    //     // country = "",
    //     // currency = "",
    // } = userLocation;
    let address = "my address";
    let postalCode = "";
    let country = "";
    let currency = "";
    let listingType = "";
    let listingDuration = "";
    let weightMajor = "";
    let weightMinor = "";
    let futureListing = "";
    let dispatchTimeMax = "";
    let shippingMethod = "";

    // const {
    //     listingType,
    //     listingDuration,
    //     weightMajor,
    //     weightMinor,
    //     futureListing,
    // } = productListings;

    // const { dispatchTimeMax, shippingMethod } = shippingInfo;

    const success = () => {
        toast.success("Details Saved!");
    };

    const showSuccessToast = () => {
        success();
    };

    const error = () => toast.error("Oops!! Error occured.");
    const showErrorToast = () => {
        error();
    };

    const [listingTypeValue, setListingTypeValue] = useState("");

    const handleEbayEdit = async (e) => {
        const accessToken = localStorage.getItem("accessToken");

        e.preventDefault();
        setLoading(true);
        try {
            if (!accessToken) {
                console.error("No access token found");
                return;
            }

            const apiUrl = `${baseURL}/v1/user/profile`;

            const response = await axios.patch(
                apiUrl,
                {
                    address,
                    postalCode,
                    country,
                    currency,
                    listingType: listingTypeValue,
                    listingDuration,
                    weightMajor,
                    weightMinor,
                    futureListing,
                    dispatchTimeMax,
                    shippingMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // console.log(response);

            showSuccessToast();
        } catch (error) {
            console.error(
                "Error updating profile:",
                error.response ? error.response.data : error
            );
            showErrorToast();
        }
        setLoading(false);
    };

    const handleRadioChange = (value) => {
        if (value === "buy it now") {
            setAuction(true);
            setBestOffer(false);
            setListingTypeValue(value);
        } else if (value === "best offer") {
            setBestOffer(true);
            setAuction(false);
            setListingTypeValue(value);
        } else {
            setListingTypeValue("");
        }
    };

    useEffect(() => {
        if (listingType === "buy it now") {
            setAuction(true);
            setBestOffer(false);
            setListingTypeValue("buy it now");
        } else if (listingType === "best offer") {
            setAuction(false);
            setBestOffer(true);
            setListingTypeValue("best offer");
        }
    }, [listingType, setAuction, setBestOffer]);

    // console.log(listingType);

    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        setCountryData(countryList);
    }, []);

    // console.log(dispatchTimeMax);

    return (
        <div className=" md:block w-full flex flex-col gap-4">
            <div className="flex flex-col mb-[1rem]">
                <div className="flex items-center  justify-start gap-1 w-full">
                    <img
                        src="/Icons/Information Icon.png"
                        alt=""
                        className="h-5 w-5 mb-4"
                    />
                    <h2 className="flex pb-[1rem] text-[.9rem]">
                        You have successfully signed in to your
                        <span className="text-[#E53238] text-[1.3rem] font-bold ml-1 font-ebay">
                            {" "}
                            e
                        </span>{" "}
                        <span className="text-[#0064D3] font-bold text-[1.3rem] font-ebay">
                            b
                        </span>{" "}
                        <span className="text-[#F5AF02] font-ebay font-bold text-[1.3rem]">
                            a
                        </span>{" "}
                        <span className="font-ebay text-[#86B817] font-bold mr-1 text-[1.3rem]">
                            y{" "}
                        </span>
                        account.
                    </h2>
                </div>
                <div className="w-full h-[2px]    bg-[#E2E8F0] rounded-xl"></div>
            </div>
            <form onSubmit={handleEbayEdit} className="flex flex-col gap-4">
                <main className=" md:flex md:flex-col flex-1 lg:grid lg:grid-cols-2  gap-5">
                    <div>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="md:pt-[10%] rounded-lg hidden md:flex flex-col text-[#1E293B] text-[16px] p-6 gap-10 bg-[#F8FAFC]">
                                <div>Major Weight</div>
                                <div>Minor Weight</div>
                                <div>Listing Type</div>
                                <div>Listing Duration</div>
                                <div>Shipping and Handling time</div>
                                <div>Address</div>
                                <div className="lg:hidden flex flex-col text-[#1E293B] text-[16px] gap-14">
                                    <div>Postal Code</div>
                                    <div>Country</div>
                                    <div>Currency</div>
                                    <div>Future Listings</div>
                                    <div>Shipping Method</div>
                                </div>
                            </div>
                            <div className="bg-[#F8FAFC] rounded-lg md:bg-transparent flex  flex-col text-[#1E293B] text-[16px]  p-6 md:p-6 gap-4 w-full">
                                <div className="flex flex-col gap-2 md:gap-0">
                                    <label
                                        htmlFor="weightMajor"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Major Weight
                                    </label>
                                    <div className="w-full font-medium grid  grid-cols-[1fr,4rem] gap-2 relative">
                                        <div className="w-full font-medium cursor-pointer relative">
                                            <select
                                                value={weightMajor}
                                                onChange={(e) =>
                                                    setProductListings({
                                                        ...productListings,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select "
                                                name="weightMajor"
                                            >
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                        <input
                                            readOnly
                                            type="text"
                                            name=""
                                            id="1"
                                            value="kg"
                                            className="input"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="weightMinor"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Minor Weight
                                    </label>
                                    <div className="w-full font-medium grid  grid-cols-[1fr,4rem] gap-2">
                                        <div className="relative">
                                            <select
                                                value={weightMinor}
                                                onChange={(e) =>
                                                    setProductListings({
                                                        ...productListings,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="weightMinor"
                                            >
                                                <option value="3">3</option>
                                                <option value="5">5</option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>

                                        <input
                                            readOnly
                                            type="text"
                                            name=""
                                            id="2"
                                            value="kg"
                                            className="input"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="lastName"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Listing type
                                    </label>

                                    <div className="email-container w-full">
                                        <div className="flex gap-4">
                                            <CustomRadio
                                                value="buy it now"
                                                name="listingType"
                                                checked={
                                                    listingTypeValue ===
                                                    "buy it now"
                                                }
                                                onChange={() =>
                                                    handleRadioChange(
                                                        "buy it now"
                                                    )
                                                }
                                            />
                                            <CustomRadio
                                                value="best offer"
                                                name="listingType"
                                                checked={
                                                    listingTypeValue ===
                                                    "best offer"
                                                }
                                                onChange={() =>
                                                    handleRadioChange(
                                                        "best offer"
                                                    )
                                                }
                                                defaultValue={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="listingDuration"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Listing Duration
                                    </label>
                                    <div className="w-full font-medium grid  grid-cols-[1fr,4rem] gap-2 relative">
                                        <div className="relative">
                                            <select
                                                value={listingDuration}
                                                onChange={(e) =>
                                                    setProductListings({
                                                        ...productListings,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="listingDuration"
                                            >
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
                                            id="3"
                                            value="kg"
                                            className="input"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="dispatchTimeMax"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Dispatch Time
                                    </label>
                                    <div className="w-full font-medium grid  grid-cols-[1fr,4rem] gap-2 relative">
                                        <div className="relative">
                                            <select
                                                value={dispatchTimeMax}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="dispatchTimeMax"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                        <input
                                            readOnly
                                            type="text"
                                            name=""
                                            id="4"
                                            value="days"
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-10 md:gap-0">
                                    <label
                                        htmlFor="address"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Address
                                    </label>
                                    <div>
                                        <textarea
                                            name="address"
                                            id="5"
                                            rows="2"
                                            value={address}
                                            onChange={(e) =>
                                                setUserLocation({
                                                    ...userLocation,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 h-20 text-sm md:text-base"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="lg:hidden flex flex-col text-[#1E293B] text-[16px] lg:p-6 gap-3 md:gap-6 ">
                                    <label
                                        htmlFor="postalCode"
                                        className="md:hidden  block text-md font-bold text-gray-700"
                                    >
                                        Postal Code
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            value={postalCode}
                                            name="postalCode"
                                            onChange={(e) =>
                                                setUserLocation({
                                                    ...userLocation,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            className="rounded-lg w-[25%] h-[2.3rem] px-4 py-2 border border-gray-300  focus:outline-none focus:ring-indigo-500 text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-0">
                                        <label
                                            htmlFor="country"
                                            className="md:hidden block text-md font-bold text-gray-700"
                                        >
                                            Country
                                        </label>
                                        <div className="w-full font-medium cursor-pointer relative">
                                            <option value="" disabled hidden>
                                                Select your country.
                                            </option>
                                            <select
                                                id="mySelect"
                                                className="select "
                                                name="country"
                                                placeholder="Enter your country"
                                                value={country}
                                                onChange={(e) =>
                                                    setUserLocation({
                                                        ...userLocation,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Select your country.
                                                </option>

                                                {countryData.map(
                                                    (country, index) => {
                                                        const { name } =
                                                            country;
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-0">
                                        <label
                                            htmlFor="lastName"
                                            className="md:hidden block text-md font-bold text-gray-700"
                                        >
                                            Currency
                                        </label>
                                        <div className="w-full font-medium  gap-2 relative">
                                            <div className="relative">
                                                <select
                                                    value={currency}
                                                    onChange={(e) =>
                                                        setUserLocation({
                                                            ...userLocation,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="select"
                                                    name="currency"
                                                >
                                                    <option value="USD">
                                                        USD
                                                    </option>
                                                    <option value="CAD">
                                                        CAD
                                                    </option>
                                                    <option value="EUR">
                                                        EUR
                                                    </option>
                                                    <option value="GBP">
                                                        GBP
                                                    </option>
                                                    <option value="AUD">
                                                        AUD
                                                    </option>
                                                </select>
                                                <CustomSelectArrows />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 md:gap-0">
                                        <label
                                            htmlFor="lastName"
                                            className="md:hidden block text-md font-bold text-gray-700"
                                        >
                                            Future Listings
                                        </label>
                                        <div className="w-full font-medium">
                                            <div className="relative">
                                                <select
                                                    value={futureListing}
                                                    onChange={(e) =>
                                                        setProductListings({
                                                            ...productListings,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="select"
                                                    name="futureListing"
                                                >
                                                    <option value="7">7</option>
                                                    <option value="10">
                                                        10
                                                    </option>
                                                </select>
                                                <CustomSelectArrows />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 md:gap-0">
                                        <label
                                            htmlFor="shippingMethod"
                                            className="md:hidden block text-md font-bold text-gray-700"
                                        >
                                            Shipping Method
                                        </label>
                                        <div className="w-full font-medium">
                                            <div className="relative">
                                                <select
                                                    value={shippingMethod}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="select"
                                                    name="shippingMethod"
                                                >
                                                    <option value="free shipping">
                                                        Free Shipping
                                                    </option>
                                                    <option value="pickup in store">
                                                        Pick up in store
                                                    </option>
                                                    <option value="shipping">
                                                        Shipping
                                                    </option>
                                                </select>
                                                <CustomSelectArrows />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-1 gap-4 w-full">
                            <div className="md:pt-[1rem] hidden lg:flex flex-col text-[#1E293B] text-[16px] p-6 gap-12 bg-[#F8FAFC] rounded-lg">
                                <div>Postal Code</div>
                                <div>Country</div>
                                <div>Currency</div>
                                <div>Future Listings</div>
                                <div>Shipping Method</div>
                            </div>
                            <div className="hidden lg:flex  flex-col text-[#1E293B] text-[16px] p-6 md:p-3 gap-5">
                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="md:hidden  block mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-indigo-500 h-20 text-sm md:text-base"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        value={postalCode}
                                        name="postalCode"
                                        onChange={(e) =>
                                            setUserLocation({
                                                ...userLocation,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        className="w-[30%] h-[2.3rem] rounded-lg px-4 py-2 border border-gray-300  focus:outline-none focus:ring-indigo-500 text-sm md:text-base"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="country"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <div className=" font-medium cursor-pointer relative">
                                        <select
                                            className="select"
                                            name="country"
                                            placeholder="Enter your country"
                                            value={country}
                                            onChange={(e) =>
                                                setUserLocation({
                                                    ...userLocation,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            {/* <option value="" disabled hidden>
                          Select your country.
                        </option> */}

                                            {countryData.map(
                                                (country, index) => {
                                                    const { name } = country;
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={name}
                                                        >
                                                            {name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                        <CustomSelectArrows />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="currency"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Currency
                                    </label>
                                    <div className="w-full font-medium  gap-2 relative">
                                        <div className="relative">
                                            <select
                                                value={currency}
                                                onChange={(e) =>
                                                    setUserLocation({
                                                        ...userLocation,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="currency"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="CAD">CAD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                                <option value="AUD">AUD</option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="futureListing"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Future Listungs
                                    </label>
                                    <div className="w-full font-medium">
                                        <div className="relative">
                                            <select
                                                value={futureListing}
                                                onChange={(e) =>
                                                    setProductListings({
                                                        ...productListings,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="futureListing"
                                            >
                                                <option value="7">7</option>
                                                <option value="10">10</option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 md:gap-0">
                                    <label
                                        htmlFor="shippingMethod"
                                        className="md:hidden block text-md font-bold text-gray-700"
                                    >
                                        Shipping Method
                                    </label>
                                    <div className="w-full font-medium">
                                        <div className="relative">
                                            <select
                                                value={shippingMethod}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="select"
                                                name="shippingMethod"
                                            >
                                                <option value="free shipping">
                                                    Free Shipping
                                                </option>
                                                <option value="pickup in store">
                                                    Pick up in store
                                                </option>
                                                <option value="shipping">
                                                    Shipping
                                                </option>
                                            </select>
                                            <CustomSelectArrows />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div>
                    <button
                        type="submit"
                        className="w-[10rem] bg-[#272264] p-4 rounded-md text-white"
                    >
                        {loading ? <Preloader /> : "Save Changes"}
                    </button>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default EbayProfile;
