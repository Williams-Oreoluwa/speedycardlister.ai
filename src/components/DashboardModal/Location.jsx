import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import CustomSelectArrows from "../CustomSelectArrows";
import { countryList } from "../../countries";
// import { BiChevronDown } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
const CurrencySelector = ({ currencyValue, setCurrencyValue }) => {
  const handleChange = (event) => {
    setCurrencyValue(event.target.value);
  };
  
  return (
    <div className="w-full relative ">
      <select
        value={currencyValue}
        onChange={handleChange}
        id="mySelect"
        className="select"
        name="Currency"
      >
        <option value="" disabled selected hidden>
          {" "}
          Choose preferred trading currency
        </option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
      </select>
      <CustomSelectArrows />
      {/* <div
        onClick={() => setOpen(!open)}
        className={`mt-1 h-[3.5rem]  py-2 border border-gray-300 rounded-md pl-6  focus:outline-none focus:ring-indigo-500 w-full  flex items-center justify-between ${
          !currencyValue && "text-[#94A3B8]"
        }`}
      >
        {currencyValue
          ? currencyValue?.length > 25
            ? currencyValue?.substring(0, 25) + "..."
            : currencyValue
          : "Choose preferred currency"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center gap-4 bg-[#958ae7] sticky top-0  h-[2.8rem] rounded-md">
          <span className="ml-4 text-white">
            <AiOutlineSearch size={18} />
          </span>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter preferred currency "
            className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-l-none w-full focus:outline-none focus:ring-indigo-500 "
          />
        </div>
        {currencies?.map((currency, index) => (
          <li
            key={index}
            className={`z-10 p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              currency?.name?.toLowerCase() === currencyValue?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              currency?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (currency?.name?.toLowerCase() !== currencyValue.toLowerCase()) {
                setCurrencyValue(currency?.code);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            <div className="grid grid-cols-2 gap-4 items-center justify-between">
              {currency?.code}
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

const Selector = ({ countries, setCountries }) => {
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    setCountryData(countryList);
  }, []);

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  return (
    <div className="w-full font-medium cursor-pointer relative">
      <select
        id="mySelect"
        className="select"
        name="countries"
        placeholder="Enter your country"
        value={countries}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Select your country.
        </option>

        {countryData.map((country, index) => {
          const { name } = country;
          return (
            <option key={index} value={name}>
              {name}
            </option>
          );
        })}
      </select>
      <CustomSelectArrows />
      {/* <div
        onClick={() => setOpen(!open)}
        className={`mt-1 h-[3.5rem] px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 w-full p-2 flex items-center justify-between ${
          !selectedCountry && "text-gray-700"
        }`}
      >
        {selectedCountry
          ? selectedCountry?.length > 25
            ? selectedCountry?.substring(0, 25) + "..."
            : selectedCountry
          : "Select Country"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center gap-4 bg-[#958ae7] sticky top-0  h-[2.8rem] rounded-md">
          <span className="ml-4 text-white">
            <AiOutlineSearch size={18} />
          </span>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-l-none w-full focus:outline-none focus:ring-indigo-500 "
          />
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`z-10 p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              country?.name?.toLowerCase() === selectedCountry?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selectedCountry.toLowerCase()) {
                setSelectedCountry(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))} */}
      {/* </ul> */}
    </div>
  );
};

const Location = ({
  locationValue,
  setLocationValue,
  postalCode,
  setPostalCode,
  currencyValue,
  setCurrencyValue,
  countries,
  setCountries,
}) => {
  return (
    <>
      <div className="pb-4">
        <label htmlFor="lastName" className="label">
          Address
        </label>
        <div className="email-container">
          <textarea
            required
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            placeholder="Input your address"
            className={`mt-2 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 h-20 text-sm md:text-base`}
            name=""
            id=""
            cols="3"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="lastName" className="label">
          Postal Code
        </label>
        <div className="email-container">
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Input Postal Code."
            className="input"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="lastName" className="label">
          Country
        </label>
        <div className="email-container">
          <Selector countries={countries} setCountries={setCountries} />
        </div>
      </div>
      <div className="pb-4">
        <label htmlFor="lastName" className="label">
          Currency
        </label>
        <div className="email-container">
          <CurrencySelector
            currencyValue={currencyValue}
            setCurrencyValue={setCurrencyValue}
          />
        </div>
      </div>
    </>
  );
};

export default Location;
