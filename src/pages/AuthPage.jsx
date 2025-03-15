import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/SignUp
  const [showForm, setShowForm] = useState(false); // Control form visibility

  const handleButtonClick = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setShowForm(true);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://s3-alpha-sig.figma.com/img/ec36/6190/b0a1cdce092091e2710452391cd3428d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rh7-3UHY3naBhJuiZbckeI-c-1Uqwf-GeY7fcbnOxmh1WBJmVWkNHqeexBYfrYhB2xGiP-1cdUIfRIQA0IQuOe1GOwJIJNW0LSt-Fd4~i1Jd8S3YdKFjDk-nMce5wRhmzAMFR26E2hMh44sS2sygzN-qXBB6i~0MowC1J9didwQ~-ZBPNYRNGny~1dikT38zH7d9Ji-sFb6e85Glq7J17nc-e1DVTDxWOBmZYCGViZWwKvRfREXZxKRjQsUhNgb67R~F2imCGgIH2uWEdqob6PZ8URtDeTMi9wLOc1Ad4S7qIWKL8exQRwxF9pYSZdhgmD3xtBwkbX6L0Kxs8A-x7g__")',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg text-center space-y-6 w-full max-w-md transition-all duration-500">
        {/* Logo */}
        <img
          src="https://via.placeholder.com/150" // Replace with your logo URL
          alt="Logo"
          className="w-24 h-24 mx-auto mb-4"
        />

        {/* Show Buttons or Form */}
        {!showForm ? (
          <>
            <h1 className="text-3xl font-light mb-4">Welcome</h1>
            <div className="space-x-4">
              <button
                onClick={() => handleButtonClick(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => handleButtonClick(false)}
                className="px-6 py-2 bg-transparent text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition duration-300 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-light mb-4">
              {isLogin ? "Log In" : "Sign Up"}
            </h1>

            {/* Conditionally Render Forms */}
            {isLogin ? (
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                  Log In
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                  Sign Up
                </button>
              </form>
            )}

            {/* Back Button */}
            <button
              onClick={() => setShowForm(false)}
              className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;