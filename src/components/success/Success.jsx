import React from "react";

const Success = ({ title, className }) => {
  return (
    <div
      className={`flex items-center max-w-xl justify-between px-8 py-4  rounded-lg border border-[#22C38F] bg-[#EDFCE8]  ${className}`}
    >
      <p className="text-[#151812] font-semibold text-base leading-6">
        {title}
      </p>
      <div className="w-6 h-6">
        <img src="/success-check.svg" className="w-full h-full" alt="success" />
      </div>
    </div>
  );
};

export default Success;
