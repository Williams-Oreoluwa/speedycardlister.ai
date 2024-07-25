import React, { useContext } from "react";
import AuthPageLayout from "../../layouts/AuthPageLayout";
import { Link } from "react-router-dom";
import { Globalcontext } from "../../Context/Context";

const IsUnsuccessful = () => {
  const { resendOtp } = useContext(Globalcontext);
  return (
    <>
      <AuthPageLayout
        formTitle={"Verification Failed!"}
        formDes={
          "Your email verification code is incorrect.Please request a new verification code to complete the registration process."
        }
      >
        <div className="flex flex-col space-y-10">
          <div className="flex gap-[4px] sm:gap-[6px] md:gap-3  items-center justify-center flex-wrap sm:flex-nowrap">
            <img src="/lock-wrong-svgrepo-com 1.png" alt="" />
          </div>
          <Link  onClick={resendOtp} to="/account-verification">
            <div className="flex items-center justify-center ">
              <button
               
                className="w-full  py-3 px-6 border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#2e2b50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* {loading ? <Preloader /> : "Continue"} */}
                Resend Verification Code
              </button>
            </div>
          </Link>
        </div>
      </AuthPageLayout>
    </>
  );
};

export default IsUnsuccessful;
