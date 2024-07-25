import React, { useState, useEffect } from "react";
import CustomRadio from "../Radio/CustomRadio";
import CustomSelectArrows from "../CustomSelectArrows";

function Preferences({
  shippingTime,
  setShippingTime,
  shippingMethod,
  setShippingMethod,
}) {
  const handleMethodChange = (event) => {
    setShippingMethod(event.target.value);
  
  };

  const handleChange = (event) => {
    setShippingTime(event.target.value);
    ("shipping_time:", event.target.value);
  };

  return (
    <div className=" flex flex-col gap-4">
      <div className="cursor-pointer email-container gap-4 grid pb-4">
        <label htmlFor="shippingMethod" className="label">
          Shipping Method
        </label>
        <div className="relative">
          <select
            value={shippingMethod}
            onChange={handleMethodChange}
            id="mySelect"
            className="select"
            name="shipping_time"
          >
            <option value="" disabled hidden>
          Preferred shipping method.
        </option>
            <option value="free shipping">Free Shipping</option>
            <option value="pickup in store">Pick up in store</option>
            <option value="shipping">Shipping</option>
          </select>
          <CustomSelectArrows />
        </div>
      </div>
      <label htmlFor="shippingTime" className="label">
        Shipping and Handling Time
      </label>

      <div className="w-full font-medium grid  grid-cols-[1fr,6rem] gap-2">
        <div className="relative">
          <select
            value={shippingTime}
            onChange={handleChange}
            id="mySelect"
            className="select"
            name="shipping_time"
          >
            <option value="" disabled hidden>
          Preferred shipping time.
        </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <CustomSelectArrows />
        </div>
        <input readOnly type="text" name="" id="" value="days" className="input" />
      </div>
    </div>
  );
}

export default Preferences;
