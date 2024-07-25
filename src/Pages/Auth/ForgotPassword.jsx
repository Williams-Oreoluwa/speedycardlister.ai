import { useContext, useEffect, useState } from "react";
import { Globalcontext } from "../../Context/Context";
import { Link } from "react-router-dom";
import Preloader from "../../components/Loader";
import axios from "axios";
import { baseURL } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const FORGOT_PASSWORD_ENDPOINT = "auth/forgot-password";

const ForgotPassword = () => {
    const { setAuth } = useContext(Globalcontext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const success = () => {
        toast.success("OTP code sent to your mail...");
    };

    const showSuccessToast = () => {
        success();
    };

    const removeError = () => {
        setErrMsg(false);
    };

    useEffect(() => {
        setErrMsg("");
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${baseURL}/v1/${FORGOT_PASSWORD_ENDPOINT}`,
                JSON.stringify({ email }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setAuth({ email });
            setEmail("");
            setLoading(true);
            showSuccessToast();
            setTimeout(() => {
                navigate("/otp");
            }, 2000);

            localStorage.setItem("email", email);
        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                showSuccessToast();
                setTimeout(() => {
                    navigate("/otp");
                }, 2000);
                // setErrMsg("Missing Username or Password");
            } else if (err.response.status === 401) {
                // setErrMsg("Email does not exist");
                showSuccessToast();
                setTimeout(() => {
                    navigate("/otp");
                }, 2000);
            } else {
                setErrMsg("Verification failed");
            }
        }
        setLoading(false);
    };

    return (
        <AuthPageLayout
            formTitle={"Forgot Password"}
            formDes={
                "Reset your password easily by entering your email to get started."
            }
        >
            <p
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
                <div onClick={removeError}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 remove"
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
                className="space-y-4 flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="username" className="label">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="username"
                        name="username"
                        required
                        placeholder="Enter your email"
                        className="input"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#342f6e] focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    {loading ? <Preloader /> : "Send Code"}
                </button>
            </form>
            <Link
                to="/login"
                className="flex items-center justify-center gap-2 mt-4 text-center font-bold text-[#272264] text-sm md:text-base"
            >
                <FaArrowLeft />
                Back to Login
            </Link>
        </AuthPageLayout>
    );
};

export default ForgotPassword;
