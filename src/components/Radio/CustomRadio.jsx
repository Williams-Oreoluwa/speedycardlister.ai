import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const CustomRadio = ({ name, value, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className="md:w-5 md:h-5 w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
        {checked && (
          <FontAwesomeIcon icon={faCheckCircle} className="text-[#272264]" />
        )}
      </div>
      <span className="ml-2">{value}</span>
    </label>
  );
};

export default CustomRadio;
