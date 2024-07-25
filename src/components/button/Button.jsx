import React from "react";

const Button = ({ text, classsName }) => {
    return (
        <button
            className={`${classsName} bg-[#272264]  p-3 rounded-lg shadow-lg text-[white] text-[1.2rem]`}
        >
            {text}
        </button>
    );
};

export default Button;
