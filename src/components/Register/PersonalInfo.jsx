import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const PersonalInfo = ({
    showEyeConf,
    showEye,
    formik,
    showPassword,
    showConfirmedPassword,
    lengthVal,
    specialVal,
    numberVal,
    upperVal,
}) => {
    return (
        <>
            <div className="pb-4">
                <label htmlFor="firstName" className="label">
                    First Name
                </label>
                <div className="email-container">
                    <input
                        type="text"
                        id="firstName"
                        autoComplete="off"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder="First Name"
                        className={`input  ${
                            formik.errors.firstName
                                ? "focus:border-[#fc8181] focus:border-2"
                                : "focus:border-indigo-500"
                        }`}
                    />
                </div>
            </div>
            <div className="pb-4">
                <label htmlFor="lastName" className="label">
                    Last Name
                </label>
                <div className="email-container">
                    <input
                        type="text"
                        id="lastName"
                        autoComplete="off"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder="Last Name"
                        className={`input  ${
                            formik.errors.lastName
                                ? "focus:border-[#fc8181] focus:border-2"
                                : "focus:border-indigo-500"
                        }`}
                    />
                </div>
            </div>
            {/* <div className="pb-4">
        <label
          htmlFor="phoneNo"
          className="label"
        >
          Phone Number
        </label> */}
            {/* <div className="email-container gap-4 grid grid-cols-[5rem,1fr]">
          <div>
            <Selector
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          </div>
          <div>
            <input
              type="text"
              id="phoneNo"
              autoComplete="off"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onBlur={formik.handleBlur}
              required
              placeholder="Enter Phone Number"
              className={`input  ${
                formik.errors.phoneNo
                  ? "focus:border-[#fc8181] focus:border-2"
                  : "focus:border-indigo-500"
              }`}
            />
          </div>
        </div> */}
            {/* </div> */}

            <div className="pb-4">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <div>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder="Enter your email"
                        className={`mt-1 h-[3rem] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500  ${
                            formik.errors.email && formik.touched.email
                                ? "focus:border-[#fc8181] focus:border-2"
                                : "focus:border-indigo-500"
                        }`}
                    />
                </div>
                {formik.errors.email && formik.touched.email && (
                    <p className="text-[#fc8181]"> {formik.errors.email}</p>
                )}
            </div>
            <div className="pb-4">
                <label htmlFor="password" className="label">
                    Password
                </label>

                <div className="password-container">
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder="********"
                        className={`input  ${
                            formik.errors.password && formik.touched.password
                                ? "focus:border-[#fc8181] focus:border-2"
                                : "focus:border-indigo-500"
                        }`}
                    />
                    <span onClick={showPassword}>
                        {showEye ? (
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
                {/* {formik.errors.password && formik.touched.password && (
          <p className="text-[#fc8181]"> {formik.errors.password}</p>
        )} */}
                {formik.values.password ? (
                    <main className="w-full py-2 text-xs md:text-sm ">
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
            <div className="pb-4">
                <label htmlFor="confirmPassword" className="label">
                    Confirm password
                </label>

                <div className="password-container">
                    <input
                        type="password"
                        id="confirmPassword"
                        autoComplete="off"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder="********"
                        className={`input  ${
                            formik.errors.confirmPassword &&
                            formik.touched.confirmPassword
                                ? "focus:border-[#fc8181] focus:border-2"
                                : "focus:border-indigo-500"
                        }`}
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
                {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                        <p className="text-[#fc8181]">
                            {" "}
                            {formik.errors.confirmPassword}
                        </p>
                    )}
            </div>
        </>
    );
};

export default PersonalInfo;
