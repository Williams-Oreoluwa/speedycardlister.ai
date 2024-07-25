import React, { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "../Loader";
import { SettingsSkeleton } from "../Skeleton/Skeleton";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../api/axios";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import { ExportCurve } from "iconsax-react";

const editUserProfileEndpoint = "user/personal-information";
const profileEndPoint = "user/dashboard";

const Info = () => {
    //Edit Personal Information
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgError, setError] = useState("");
    const [infoClicked, setInfoClicked] = useState(false);
    const [imageClicked, setImageClicked] = useState(false);
    const [avatar, setAvatar] = useState({ imageUrl: "" });
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const { firstName, lastName, email } = userProfile;
    const { imageUrl } = avatar;
    const [loading, setLoading] = useState(false);

    const [imageLoading, setImageLoading] = useState(false);
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        setImageClicked(true);
        setImageLoading(true);

        try {
            const formData = new FormData();

            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                return;
            }

            const apiUrl = `${baseURL}/v1/user/upload/profile-image`;

            const response = await axios.patch(
                apiUrl,
                { dp: selectedFile },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            showSuccessToast();
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            // console.log("Image uploaded successfully:", response.data);
        } catch (error) {
            setError(
                "Error uploading image:",
                error.response ? error.response.data : error
            );
        }

        setImageLoading(false);
    };

    const handleProfile = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await axios.get(`${baseURL}/v1/user/profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            setLoading(true);
            setAvatar(response.data.data.avatar);
            setUserProfile(response.data.data);
        } catch (err) {
            console.log("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleUpload();
    }, [selectedFile]);

    useEffect(() => {
        handleProfile();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.error("No access token found");
                return;
            }

            const apiUrl = `${baseURL}/v1/${editUserProfileEndpoint}`;

            const response = await axios.patch(
                apiUrl,
                { firstName, lastName, email },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setUserProfile({ firstName: "", lastName: "", email: "" });
            setInfoClicked(true);
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
    return (
        <section className="w-full">
            <div className="flex  flex-col md:flex-row  md:items-start md:justify-start  gap-6 md:gap-12 ">
                <div className=" mx-auto md:mx-0 w-full max-w-[178px]">
                    <img
                        src={
                            imageUrl ||
                            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                        }
                        alt="user profile"
                        className="rounded-full w-20 h-20 sm:w-[120px] sm:h-[120px] object-cover mx-auto"
                    />

                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none", cursor: "pointer" }}
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className="mt-4 block border border-[#272264] rounded-lg md:py-3 py-[11px] px-4 md:px-3  text-[#272264] font-semibold cursor-pointer  "
                    >
                        {imageLoading && imageClicked ? (
                            <div className="flex items-center">
                                {/* <ExportCurve size="24" color="#FF8A65" /> */}
                                <h2 className=" flex justify-center items-center w-fit mx-auto flex-shrink-0">
                                    <Preloader />
                                </h2>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-center justify-center">
                                <ExportCurve size="24" color="#272264" />
                                <h2 className="flex-shrink-0">
                                    Upload Picture
                                </h2>
                            </div>
                        )}
                    </label>
                </div>

                <form
                    className="flex flex-col w-full items-start justify-center gap-4  md:max-w-[420px]"
                    onSubmit={handleProfileUpdate}
                >
                    <div className="flex w-full flex-col gap-2 ">
                        <label htmlFor="firstName" className="label ">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="firstName"
                            placeholder="Enter first name"
                            className={`settingsInput`}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2 ">
                        <label htmlFor="lastName" className="label ">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="lastName"
                            placeholder="Enter last name"
                            className={`settingsInput`}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2 ">
                        <label htmlFor="email" className="label ">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="email"
                            placeholder="Enter email"
                            className={`settingsInput`}
                        />
                    </div>

                    <div className="mt-2">
                        <button
                            type="submit"
                            className="w-[10rem] bg-[#272264] p-4 rounded-md text-white"
                        >
                            {loading && (firstName || lastName || email) ? (
                                <Preloader />
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                    <Toaster />
                </form>
            </div>
        </section>
    );
};

export default Info;
