import React, { useState, useEffect } from "react";
import AuthPageLayout from "../../layouts/AuthPageLayout";
import { Link } from "react-router-dom";
import Preloader from "../../components/Loader";

const IsSuccessful = () => {
  return (
    <>
      <AuthPageLayout
        formTitle={"Account Verified!"}
        formDes={
          "Your email has been successfully verified. You can now log in and start uploading your sports cards."
        }
      >
        <div className="flex flex-col space-y-10">
          <div className="flex gap-[4px] sm:gap-[6px] md:gap-3  items-center justify-center flex-wrap sm:flex-nowrap">
            <img src="/lock-correct-svgrepo-com (1) 1.png" alt="" />
          </div>
          <Link to='/dashboard'>
          <div className="flex items-center justify-center ">
            <button className="w-full  py-3 px-6 border  border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#2e2b50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {/* {loading ? <Preloader /> : "Continue"} */}
              Continue to Dashboard
            </button>
          </div>
          
          </Link>

          
        </div>
      </AuthPageLayout>
    </>
  );
};

export default IsSuccessful;
