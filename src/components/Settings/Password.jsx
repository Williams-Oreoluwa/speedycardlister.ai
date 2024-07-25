import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsCheck2 } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import Preloader from "../Loader";
import axios from "axios";
import { baseURL } from "../../api/axios";

const changePasswordEndpoint = "auth/change-password";

const Password = () => {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
    const [errMsg, setErrMsg] = useState(false);
    const [pwd, setpwd] = useState("");
    const [user] = useState("");
    const [pwdFocus, setpwdFocus] = useState(false);
    const [matchpwd, setMatchpwd] = useState("");
    const [currentpwd, setCurrentpwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lengthVal, setlengthValue] = useState(false);
    const [numberVal, setNumberValue] = useState(false);
    const [specialVal, setSpecialValue] = useState(false);
    const [upperVal, setUpperValue] = useState(false);
    const [showEye, setShowEye] = useState(false);
    const [showEyeConf, setShowEyeConf] = useState(false);
    const [showEyeCurr, setShowEyeCurr] = useState(false);
    const [validpwd, setValidpwd] = useState(false);
    const displayEye = () => {
        setShowEye(!showEye);
    };

    const displayEyeConf = () => {
        setShowEyeConf(!showEyeConf);
    };

    const displayEyeCurr = () => {
        setShowEyeCurr(!showEyeCurr);
    };

    //   useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    //   }, [user]);

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

    const showCurrentPassword = () => {
        if (currentpwd) {
            displayEyeCurr();
        }
        const getInput = document.querySelector("#current-password");
        if (getInput.type === "password") {
            return (getInput.type = "text");
        } else {
            return (getInput.type = "password");
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

    const showConfirmedPassword = () => {
        displayEyeConf();
        const getInput = document.querySelector("#confirmPassword");
        if (getInput.type === "password") {
            return (getInput.type = "text");
        } else {
            return (getInput.type = "password");
        }
    };

    const success = () => {
        toast.success("Details Saved!");
    };

    const showSuccessToast = () => {
        success();
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const error = () => toast.error("Oops!! wrong password.");
    const showErrorToast = () => {
        error();
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.error("No access token found");
                return;
            }

            const apiUrl = `${baseURL}/v1/${changePasswordEndpoint}`;

            const response = await axios.patch(
                apiUrl,
                {
                    oldPassword: currentpwd,
                    newPassword: pwd,
                    confirmPassword: matchpwd,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            // console.log(response)
            setCurrentpwd("");
            setpwd("");
            setMatchpwd("");
            showSuccessToast();
        } catch (err) {
            console.error(
                "Error updating profile:",
                err.response ? err.response.data : error
            );
            showErrorToast();
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col md:flex-row gap-[26px]">
            <div className="hidden md:block flex-shrink-0">
                <img
                    src="/Password Illustration.png"
                    alt=""
                    className="object-cover w-[200px] h-[200px]"
                />
            </div>

            <form
                onSubmit={handlePasswordUpdate}
                className="w-full md:max-w-[420px]"
            >
                <div className="flex gap-4 flex-col">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="label">
                            Current Password
                        </label>
                        <div className="password-container">
                            <input
                                required
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                className="settingsInput w-full"
                                type="password"
                                id="current-password"
                                value={currentpwd}
                                onChange={(e) => setCurrentpwd(e.target.value)}
                                onBlur={() => setMatchFocus(false)}
                            />

                            <span onClick={showCurrentPassword}>
                                {showEyeCurr ? (
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
                                )}
                            </span>
                        </div>
                    </div>

                    <div className=" text-[#1E293B]">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className="leading-[28.18px] text-[16px] font-bold"
                            >
                                New Password
                            </label>
                            <div className="password-container">
                                <input
                                    type="password"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setpwd(e.target.value)}
                                    required
                                    onFocus={() => setpwdFocus(true)}
                                    onBlur={() => setpwdFocus(false)}
                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    className="settingsInput w-full"
                                />
                                <span onClick={showPassword}>
                                    {showEye ? (
                                        <img
                                            src="/Icons/eye Visible.png"
                                            className="w-[18.58px] h-[18.58px] fa-eye"
                                            alt="icon"
                                        />
                                    ) : (
                                        <img
                                            src="/Icons/Eye Hidden.png"
                                            alt="icon"
                                            className="w-[18.58px] h-[18.58px] fa-eye"
                                        />
                                    )}
                                </span>
                            </div>

                            {pwd ? (
                                <main className="w-full py-2 ">
                                    <div className="bg-[#F1F5F9] p-4 rounded-md flex flex-col gap-2 text-sm">
                                        {lengthVal ? (
                                            <div className="flex items-center justify-start gap-3 text-[#1E293B] ">
                                                <span>
                                                    <BsCheck2 />
                                                </span>
                                                <h2>
                                                    Minimum of 8 characters.
                                                </h2>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-start gap-3 text-red-600">
                                                <span>
                                                    <CgClose />
                                                </span>
                                                <h2>
                                                    Minimum of 8 characters.
                                                </h2>
                                            </div>
                                        )}
                                        {numberVal ? (
                                            <div className="flex items-center justify-start gap-3 text-[#1E293B] ">
                                                <span>
                                                    <BsCheck2 />
                                                </span>
                                                <h2>At least one number.</h2>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-start gap-3 text-red-600">
                                                <span>
                                                    <CgClose />
                                                </span>
                                                <h2>At least one number.</h2>
                                            </div>
                                        )}
                                        {specialVal ? (
                                            <div className="flex items-center justify-start gap-3 text-[#1E293B] ">
                                                <span>
                                                    <BsCheck2 />
                                                </span>
                                                <h2>
                                                    At least one special
                                                    character.
                                                </h2>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-start gap-3 text-red-600">
                                                <span>
                                                    <CgClose />
                                                </span>
                                                <h2>
                                                    At least one special
                                                    character.
                                                </h2>
                                            </div>
                                        )}
                                        {upperVal ? (
                                            <div className="flex items-center justify-start gap-3 text-[#1E293B] ">
                                                <span>
                                                    <BsCheck2 />
                                                </span>
                                                <h2>
                                                    At least one upper case.
                                                </h2>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-start gap-3 text-red-600">
                                                <span>
                                                    <CgClose />
                                                </span>
                                                <h2>
                                                    At least one upper case.
                                                </h2>
                                            </div>
                                        )}
                                    </div>
                                </main>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className=" text-[#1E293B]  ">
                        <label htmlFor="password" className="label">
                            Confirm Password
                        </label>

                        <div className="mt-2">
                            <div className="password-container">
                                <input
                                    required
                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    className="settingsInput w-full"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(e) =>
                                        setMatchpwd(e.target.value)
                                    }
                                    value={matchpwd}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />

                                <span onClick={showConfirmedPassword}>
                                    {showEyeConf ? (
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
                                    )}
                                </span>
                            </div>
                            <p
                                id="confirmnote"
                                className={
                                    matchFocus && !validMatch
                                        ? "instructions "
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} /> Must
                                match the first password input field.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={
                        lengthVal && numberVal && specialVal && matchpwd === pwd
                            ? false
                            : true
                    }
                    className=" mt-[24px] flex items-center justify-center text-[14px] w-full md:max-w-[172px] max-w-[152px]  md:w-[220px] py-3 px-6 border border-transparent rounded-md shadow-sm text-sm text-white bg-[#272264] hover:bg-[#2b2758] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold"
                >
                    {loading ? <Preloader /> : "Save Changes"}
                </button>
                <Toaster />
            </form>
        </div>
    );
};

export default Password;
