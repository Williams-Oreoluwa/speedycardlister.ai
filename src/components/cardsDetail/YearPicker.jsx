import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearPicker = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Get current year
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
  return (
    <DatePicker
      selected={new Date()}
      renderYearContent={renderYearContent}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

export default YearPicker;
