import React from "react";
import Spinner from "../spinner/Spinner";
import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <main className=" h-screen  w-full">
      <div className="flex items-center justify-center h-full w-full">
        <ImSpinner8 size={40} className="animate-spin -mt-20 text-[#BBB2EF]" />
        {/* <Spinner width={"80"} height={"80"} /> */}
      </div>
    </main>
  );
};

export default Loader;
