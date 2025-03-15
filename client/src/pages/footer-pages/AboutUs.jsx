// import { Card } from "@/components/ui/card";
// import React from "react";

// const AboutUs = () => {
//     const FeatureSectionConfig = [
//         {
//             headline: "Interactive Learning",
//             para: "Engage with course materials through interactive videos and hands-on projects.",
//         },
//         {
//             headline: "Personalized Courses",
//             para: "Access curated courses that match your learning needs and interests.",
//         },
//         {
//             headline: "Secure & Seamless",
//             para: "Learn with confidence in a secure and seamless online environment.",
//         },
//     ];
//     const TeamSectionConfig = [
//         {
//             name:"Jagadish",
//             role: "Full-Stack Development",
//         },
//         {
//             name:"Kiranmaye",
//             role: "Frontend Development",
//         },
//         {
//             name:"Naga Sai Teja",
//             role: "Testing",
//         },
//         {
//             name:"Gopal Rao",
//             role: "Documentation",
//         },
//     ];
//   return (
//     <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
//       {/* Hero Section */}
//       <div className="text-white bg-slate-950 text-center py-16 px-4">
//         <h1 className="text-4xl mb-4 font-bold">ABOUT</h1>
//         <h1 className="text-4xl font-bold text-yellow-600 drop-shadow-[0px_0px_5px_rgba(0,8,255,0.8)]">MIC:E-LEARNING</h1>
//         <p className="mt-4 text-lg max-w-3xl mx-auto">
//           Empowering learners with high-quality courses, interactive learning, and a seamless educational experience.
//         </p>
//       </div>

//       {/* Mission Section */}
//       <div className="mx-auto py-16 px-4 text-center">
//         <h2 className="text-3xl font-semibold text-gray-800 dark:text-yellow-600">Our Mission</h2>
//         <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-white">
//           At Learn+, our mission is to bridge the gap between learners and quality educational content by providing a
//           user-friendly, engaging, and accessible learning platform.
//         </p>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white dark:bg-slate-900 py-16 px-4">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-yellow-600">Why Choose Learn+</h2>
//         <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
//         { FeatureSectionConfig.map((card) => (
//           <div className="bg-gray-100 dark:bg-zinc-100/15  p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-semibold">{card.headline}</h3>
//             <p className="mt-2">{card.para}</p>
//           </div>
//         ))}
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="container mx-auto py-16 px-4 text-center">
//         <h2 className="text-3xl font-semibold dark:text-yellow-600">Meet Our Team</h2>
//         <div className="grid md:grid-cols-4 gap-8 mt-8 max-w-5xl mx-auto">
//         {TeamSectionConfig.map((card) => (
//           <div className="bg-white dark:bg-zinc-100/15 p-6 rounded-lg shadow-md">
//             <div className="flex">
                
//             </div>
//             <h3 className="text-xl font-semibold">{card.name}</h3>
//             <p className="text-gray-600 dark:text-white font-serif">{card.role}</p>
//           </div>
//         ))}
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mt-16">
//         <p className="text-lg">&copy; 2025 Learn+. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useState, useEffect } from "react";

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  const TeamSectionConfig = [
            {
                name:"Ch.Sivaganesh",
                role: "Frontend Developer",
            },
            {
                name:"Jagadish",
                role: "Backend Developer",
            },
        ];

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
        <h1 className="text-5xl font-extrabold text-yellow-600">ABOUT US</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto opacity-90">
          EduNex is committed to providing high-quality learning experiences through innovative technology.
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
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Our mission is to make learning accessible and engaging for everyone, empowering individuals with knowledge and skills for the future.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Vision</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We aim to bridge the gap between learners and quality educational content through a user-friendly platform.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Meet Our Team</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We are a passionate team of educators, developers, and designers working together to enhance online learning experiences.
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-8 max-w-5xl mx-auto">
        {TeamSectionConfig.map((card) => (
          <div className="bg-gray-100/35 dark:bg-gray-100/15 p-6 rounded-lg shadow-md">
            <div className="flex">
                
            </div>
            <h3 className="text-xl font-semibold">{card.name}</h3>
            <p className="text-gray-600 dark:text-white font-serif">{card.role}</p>
          </div>
        ))}
        </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mt-16">
        <p className="text-lg">&copy; 2025  EduNex. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;

