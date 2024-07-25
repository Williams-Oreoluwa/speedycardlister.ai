import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
        <div className="flex gap-5">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <a href="https://speedycardlister.ai/">Back Home</a>
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
