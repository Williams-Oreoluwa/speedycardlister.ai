import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBarExample = ({ colorCode, value, maxValue, data }) => {
    const minValue = 1;

    return (
        <div
            style={{ width: "153px", height: "153px", position: "relative" }}
            className="w-full  max-w-[153px] flex-shrink-0"
        >
            <div className="w-[126px] h-[126px] absolute bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[18px] font-semibold ">
                {" "}
                {value}
            </div>
            <CircularProgressbar
                value={value}
                maxValue={maxValue}
                minValue={minValue}
                text={`${value}`}
                strokeWidth={4}
                backgroundPadding={2}
                background={true}
                styles={buildStyles({
                    textColor: "#21293C", // Text color
                    pathColor: colorCode, // Progress color
                    trailColor: "#E2E8F0", // Background trail color
                    backgroundColor: "#E2E8F0",
                })}
            />
        </div>
    );
};

export default CircularProgressBarExample;
