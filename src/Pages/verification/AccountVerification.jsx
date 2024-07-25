import React, { useState, useEffect, useContext } from "react";
import AuthPageLayout from "../../layouts/AuthPageLayout";
import axios from "axios";
import { baseURL } from "../../api/axios";
import Preloader from "../../components/Loader";
import { useNavigate, Link } from "react-router-dom";
import { Globalcontext } from "../../Context/Context";

const AccountVerification = () => {
  const {
    email, resendOtp
  } = useContext(Globalcontext);
  const [verificationCode, setVerificationCode] = useState(
    new Array(6).fill("")
  );
  const [loading, setLoading] = useState(false);

  

  console.log(email);

  const otpPurpose = "verify-acct";

  const handleChange = (element, index) => {
    setVerificationCode([
      ...verificationCode.map((d, idx) => (idx === index ? element.value : d)),
    ]);

    // Focus next inputss
    if (element.value) {
      element.nextSibling.focus();
    }

    if (element.value === "") {
      element.previousSibling.focus();
    }
  };

  const newData = verificationCode.join("");

  const [countDown, setCountDown] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    if (countDown <= 0) return;

    const interval = setInterval(() => {
      setCountDown((prevSeconds) => prevSeconds - 1);
    }, 1000); // Decrement the counter every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [countDown]);

  const resetCountdown = () => {
    setCountDown(10); // Reset to 5 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes == 0 && remainingSeconds === 0) {
      return <h2 onClick={resendOtp}>Resend Verification Code</h2>;
    }
    return `Resend in ${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // const resetOtp = () => {
  //   setCountDown(59);
  // };

//   console.log(verificationCode);

  //   localStorage.setItem("code", newData);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/auth/acct-verification/verify-otp`,
        JSON.stringify({ code: newData, email, otpPurpose }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

    //   console.log(response);
      const accessToken = response?.data?.data.token;
      localStorage.setItem("accessToken", accessToken);

      setTimeout(() => {
        navigate("/account-successful");
      }, 3000);
    } catch (err) {
      setTimeout(() => {
        navigate("/account-unsuccessful");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

    const sendOtp = () => {
     

        // console.log(response);
        resendOtp()

        resetCountdown();
    
    };

//   console.log(verificationCode.length)

  return (
    <>
      <AuthPageLayout
        formTitle={"Registeration Successful!"}
        formDes={
          "We have sent a verification code to your email address.Please check your inbox and input the code to verify your account."
        }
      >
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-[4px] sm:gap-[6px] md:gap-3  items-center justify-center flex-wrap sm:flex-nowrap">
                {verificationCode.map((data, index) => {
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

              {/* <Link to="/account-successful"> */}
              <div className="flex items-center justify-center ">
                <button disabled={console.log(verificationCode.length)}
                  type="submit"
                  className="w-full  py-3 px-6 border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#2e2b50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <Preloader /> : "Continue"}
                </button>
              </div>
              {/* </Link> */}
            </div>
          </form>
          <div className="text-center flex flex-col ">
            <div className="text-[13px] leading-[20px] font-[400] pt-3 flex flex-row gap-1 items-center justify-center">
              {countDown === 0 ? (
                ""
              ) : (
                <h2 className="text-[#496ea1]">{`Didn't`} receive the code?</h2>
              )}

              <h2
                  onClick={sendOtp}
                className="flex font-[600] text-[16px] gap-1 cursor-pointer text-[#272264]"
              >
                <div className="text-center ">

                  <h2 className="text-[#272264] text-[16px] leading-[20px] font-[600]">{formatTime(countDown)}</h2>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </AuthPageLayout>
    </>
  );
};

export default AccountVerification;
