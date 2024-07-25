import React from "react";
import { useState, useEffect, useContext } from "react";
// import ImageUpload from "./ImageUpload";
import axios from "axios";
// import Preloader from "../Loader";
// import { SettingsSkeleton } from "../Skeleton/Skeleton";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../api/axios";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
// import ThemeToggle from "../../components/Settings/ThemeToggle";
import { Globalcontext } from "../../Context/Context";

const profileEndPoint = "user/my-profile";
const editUserProfileEndpoint = "user/edit-profile";
const changePasswordEndpoint = "auth/change-password";
const ebayLoginEndpoint = "auth/ebay-login";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PersonalInfoSettings = () => {
  const accessToken = localStorage.getItem("accessToken");
 
  const [oldPassword, setOldPassword] = useState("");
  const [successProfile, setSuccessProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(false);
  const [pwd, setpwd] = useState("");
  const [validpwd, setValidpwd] = useState(false);
  const [pwdFocus, setpwdFocus] = useState(false);
  const [matchpwd, setMatchpwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [avatar, setAvatar] = useState({ imageUrl: "" });
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });
  const [ebayTokens, setEbayTokens] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const iWasClicked = () => {
    setClicked(true);
  };

  const getCurrentProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(`${baseURL}/v1/${profileEndPoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfile(response.data.data);
      setAvatar(response.data.data.avatar);
    } catch (err) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const { firstName, lastName, email, phoneNo } = profile;
  const { imageUrl } = avatar;

  useEffect(() => {
    setValidpwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchpwd);
  }, [pwd, matchpwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchpwd]);

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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const apiUrl = `${baseURL}/v1/${editUserProfileEndpoint}`;

      const response = await axios.patch(
        apiUrl,
        { firstName, lastName, email, phoneNo },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfile({ firstName: "", lastName: "", email: "", phoneNo: "" });

      showSuccessToast();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
      showErrorToast();
    }
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
        { oldPassword, newPassword: pwd, confirmPassword: matchpwd },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOldPassword("");
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

  // const showNewPassword = () => {
  //   const getNewInput = document.querySelector("#new-password");

  //   if (getNewInput.type === "password") {
  //     return (getNewInput.type = "text");
  //   } else {
  //     return (getNewInput.type = "password");
  //   }
  // };

  // const showConfirmPassword = () => {
  //   const getConfirmInput = document.querySelector("#confirm-password");

  //   if (getConfirmInput.type === "password") {
  //     return (getConfirmInput.type = "text");
  //   } else {
  //     return (getConfirmInput.type = "password");
  //   }
  // };
  // const showOldPassword = () => {
  //   const getOldInput = document.querySelector("#old-password");
  //   if (getOldInput.type === "password") {
  //     return (getOldInput.type = "text");
  //   } else {
  //     return (getOldInput.type = "password");
  //   }
  // };
  const ebayLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/v1/${ebayLoginEndpoint}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEbayTokens(response.data.data);
    } catch (error) {
      console.log("");
    }
  };

  useEffect(() => {
    ebayLogin();
  }, []);
 

  const {theme} = useContext(Globalcontext);

  return (
    <>
      <section  className="settings">
        {/* <ImageUpload
          showSuccessToast={showSuccessToast}
          Toaster={Toaster}
          image={imageUrl}
        />
        <br />
        <br />

        <div className={`flex flex-col gap-8 items-center justify-center pb-[2rem]  ${theme === "dark" ? "text-white" : "text-[#A1A1A1]"}`}>
          <h1 className="capitalize  text-center  bg-gradient-to-r from-[#4eafdc] to-[#6454D6] inline-block text-transparent bg-clip-text">
            {`${
              status
                ? "You have successfully signed in to ebay."
                : "sign in to ebay to start moving cards."
            }`}
          </h1>
          {!status ? (
            <a
              href={ebayTokens}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1.5rem] relative p-4 shadow-lg  bg-gradient-to-r from-[#a5dcf5] to-[#a499f1] rounded-lg animate-bounce"
            >
              <span className="text-[#f06565]">e</span>
              <span className="text-[blue]">b</span>
              <span className="text-[#f0f05d]">a</span>
              <span className="text-[green]">y</span>
            </a>
          ) : (
            <button
              disabled
              className="text-[1.5rem] relative p-4 shadow-lg  bg-gradient-to-r from-[#a5dcf5] to-[#a499f1] rounded-lg animate-bounce"
            >
              <span className="text-[#f06565]">e</span>
              <span className="text-[blue]">b</span>
              <span className="text-[#f0f05d]">a</span>
              <span className="text-[green]">y</span>
            </button>
          )}
        </div>
        <div>
          <div   className="flex flex-col ">
            <div className="py-[2.5rem]">
            <h2 className={`text-[1rem]  font-semibold ${theme === 'dark' ? 'text-white' : ''} `}>Change Theme</h2>
            <div id="personal-info" className="duration-300 ease-linear py-[1.5rem]">
              <ThemeToggle />
            </div>

            </div>
           

            <div className="flex items-center justify-between w-full mb-4 gap-8">
              <h2 className={`text-[1rem] font-semibold  ${theme === 'dark' ? 'text-white' : ''}`}>
                Personal Information
              </h2>
              <div className="flex gap-2 text-[#958ae7]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                Edit
              </div>
            </div>
            {loading ? (
              <SettingsSkeleton />
            ) : (
              <div className="w-full pb-[1rem] md:hidden lg:hidden xl:hidden 2xl:hidden">
                <img
                  className="w-full rounded-xl h-[40vh]"
                  src={
                    imageUrl
                      ? avatar.imageUrl
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACUCAMAAAANv/M2AAAAM1BMVEXk5ueutLenrrHg4uTn6eqqsLSxt7rKztDq7O3Hy83X2tvQ09XT1tjBxsi5vsHd4OGjqa6G6AVlAAAEW0lEQVR4nO2c6XKzOgyGbSMveOX+r/Yz5CRNcih4w3JneP6k05lM32qEZGuBkJubm5ubm5ubm5ubm5u/BKxgi0hlVToFbeUcMXpaf4Wt6QSAYGdHGWN8JX4IL+00ss0VMU5QTj/h1Ds7qrlBSUF3if+GMGpA2UAM+7bxO4yb4awN1h9J3mR7PZRqIPOJ4s1LhMQW+gZMPkHzih/G1qDPPOPH2GzCVvsflqVqXmXbIYxtku38YADVYDM1U4oeREDn+MaDZcJVDVO2nSMCWXVqrPvEYUqGucTQMYQgZhmwRZIjLOA5yC+nugS8QpIMssw5NlMbJFOr/Gj3g0DS7Co0UzqjmDpUaaY+IGguDXdP4k0GgbK88iPa95dcHqOfMAT/qPSOaGqER7E8sbzonmBCTZB+sPTWXJMNn3DZ2T9UZezY6H0AqUrhT0RnS0MT0Z2DXnqp44i+V1wwLTTTvudTlVK7O6dv+Kg8lj7pmxObRLx4K79F36Jv0TWi/2T0qL4CbPSN05BbSd+nc8WmwR2Adi+vw9JAs+jcNfqT5+k/eXPJ7mntwG1nzSTUi+5+GyfktIF/iuhfWK+vMPWuIKwNxFpD896SV2qrphh9OZCVlsbpkdeVID3KEIWqK+chtbegRjRSdyueT8sPIAxvfqI4wXC0ji2BUPwsYkkmFWEPpR33osxBUOc9CuvUWJHjxVQgGnvwihCd+zD2rv/vknncE+gTbhsh52bOEQeBPkn3kN4X8N8B4hIjH3Ks+8L+bxVgxzNE9+v3MRD8WcRmCAMeZyh9mB2FD2hnpANAGS92dXMunB511wWINp5/uwnjXobhNi/eiNKCdXRh2/oIY8sinJnG34SK3q1UlG6MsSH+PL7elW0/DtQKjL8rB6tZ1w05Y+S2JCelNNbqMMGQBl8NG53Zi8gzZPxEOyG8k3ogV9n2D7V0bGH8KE5zvjAx2+nxDVzJ5LF/eKj3TXkMf85ozP1EgCB39g/PhHPhZ0tQ0iMoIkVFNc+F3h4e/5z2h+uH5zA6Tx2TTnRkeXqmS4BTpzttvABot38uKpHtu+yDqqnNAMILb69+JoG08ItPGNdXWhvCnBiQ8+DOXhW5Qcn63uFvuGuMDbXtrGPEBa4NIJs78yfMty7jwNT+AfyGU91W8/FNu5nquaFm1WaGN4F2e+XgLneNJ632ymHqp3mlSSV46uHO77TomV8anffgujZiwyV5+5il1kN6+8aDOg9pfAxNRVSkmdo9yQrV5Zorpgwq4aW9GWgzBFsGKx2t7h7sPigKIdBm/6YUXjLjVD93V6u65MiHE6HfVWf30Ave6tKc7FlUha85ezircuauEbnBusGCdQOyziCNdiSryev/Ix2UvskZaIHsEZ+LyIrVQzyGNPPNFOiJ5UlOgsHW+iJjbyDrXXLXkpwVIXUiqQNLqmg1SOxYSX7dimqxAdeI9FWpcVyacpfoHwXv7buO1JF2s7BxSD3pTUOxI/AfhLE8pc2fnt0AAAAASUVORK5CYII="
                  }
                  alt=""
                />
              </div>
            )}

            <p className="mb-6 text-[#A1A1A1]">
              Click on any input field to edit your profile.
            </p>
          </div>

          <form
            action=""
            onSubmit={handleProfileUpdate}
            className="w-full flex flex-col gap-6"
          >
            <div className="flex flex-col md:grid  md:gap-8 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 xl:gap-8 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 p-2">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="firstName"
                    id=""
                    placeholder="Enter first name"
                    className= {`capitalize  focus:outline-none form-input h-[3rem] w-full  shadow-md rounded-md ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                  />
                </div>

                <div className="flex flex-col gap-5 p-2">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="lastName"
                    id=""
                    placeholder="Enter last name"
                    className= {`capitalize focus:outline-none form-input h-[3rem] w-full  shadow-md rounded-md ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 p-2">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="email"
                    id=""
                    placeholder="Enter email"
                    className= {`focus:outline-none form-input h-[3rem] w-full  shadow-md rounded-md ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                  />
                </div>
                <div className="flex flex-col gap-5 p-2">
                  <label htmlFor="phoneNo">Phone-number</label>
                  <input
                    type="tel"
                    value={phoneNo}
                    data-intl-tel-input-id="+1"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="phoneNo"
                    id=""
                    placeholder="Enter Number"
                    className= {`focus:outline-none form-input h-[3rem] w-full  shadow-md rounded-md ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={iWasClicked}
              className="p-4 rounded-md text-[white] bg-[#958ae7]  w-full md:w-[8rem] lg:w-[8rem] xl:w-[8rem] 2xl:w-[8rem]"
            >
              {loading &&
              clicked &&
              (firstName || lastName || phoneNo || email) ? (
                <Preloader />
              ) : (
                "Save"
              )}
            </button>
            <Toaster />
          </form>
        </div>
        <div id="password">
          <div className="flex flex-row items-center justify-between w-full mb-12 mt-8 ">
            <h2 className={`text-[1rem] font-semibold  ${theme === 'dark' ? 'text-white' : ''}`}>Password</h2>

            <div className="flex gap-2 text-[#958ae7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </div>
          </div>
          <form
            action=""
            onSubmit={handlePasswordUpdate}
            className="w-full flex flex-col gap-6 "
          >
            <div id="password" className={`flex flex-col gap-2 p-4 ${theme === 'dark' ? 'bg-[#a1a0a011] text-[white]' : 'bg-[#F5F1FF]'} `}>
              <h2>Rules for Passwords</h2>
              <h4>
                To create a new password, you have to meet all of the following
                requirements:
              </h4>
              <div className="flex flex-col md:grid md:grid-cols-2  lg:grid lg:grid-cols-2  xl:grid xl:grid-cols-2  2xl:grid 2xl:grid-cols-2 gap-2 ">
                <ul className="list-disc pl-4">
                  <li>Minimum of 8 characters.</li>
                  <li>At least one special character.</li>
                </ul>
                <ul className="list-disc pl-4 md:pl-0 lg:pl-0 xl:pl-0 2xl:pl-0">
                  <li>At least one number.</li>
                  <li>Can't be same as another password.</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:grid  md:gap-8 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 xl:gap-cols-2 xl:gap-8 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="">Current Password</label>
                  <div className="password-container">
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      name=""
                      id="old-password"
                      placeholder="Enter current password"
                      className= {`email-input h-[3rem] shadow-md focus:outline-none ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 fa-eye"
                      onClick={showOldPassword}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="">New Password</label>
                  <div className="password-container">
                    <input
                      type="password"
                      onChange={(e) => setpwd(e.target.value)}
                      value={pwd}
                      name=""
                      id="new-password"
                      placeholder="Enter new password"
                      required
                      onFocus={() => setpwdFocus(true)}
                      onBlur={() => setpwdFocus(false)}
                      className= {`email-input h-[3rem] shadow-md focus:outline-none  ${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} `}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 fa-eye"
                      onClick={showNewPassword}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="">Confirm Password</label>
                  <div className="password-container">
                    <input
                      type="password"
                      onChange={(e) => setMatchpwd(e.target.value)}
                      value={matchpwd}
                      name=""
                      id="confirm-password"
                      placeholder="Confirm password"
                      className={`${theme === "dark" ? "bg-[#a1a0a011] text-slate-200" : "bg-white"} ${
                        matchFocus && !validMatch
                          ? "email-input h-[3rem] shadow-md   confirm mt-1 px-4 py-2  rounded-md w-full focus:outline-none"
                          : "email-input h-[3rem] shadow-md  mt-1 px-4 py-2 b rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      }`}
                      
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 fa-eye"
                      onClick={showConfirmPassword}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions " : "offscreen"
                    }
                  >
                    Must match your new password field.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 p-2">
                  <button
                    disabled={pwd !== matchpwd ? true : false}
                    className={`p-4 text-[white] rounded-md bg-[#958ae7] w-full md:w-[8rem] lg:w-[8rem] xl:w-[8rem] 2xl:w-[8rem]`}
                  >
                    {loading && pwd && matchpwd && oldPassword ? (
                      <Preloader />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div> */}
      </section>
    </>
  );
};

export default PersonalInfoSettings;
