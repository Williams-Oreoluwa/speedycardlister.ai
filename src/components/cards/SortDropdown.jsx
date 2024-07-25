import React, { useState } from "react";
import { RxCaretUp } from "react-icons/rx";

const SortDropdown = ({
  isOpenDropdown,
  setIsOpenDropdown,
  setSortCriteria,
}) => {
  const [selectedOption, setSelectedOption] = useState("Name");
  const handleSortChange = (value, label) => {
    setSelectedOption(label);
    setSortCriteria(value);
    setIsOpenDropdown(false);
  };
  return (
    <div
      className={`absolute -top-[22px] right-0 bg-transparent border-gray-300 w-[160px] mt-2 shadow-sm transition-opacity transform ${
        isOpenDropdown
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white border border-[#E2E8F0] px-3 py-1 lg:py-[14px] flex justify-between items-center">
        <span>{selectedOption}</span>
        <RxCaretUp size={24} className="text-[#94A3B8]" />
      </div>
      <div className="bg-white border border-[#E2E8F0] w-full mt-2 shadow-lg shadow-[#0A13440F]">
        <div
          onClick={() => handleSortChange("dateAdded", "Date Added")}
          className="px-3 cursor-pointer py-1 sm:py-[14px] text-left"
        >
          Date Added
        </div>
        <div
          onClick={() => handleSortChange("title", "Name")}
          className="px-3 py-1 cursor-pointer sm:py-[14px] text-left"
        >
          Name
        </div>
        <div
          onClick={() => handleSortChange("price", "Price")}
          className="px-3 cursor-pointer py-1 sm:py-[14px] text-left"
        >
          Price
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
