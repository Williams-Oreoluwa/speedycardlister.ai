import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, json } from "react-router-dom";
import Preloader from "../../components/Loader";
import axios from "axios";
import { baseURL } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const resetPasswordEndpoint = "auth/reset-password";
const USER_REGEX = /^[a-zA-Z][A-z0-9-_]{3,10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const NewPassword = () => {
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [user] = useState("");
  const [validName, setValidName] = useState(false);
  const [pwd, setpwd] = useState("");
  const [validpwd, setValidpwd] = useState(false);
  const [pwdFocus, setpwdFocus] = useState(false);
  const [matchpwd, setMatchpwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lengthVal, setlengthValue] = useState(false);
  const [numberVal, setNumberValue] = useState(false);
  const [specialVal, setSpecialValue] = useState(false);
  const [upperVal, setUpperValue] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [showEyeConf, setShowEyeConf] = useState(false);

  const displayEye = () => {
    setShowEye(!showEye);
  };

  const displayEyeConf = () => {
    setShowEyeConf(!showEyeConf);
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidpwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchpwd);
  }, [pwd, matchpwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchpwd]);

  const showPassword = () => {
    if (pwd) {
      displayEye();
    }
    const getInput = document.querySelector("#password");
    if (getInput.type === "password") {
      return (getInput.type = "text");
    } else {
      return (getInput.type = "password");
    }
  };

  const showConfirmPassword = () => {
    if (matchpwd) {
      displayEye();
    }
    const getInput = document.querySelector("#confirm-password");
    if (getInput.type === "password") {
      return (getInput.type = "text");
    } else {
      return (getInput.type = "password");
    }
  };

  const displayText = () => {
    showConfirmPassword();
    showPassword();
  };

  const email = localStorage.getItem("email");
  const code = localStorage.getItem("code");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `${baseURL}/v1/${resetPasswordEndpoint}`,
        JSON.stringify({
          email,
          password: pwd,
          confirmPassword: matchpwd,
          code,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMatchpwd("");
      setpwd("");
      setSuccess(true);
      navigate("/success");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Email or Password Incorrect");
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };
  const track = () => {
    const atLeast8Char = /^.{8,}$/;
    const atLeast1Number = /\d/;
    const atLeast1SpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=]/;
    const atLeast1Uppercase = /[A-Z]/;

    if (atLeast8Char.test(pwd)) {
      setlengthValue(true);
    } else {
      setlengthValue(false);
    }

    if (atLeast1Number.test(pwd)) {
      setNumberValue(true);
    } else {
      setNumberValue(false);
    }

    if (atLeast1SpecialChar.test(pwd)) {
      setSpecialValue(true);
    } else {
      setSpecialValue(false);
    }
    if (atLeast1Uppercase.test(pwd)) {
      setUpperValue(true);
    } else {
      setUpperValue(false);
    }
  };
  useEffect(() => {
    track();
  }, [pwd]);
  return (
    <AuthPageLayout
      formTitle={"Reset Password"}
      formDes={"Create a new password for your account."}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
        {/* <div className="flex item-center justify-center text-[#1E293B]"></div> */}

        <input type="hidden" name="" value={email} />
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>

          <div className="password-container">
            <input
              type="password"
              id="password"
              onChange={(e) => setpwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setpwdFocus(true)}
              onBlur={() => setpwdFocus(false)}
              placeholder="********"
              className="input"
            />
            <span onClick={showPassword}>
              {/* {showEye ? (
                      <img
                        src="/Icons/eye Visible.png"
                        className="w-[18.58px] h-[18.58px] fa-eye"
                      />
                    ) : (
                      <img
                        src="/Icons/Eye Hidden.png"
                        alt=""
                        className="w-[18.58px] h-[18.58px] fa-eye"
                      />
                    )} */}
            </span>
          </div>
          {pwd ? (
            <main className="w-full py-2 text-xs md:text-sm">
              <div className="bg-[#F1F5F9] p-4 rounded-md flex flex-col gap-2">
                {lengthVal ? (
                  <div className="flex items-center justify-start gap-3 text-[#1E293B]">
                    <span>
                      <FaCheck />
                    </span>
                    <h2>Minimum of 8 characters.</h2>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-3 text-red-600">
                    <span>
                      <FaTimes />
                    </span>
                    <h2>Minimum of 8 characters.</h2>
                  </div>
                )}
                {numberVal ? (
                  <div className="flex items-center justify-start gap-3 text-[#1E293B]">
                    <span>
                      <FaCheck />
                    </span>
                    <h2>At least one number.</h2>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-3 text-red-600">
                    <span>
                      <FaTimes />
                    </span>
                    <h2>At least one number.</h2>
                  </div>
                )}
                {specialVal ? (
                  <div className="flex items-center justify-start gap-3 text-[#1E293B]">
                    <span>
                      <FaCheck />
                    </span>
                    <h2>At least one special character.</h2>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-3 text-red-600">
                    <span>
                      <FaTimes />
                    </span>
                    <h2>At least one special character.</h2>
                  </div>
                )}
                {upperVal ? (
                  <div className="flex items-center justify-start gap-3 text-[#1E293B]">
                    <span>
                      <FaCheck />
                    </span>
                    <h2>At least one upper case.</h2>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-3 text-red-600">
                    <span>
                      <FaTimes />
                    </span>
                    <h2>At least one upper case.</h2>
                  </div>
                )}
              </div>
            </main>
          ) : (
            ""
          )}
        </div>

        <div>
          <label htmlFor="password" className="label">
            Confirm Password
          </label>

          <div className="flex flex-col gap-1">
            <div className="password-container">
              <input
                required
                placeholder="********"
                className={`  ${
                  matchFocus && !validMatch
                    ? "confirm mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none"
                    : "input"
                }`}
                type="password"
                id="confirm-password"
                onChange={(e) => setMatchpwd(e.target.value)}
                value={matchpwd}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />

              <span onClick={showConfirmPassword}>
                {/* {showEyeConf ? (
                      <img
                        src="/Icons/eye Visible.png"
                        className="w-[18.58px] h-[18.58px] fa-eye"
                      />
                    ) : (
                      <img
                        src="/Icons/Eye Hidden.png"
                        alt=""
                        className="w-[18.58px] h-[18.58px] fa-eye"
                      />
                    )} */}
              </span>
            </div>
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions " : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
              password input field.
            </p>
          </div>
        </div>

        <input type="hidden" name="" value={code} />

        <div className="flex items-center justify-start gap-3">
          <input
            onClick={displayText}
            className="cursor-pointer"
            type="checkbox"
            name=""
            id=""
          />
          <h3>Show Password</h3>
        </div>

        <button
          disabled={
            lengthVal && numberVal && specialVal && matchpwd === pwd
              ? false
              : true
          }
          className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#2b2758] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Preloader /> : "Continue"}
        </button>
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-4 text-center font-bold text-[#272264] text-sm md:text-base"
        >
          <FaArrowLeft />
          Back to Login
        </Link>
      </form>
    </AuthPageLayout>
  );
};

export default NewPassword;
