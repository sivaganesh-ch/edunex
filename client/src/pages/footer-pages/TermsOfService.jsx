import React, { useState, useEffect } from "react";

const TermsAndServices = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-all duration-300 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-yellow-600">TERMS & SERVICES</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto opacity-90">
          Understand the terms and conditions for using our services at  EduNex.
        </p>
        <button
          className="mt-6 bg-white dark:bg-gray-700 text-blue-600 dark:text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-16 px-6 md:px-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Acceptance of Terms</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            By using  EduNex, you agree to abide by our terms and conditions. Any violations may result in restricted access to our platform.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">User Responsibilities</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Users must provide accurate information, respect copyright laws, and use our platform in a lawful manner.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Service Modifications</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            EduNex reserves the right to modify, suspend, or discontinue any service at any time without prior notice.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mt-16">
        <p className="text-lg">&copy; 2025  EduNex. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndServices;
