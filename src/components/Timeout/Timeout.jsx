import React from "react";
import { Link } from "react-router-dom";

const Timeout = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen text-center p-12 flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-4xl  font-bold text-gray-800 mb-4">
          Session timed out!!!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Kindly Login to continue using our platform.
          </p>
          <div className="flex gap-5">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/login">Sign In</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeout;
