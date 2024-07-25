import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "react-phone-number-input/style.css";
import "react-phone-input-2/lib/style.css";
import { baseURL } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/Loader";
import { Formik, useFormik } from "formik";
import { Schema } from "../../Schemas/Schema";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

import PersonalInfo from "../../components/Register/PersonalInfo";

import TermsandConditions from "./Privacy";
import Terms from "./Terms";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const Register_URL = "auth/signup";

const Register = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [number, setNumber] = useState("");

  // const [page, setPage] = useState(0);
  const [lengthVal, setlengthValue] = useState(false);
  const [numberVal, setNumberValue] = useState(false);
  const [specialVal, setSpecialValue] = useState(false);
  const [upperVal, setUpperValue] = useState(false);

  // const FormTitles = [
  //   " Personal Information",
  //   "Location Information",
  //   "eBay Preferences",
  // ];

  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const termsOnOpenModal = () => setTermsOpen(true);
  const termsOnCloseModal = () => setTermsOpen(false);

  const success = () => {
    toast.success("Account successfully created!");
  };

  const showSuccessToast = () => {
    success();
  };

  const onSubmit = async (values, actions) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/v1/${Register_URL}`,
        JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      actions.resetForm();
      showSuccessToast();
      localStorage.setItem("accEmail", values.email);
      setTimeout(() => {
        navigate("/account-verification");
      }, 3000);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already exists");
      } else {
        setErrMsg("Registration Failed");
      }
    }
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Schema,
    onSubmit,
  });

  const track = () => {
    const atLeast8Char = /^.{8,}$/;
    const atLeast1Number = /\d/;
    const atLeast1SpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=]/;
    const atLeast1Uppercase = /[A-Z]/;

    if (atLeast8Char.test(formik.values.password)) {
      setlengthValue(true);
    } else {
      setlengthValue(false);
    }

    if (atLeast1Number.test(formik.values.password)) {
      setNumberValue(true);
    } else {
      setNumberValue(false);
    }

    if (atLeast1SpecialChar.test(formik.values.password)) {
      setSpecialValue(true);
    } else {
      setSpecialValue(false);
    }
    if (atLeast1Uppercase.test(formik.values.password)) {
      setUpperValue(true);
    } else {
      setUpperValue(false);
    }
  };
  useEffect(() => {
    track();
  }, [formik.values.password]);
  const [showEye, setShowEye] = useState(false);
  const displayEye = () => {
    setShowEye(!showEye);
  };
  const [showEyeConf, setShowEyeConf] = useState(false);

  const displayEyeConf = () => {
    setShowEyeConf(!showEyeConf);
  };

  const showPassword = () => {
    displayEye();
    const getInput = document.querySelector("#password");
    if (getInput.type === "password") {
      return (getInput.type = "text");
    } else {
      return (getInput.type = "password");
    }
  };

  const showConfirmedPassword = () => {
    displayEyeConf();
    const getInput = document.querySelector("#confirmPassword");
    if (getInput.type === "password") {
      return (getInput.type = "text");
    } else {
      return (getInput.type = "password");
    }
  };

  const removeError = () => {
    setErrMsg(false);
  };
  const [google, setGoogle] = useState("");

  const handleTerms = () => {
    setTerms(!terms);
  };

  const [user, setUser] = useState([]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // useEffect(() => {
  //     if (user) {
  //         axios
  //             .get(
  //                 `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //                 {
  //                     headers: {
  //                         Authorization: `Bearer ${user.access_token}`,
  //                         Accept: "application/json",
  //                     },
  //                 }
  //             )
  //             .then((res) => {
  //                 const googleToken = user.access_token;

  //                 const firstName = res.data.given_name;
  //                 const lastName = res.data.family_name;
  //                 let email = res.data.email;
  //                 let googleId = res.data.id;

  //                 googleSubmit(firstName, lastName, email, googleId);

  //                 setProfile(res.data);
  //             })
  //             .catch((err) => console.log(err));
  //     }
  // }, [user]);

  // const googleSubmit = async (firstName, lastName, email, googleId) => {
  //     try {
  //         const response = await axios.post(
  //             `${baseURL}/v1/auth/google_login`,
  //             JSON.stringify({
  //                 email,
  //                 firstName,
  //                 lastName,
  //                 googleId,
  //             }),
  //             {
  //                 headers: { "Content-Type": "application/json" },
  //                 withCredentials: true,
  //             }
  //         );
  //         console.log(response);
  //         const googleToken = response?.data?.data.token;
  //         localStorage.setItem("googleToken", googleToken);
  //         dispatch({ type: "clear-fields" });
  //         showSuccessToast();
  //         setTimeout(() => {
  //             navigate("/dashboard");
  //             window.location.reload();
  //         }, 2000);
  //     } catch (err) {
  //         if (!err) {
  //             setErrMsg("No Server Response");
  //         } else if (err.response.status === 401) {
  //             setErrMsg("Email or Password Incorrect");
  //         } else {
  //             setErrMsg("Login Failed");
  //         }
  //     }
  // };
  return (
    <>
      {/* <Modal
                classNames={{
                    overlay: "registerOverlay",
                    modal: "registerModal auth",
                }}
                open={open}
                onClose={onCloseModal}
                center
            >
                <TermsandConditions
                    terms={terms}
                    onOpenModal={onOpenModal}
                    agreeToTerms={agreeToTerms}
                    disagreeToTerms={disagreeToTerms}
                />
            </Modal> */}

      {/* <Modal
                classNames={{
                    overlay: "registerOverlay",
                    modal: "registerModal auth",
                }}
                open={termsOpen}
                onClose={termsOnCloseModal}
                center
            >
                <Terms
                    terms={terms}
                    termsOnOpenModal={termsOnOpenModal}
                    termsAgreeToTerms={agreeToTerms}
                    termsDisagreeToTerms={termsOnCloseModal}
                />
            </Modal> */}

      <AuthPageLayout
        formTitle={" Create Account"}
        formDes={"Create a Speedy Card Lister.AI account"}
      >
        {/* <div className="flex flex-col space-y-2  items-center justify-center">
                <div className="flex items-center justify-center gap-4">
                  <span
                    type="button"
                    onClick={() => setPage((currPage) => currPage - 1)}
                    className={`${
                      page === 0 ? "hidden" : "block"
                    } cursor-pointer flex items-center justify-center h-[3rem] w-[3rem] rounded-[50%] border-2 border-[#E2E8F0]`}
                  >
                    <BsArrowLeft />
                  </span>

                  <h2 className="text-[#1E293B] text-[1rem] tracking-widest">
                    {FormTitles[page]}
                  </h2>
                </div>

                <div className="grid grid-cols-3  gap-4 w-3/4 ">
                  <div
                    className={`${
                      page === 0 || page > 0 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                    }  rounded-lg  w-full h-2`}
                  ></div>
                  <div
                    className={`${
                      page === 1 || page > 1 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                    }  rounded-lg  w-full h-2`}
                  ></div>
                  <div
                    className={`${
                      page === 2 ? "bg-[#272264]" : "bg-[#E2E8F0]"
                    }  rounded-lg  w-full h-2`}
                  ></div>
                </div>
              </div> */}
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
          <div onClick={removeError}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="pt-3 space-y-4 flex flex-col"
        >
          <div className="w-full gap-4">
            {/* {PageDisplay()} */}

            <PersonalInfo
              formik={formik}
              showPassword={showPassword}
              showConfirmedPassword={showConfirmedPassword}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              number={number}
              setNumber={setNumber}
              lengthVal={lengthVal}
              numberVal={numberVal}
              specialVal={specialVal}
              upperVal={upperVal}
              showEye={showEye}
              showEyeConf={showEyeConf}
            />
          </div>

          <div className="flex ">
            <div
              // className={`flex gap-2 ${
              //   page === FormTitles.length - 1 ? "block" : "hidden"
              // }`}
              className="flex gap-2 items-start justify-center"
            >
              <input
                type="checkbox"
                className="cursor-pointer mt-1"
                value={terms}
                onClick={handleTerms}
              />
              <h4 className="text-[.9rem]">
                I agree to the{" "}
                <Link
                  to="/terms-of-agreement"
                  className="font-bold text-[#272264]"
                >
                  Terms of agreement
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="font-bold text-[#272264]">
                  Privacy policy
                </Link>{" "}
                of SpeedyCardLister.AI
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <button
                type="submit"
                // className={`${
                //   page === FormTitles.length - 1 ? "block" : "hidden"
                // } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={
                  formik.values.firstName &&
                  formik.values.lastName &&
                  formik.values.email &&
                  lengthVal &&
                  numberVal &&
                  specialVal &&
                  formik.values.password &&
                  terms &&
                  formik.values.confirmPassword === formik.values.password
                    ? false
                    : true
                }
              >
                {loading ? <Preloader /> : "Continue"}
              </button>
              {/* <button
                      type="button"
                      disabled={
                        page == 0 &&
                        formik.values.firstName &&
                        formik.values.lastName &&
                        number &&
                        formik.values.email &&
                        formik.values.password &&
                        formik.values.confirmPassword === formik.values.password
                          ? false
                          : true
                      }
                      onClick={() => setPage((currPage) => currPage + 1)}
                      className={`${
                        page < FormTitles.length - 2 ? "block" : "hidden"
                      } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      Continue
                    </button> */}
              {/* <button
                      type="button"
                      disabled={
                        page == 1 &&
                        postalCode &&
                        locationValue &&
                        selectedCountry
                          ? false
                          : true
                      }
                      onClick={() => setPage((currPage) => currPage + 1)}
                      className={`${
                        page === FormTitles.length - 2 ? "block" : "hidden"
                      } w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      Continue
                    </button> */}
            </div>
          </div>
        </form>
        <div className="pb-4 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center">
            <h2 className="text-[#475569] pt-3 text-[14px] leading-[20px] font-[400] gap-1 w-full flex items-center justify-center">
              Already have an account?{" "}
              <Link to="/login">
                {" "}
                <h2 className="text-[#272264] font-[600] text-[16px] leading-[20px]">
                  {" "}
                  Login
                </h2>{" "}
              </Link>
            </h2>
          </div>

          <div className="flex w-full items-center justify-center gap-3">
            <div className="h-[1px] w-full bg-[#E2E8F0] rounded-xl"></div>
            <h2 className="text-[14px] text-[#64748B]">OR</h2>
            <div className="h-[1px] w-full bg-[#E2E8F0] rounded-xl"></div>
          </div>

          {/* <a
                href={google}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              > */}
          <button
            onClick={googleLogin}
            type="button"
            className="w-full py-3 px-6 border bg-white border-[#E2E8F0] rounded-md shadow-sm text-sm font-medium text-[#1E293B] bg-transparent hover:bg-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <div className="flex items-center justify-center font-bold gap-3">
              {" "}
              <img src="/Social icon.png" alt="google logo" />
              Continue with Google
            </div>
          </button>
          {/* </a> */}
        </div>
      </AuthPageLayout>
    </>
  );
};

export default Register;
