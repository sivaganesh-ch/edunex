import React from 'react';
import { clamp } from 'framer-motion';

import img1 from '../../../public/LogoBgNone.png';
import LogoMIC from '../../../public/logo-small.png';
import ConstImage from '../../../public/LandingImg1.jpg';
import ImageSlider from '../../../public/LandingImg2.png';

const StudentViewCommonFooter = () => {
    const footerData = [
        { name: "About Us", link: "/about-us" },
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Terms of Service", link: "/terms-of-service" },
        { name: "Recommend a Course", link: "/recommend-course" },
        // { name: "Contact", link: "/contact" },
    ];

    // Split the data into 3 sections
    const sectionSize = Math.ceil(footerData.length / 2);
    const sections = [
        footerData.slice(0, sectionSize),
        footerData.slice(sectionSize, sectionSize * 2),
        // footerData.slice(sectionSize * 2),
    ];

  return (
    <div className="border-t-2 border-t-white w-full h-full bg-neutral-900 dark:bg-slate-900 text-white" >
        <section className='container justify-between items-center mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-[30px]'>
        <div className='overflow-clip p-1 rounded-lg place-self-center md:place-self-start bg-gradient-to-tr from-blue-600 to-red-700'>
          <div className='bg-blacks flex animate-infinite-scrolls'>
            <img src={ConstImage} className='bg-white h-28 w-auto rounded-lg brightness-150 '/>
          </div>
        </div>
        {sections.map((section, index) => (
          <div key={index}>
            <ul className="space-y-2 p-4 rounded-[30px] text-center border md:border-none">
              {section.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="hover:text-yellow-600 break-words transition duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className='overflow-clip p-1 rounded-lg place-self-center md:place-self-end bg-gradient-to-tr from-blue-600 to-red-700'>
          <div className='bg-blacks flex animate-infinite-scroll'>
            <img src={ImageSlider} className='bg-white h-28 w-auto rounded-lg brightness-150 '/>
          </div>
        </div>
        </section>

        <section className='text-center pb-[30px] text-yellow-500'>
            <p style={{fontSize:clamp("0.8rem", "0.5rem" + "1vw", "1.2rem")}}> Copyright &#169; 2025 EduNex. All rights reserved.</p>
            {/* <p style={{fontSize:clamp("0.8rem", "0.5rem" + "1vw", "1.2rem")}}> Developed by Jagadish Chennuru</p> */}
        </section>
    </div>
  )
}

export default StudentViewCommonFooter;
