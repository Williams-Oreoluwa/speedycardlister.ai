import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { baseURL } from "../api/axios";
import { Modal } from "react-responsive-modal";
import SignUpModal from "../Pages/SignUpModal/ModalComponent";
import { RxValue } from "react-icons/rx";

export const Globalcontext = createContext();

export const GlobalState = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);

  //Check ebay status

  const [ebayTokens, setEbayTokens] = useState("");
  const [ebayStatus, setEbayStatus] = useState(null);

  const handleEbayStatus = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/auth/ebay-login-status`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setEbayStatus(true);
    } catch (error) {
      setEbayStatus(false);
    }
  };

  useEffect(() => {
    handleEbayStatus();
  }, []);

  console.log(ebayStatus);

  // console.log(ebayStatus);

  const ebayLogin = async () => {
    

    try {
      const response = await axios.get(
        `${baseURL}/v1/auth/ebay-login`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setEbayTokens(response.data.data);

      
    } catch (error) {
      console.error(error.response ? error.response.data : error);
    }
  };

  const retrieveEbay = (value) => {
    console.log(value);
    if (value === false) {
      ebayLogin();
    } 
    return
  };

  useEffect(() => {
    retrieveEbay(ebayStatus);
  }, [ebayStatus]);

  //console.log(ebayTokens);

  //Get User eBay Profile
  const [userLocation, setUserLocation] = useState({
    address: "",
    postalCodeValue: "",
    country: "",
    currency: "",
  });

  const [productListings, setProductListings] = useState({
    listingType: "",
    listingDuration: "",
    weightMajor: "",
    weightMinor: "",
    futureListing: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    dispatchTimeMax: "",
    shippingMethod: "",
  });

  //Pop up Logic
  const [shippingTime, setShippingTime] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [listingType, setListingType] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [majorWeight, setMajorWeight] = useState("");
  const [minorWeight, setMinorWeight] = useState("");
  const [listingDuration, setListingDuration] = useState("");
  const [futureListing, setFutureListings] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [auction, setAuction] = useState(false);
  const [bestOffer, setBestOffer] = useState(false);
  const [countries, setCountries] = useState("");
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const [controlModal, setControlModal] = useState();
  const onOpenModal = () => {
    setOpen(true);
    setControlModal(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setControlModal(false);
  };

  const openSignUpModal = useCallback(() => {
    setTimeout(() => {
      setControlModal(true);
      onOpenModal();
    }, 3000);
   
  }, [controlModal]);

  const settingsSignUpModal = useCallback(() => {
    setControlModal(true);
    onOpenModal();
  }, [controlModal]);

  const switchPage = () => {
    setPage((currPage) => currPage + 1);
  };

  const [isProfileCompleted, setIsProfileCompleted] = useState(100);

  const handleUserProfile = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsProfileCompleted(response.data.data.acctSetupProgress);
      setUserLocation(response.data.data.location);
      setProductListings(response.data.data.productListing);
      setShippingInfo(response.data.data.shippingInfo);
    } catch (error) {
      console.error(error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  useEffect(() => {
    handleProfileCompletion(isProfileCompleted);
  }, [isProfileCompleted]);

  function handleProfileCompletion(data) {
    if (data < 100) {
      openSignUpModal();
    }
  }

  const handleProfileCompleted = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const apiUrl = `${baseURL}/v1/user/complete-profile`;

      const response = await axios.patch(
        apiUrl,
        {
          stage1: {
            address: locationValue,
            postalCode,
            country: countries,
            currency: currencyValue,
          },
          stage2: {
            listingType,
            listingDuration,
            weightMajor: majorWeight,
            weightMinor: minorWeight,
            futureListing,
          },
          stage3: {
            dispatchTimeMax: shippingTime,
            shippingMethod: shippingMethod,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      switchPage();

      // showSuccessToast();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
      // showErrorToast();
    }
    setLoader(false);
  };

  //subscription

  //ebay Login logic

  const [isLoggin, setIsLoggin] = useState(false);
  const [profile, setProfile] = useState([]);

  const modal = {
    delete: false,
    moveCardError: false,
  };
  const [showModal, setshowModal] = useState(modal);
  const [auth, setAuth] = useState({});

  const handleOpenModal = (id) => {
    setshowModal((prev) => ({ ...prev, [id]: true }));
  };
  const handleCloseModal = (id) => {
    setshowModal((prev) => ({ ...prev, [id]: false }));
  };

  // Editing Logic
  const editableComponent = {
    descriptionPrice: false,
    table: false,
    card: false,
  };

  const isFocusComponents = {
    descPricesFocus: false,
    tableFocus: false,
    cardFocus: false,
  };

  const [isEditing, setIsEditing] = useState(editableComponent);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFocus, setIsFocus] = useState(isFocusComponents);
  const [isSuccessFull, setIsSuccessfull] = useState(false);
  const [moveToMarket, setMoveToMarket] = useState({});

  const handleEditing = (id) => {
    setIsEditing((prev) => ({ ...prev, [id]: true }));
    console.log("isEditing", isEditing);
    setIsDisabled(false);
  };

  const tableHandleChange = (event) => {
    const { name, value } = event.target;
    setTableValue((tableValue) => ({ ...tableValue, [name]: value }));
  };

  const tableHandleChange2 = (ev, index) => {
    const value = ev.target.value;
    const newTableItems = [...tableValue2];
    // console.log("newTableItems", newTableItems);
    newTableItems[index].value = value;
    setTableValue2(newTableItems);
  };
  const handleOnFocus = (id) => {
    setIsFocus({ [id]: true });
  };

  const handleDoneEditing = (id) => {
    const newIsEditing = (isEditing) => ({ ...isEditing, [id]: false });
    console.log("new", newIsEditing);
    setIsEditing(newIsEditing);
  };

  const moveCardToMarket = async (item) => {
    try {
      const apiUrl = `
        ${baseURL}/v1/cards/move-to-marketplace`;
      const data = {
        card_id: item,
      };

      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      setMoveToMarket(response.data);
      setIsSuccessfull(true);
      setLoading(true);
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      setMoveToMarket(error.response.data);
      // setIsSuccessfull(false);
    } finally {
      setLoading(false);
    }
  };

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [totalPendingCards, setTotalPendingCards] = useState(0);
  const [totalSentCards, setTotalSentCards] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const [image, setImage] = useState("");

  const getTotalCardsCount = async () => {
    setLoading(true);
    try {
      const apiUrl = `${baseURL}/v1/cards/count`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const totalCardsRecord = response.data.data.totalCards;
      setTotalCards(totalCardsRecord);
    } catch (error) {
      console.error(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };
  const getPendingCardsCount = async () => {
    setLoading(true);
    try {
      const apiUrl = `${baseURL}/v1/cards/count?status=pending`;

      const response = await axios.get(
        apiUrl,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      setTotalPendingCards(response.data.data.totalPendingCards);
    } catch (error) {
      console.error(
        "error all cards",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
    }
  };
  const getSentCardsCount = async () => {
    setLoading(true);
    try {
      const apiUrl = `${baseURL}/v1/cards/count?status=sent`;

      const response = await axios.get(
        apiUrl,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      setTotalSentCards(response.data.data.totalSentCards);
    } catch (error) {
      console.error(
        "error all cards",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllCards = async () => {
    setLoading(true);
    try {
      const apiUrl = `${baseURL}/v1/cards`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setImage(response.data.data.cards[0].pictureDetails.imageUrl);
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      setAllCards(response.data.data.cards);
      console.log("item", response.data.data.cards);
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
    getAllCards();
    getPendingCardsCount();
    getSentCardsCount();
    getTotalCardsCount();
  }, [isLoggin]);

  let PageSize = 8;

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = () => {
    return searchResults != null
      ? searchResults?.slice(firstPageIndex, lastPageIndex)
      : allCards?.slice(firstPageIndex, lastPageIndex);
  };

  //side bar logic
  const [isOpen, setIsOpen] = useState(false);

  //Theme Toggle Logic

  // const storedValue = Number(localStorage.getItem("themeValue"));

  // const [themeValue, setThemeValue] = useState(
  //   parseInt(localStorage.getItem("themeValue")) || 0
  // );
  // const [value, setValue] = useState(storedValue);
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // const lightToggleTheme = () => {
  //   if (theme === "dark") {
  //     setTheme("light");

  //     setThemeValue(0);
  //   }
  // };
  // const darkToggleTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");

  //     setThemeValue(1);
  //   }
  // };
  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   localStorage.setItem("themeValue", themeValue);
  //   // document.body.className = theme;
  // }, [theme, themeValue]);

  // const switchTabs = (value) => {
  //   if (value === 0) {
  //     lightToggleTheme();
  //   } else if (value === 1) {
  //     darkToggleTheme();
  //   } else {
  //     throw new Error("Something went wrong");
  //   }

  //   setValue(value);
  // };

  // const [remember, setRemember] = useState(false);
  // localStorage.setItem("remember", remember);

  // const rememberMe = useCallback(() => setRemember(!remember), [remember]);

  // console.log(remember);

  //terms of agreement

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [currentPlan, setCurrentPlan] = useState({
    _id: "",
    plan: "",
    name: "",
    charge: "",
    no_of_scans: "",
    scan_count:'',
  });

  const [otherPlans, setOtherPlans] = useState([]);

  const getUserSubscription = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/subscriptions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

   
      setCurrentPlan(response.data.data.currentPlan)
      setOtherPlans(response.data.data.otherPlans)
      
      console.log(response)
    } catch (error) {
      console.error(error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    getUserSubscription();
  }, []);

  console.log(typeof otherPlans)

  let email = localStorage.getItem("accEmail");

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/auth/acct-verification/resend-otp`,
        JSON.stringify({
          email,
          otpPurpose: "verify-acct",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

     console.log(response);

    } catch (err) {
      if (!err) {
        setErrMsg("Failed response");
      } else if (err.response === 401) {
        setErrMsg("Email or Password Incorrect");
      } else if (err.response.status === 503) {
        setErrMsg("No Internet Connection...");
      } else {
        console.log("error");
      }
    }
  };

   

  return (
    <Globalcontext.Provider
      value={{
        email,
        resendOtp,
        otherPlans,
      currentPlan,
        handleProfileCompletion,
        setControlModal,
        ebayTokens,
        ebayStatus,
        setLoading,
        setUserLocation,
        setShippingInfo,
        setProductListings,
        userLocation,
        productListings,
        shippingInfo,
        isProfileCompleted,
        settingsSignUpModal,
        open,
        setOpen,
        onCloseModal,
        openSignUpModal,
        controlModal,
        handleProfileCompleted,
        loader,
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

        // login,
        // user,
        // ebayTokens,
        profile,
        setProfile,
        //remember,
        //rememberMe
        isModalOpen,
        toggleModal,
        isOpen,
        setIsOpen,
        // theme,
        // value,
        // switchTabs,
        auth,
        setAuth,
        handleOpenModal,
        handleCloseModal,
        showModal,
        tableHandleChange,
        handleDoneEditing,
        handleOnFocus,
        tableHandleChange2,
        handleEditing,
        isEditing,
        isFocus,
        isSuccessFull,
        isDisabled,
        setAllCards,
        setIsSuccessfull,
        setIsEditing,
        setIsFocus,
        currentTableData,
        currentPage,
        PageSize,
        allCards,
        setCurrentPage,
        firstPageIndex,
        lastPageIndex,
        loading,
        totalPendingCards,
        totalSentCards,
        totalCards,
        getAllCards,
        getPendingCardsCount,
        getSentCardsCount,
        getTotalCardsCount,
        moveCardToMarket,
        setSearchResults,
        moveToMarket,
        image,
        setImage,
        isLoggin,
        setIsLoggin,
      }}
    >
      {children}
    </Globalcontext.Provider>
  );
};

export default GlobalState;
