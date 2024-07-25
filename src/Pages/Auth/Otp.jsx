import { useEffect, useState } from "react";

import Preloader from "../../components/Loader";
import axios from "axios";
import { baseURL } from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const verifyOtpEndpoint = "auth/verify-otp";
const resendOtpEndpoint = "auth/resend-otp";

const Otp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [otpEmail, setOtpEmail] = useState(email);
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpPurpose, setOtpPurpose] = useState("reset-password");
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(59);
  // const [myotp, setmyOtp] = useState("");

  const toastSuccess = () => {
    toast.success("Verification Successful..");
  };

  const showSuccessToast = () => {
    toastSuccess();
  };

  // const removeError = () => {
  //     setErrMsg(false);
  // };
  // const removeSuccess = () => {
  //     setSuccess(false);
  // };

  const newData = otp.join("");
  localStorage.setItem("code", newData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/v1/${verifyOtpEndpoint}`,
        JSON.stringify({ code: newData, email: otpEmail, otpPurpose }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      showSuccessToast();
      setTimeout(() => {
        navigate("/new-password");
      }, 3000);
      localStorage.setItem("code", code);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/${resendOtpEndpoint}`,
        JSON.stringify({
          email: otpEmail,
          otpPurpose: "reset-password",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);

      setSuccess("OTP has been sent to your mail.");
      resetOtp();

      localStorage.setItem("code", code);
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

  const handleChange = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next inputss
    if (element.value) {
      element.nextSibling.focus();
    }

    if (element.value === "") {
      element.previousSibling.focus();
    }
  };
  // const clearOtp = (e) => {
  //     e.preventDefault();
  //     setOtp([...otp.map((v) => "")]);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetOtp = () => {
    setCountDown(59);
  };

  return (
    <AuthPageLayout
      formTitle={"Input Verification Code"}
      formDes={`We sent a code to your mail.`}
      isOtpEmail={email}
    >
      <div>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-[4px] sm:gap-[6px] md:gap-3  items-center justify-center flex-wrap sm:flex-nowrap">
              {otp.map((data, index) => {
                return (
                  <input
                    className="indent-3 md:indent-[1.25rem] w-[44px]  sm:w-[60px]  h-[44px]  sm:h-[60px] border-2 border-[#E2E8F0] bg-[#F8FAFC]  rounded-md"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    required
                  />
                );
              })}
            </div>

            {/* <div
                onClick={clearOtp}
                className="text-[#272264] underline cursor-pointer text-center"
              >
                <h2>Clear OTP field</h2>
              </div> */}
            <br />

            <input
              type="hidden"
              name=""
              placeholder="otp-purpose"
              value={otpPurpose}
            />
            <input type="hidden" name="" placeholder="email" value={otpEmail} />

            <div className="flex items-center justify-center ">
              <button className="w-full  py-3 px-6 border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#2e2b50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {loading ? <Preloader /> : "Continue"}
              </button>
            </div>
          </div>
        </form>
        <div className="text-center flex flex-col ">
          <div className="text-[13px] leading-[20px] font-[400] pt-3 flex flex-row gap-1 items-center justify-center">
            <h2>{`Didn't`} get the code?</h2>
            <h2
              onClick={resendOtp}
              className="flex font-[600] text-[16px] gap-1 cursor-pointer text-[#272264]"
            >
              Resend in
              <div className="text-center ">
                <h2 className="text-[#272264]">{`${
                  countDown === 0 ? "00 : 00" : `00 : ${countDown}`
                }`}</h2>
              </div>
            </h2>
          </div>
        </div>
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-4 text-center font-bold text-[#272264] text-sm md:text-base"
        >
          <FaArrowLeft />
          Back to Login
        </Link>
      </div>
    </AuthPageLayout>
  );
};

export default Otp;
