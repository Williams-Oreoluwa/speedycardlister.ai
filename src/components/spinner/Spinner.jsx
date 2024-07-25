import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = ({ width, height }) => {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color="#272264"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
