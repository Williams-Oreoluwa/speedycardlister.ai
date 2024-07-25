import React from "react";

const Tabs = ({
  tabItems,
  filterItem,
  selectedTab,
  Data,
  setAllCards,
  setSelectedTab,
}) => {
  return tabItems.map((item, id) => {
    return (
      <button
        className={`p-[10px] flex items-center gap-[10px] rounded-xl border border-[#6454D6]/50   ${
          selectedTab === item
            ? "bg-[#6454D6] text-[#121212]"
            : "text-[#6454D6]/50"
        }`}
        onClick={() => {
          setAllCards(item);
          filterItem(item);
          setSelectedTab(item);
        }}
        key={id}
      >
        <span className="font-semibold leading-[18.78px] text-base">{`${item} Cards`}</span>
        <span className="text-white  bg-[#6454D6]/50 rounded-[50px] px-1 py-0.5 ">
          99+
        </span>
      </button>
    );
  });
};

export default Tabs;
