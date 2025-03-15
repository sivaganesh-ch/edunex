import React, { useEffect, useState } from 'react';
import ProfileSettings from '../profile-settings/ProfileSettings';
import { getStudentDetailsService } from "../../../services";

export const InstructorProfileData = 
{
    img: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    name: "Jaga",
    role: "Instructor",
    emailId: "jagadishch@gmail.com",
    mobileNo: "90xxxxxxxx",
    deptName: "CSE",
    providedCourses: "8",
    youtubeCourses: "6/8",
    ownCourses: "2/8",
} 


export const InstructorProfileConfig = [
    {
        id:"userName",
        type:"text",
        label: "Full Name",
        value: "userName",
        placeholder: "Enter Full Name",
    },
    {
        id:"role",
        type:"text",
        label: "Role",
        value: "role",
        placeholder: "Student",
    },
    {
        id:"userEmail",
        type:"text",
        label: "Email-Id",
        value: "userEmail",
        placeholder: "Enter Email-Id",
    },
    {
        id:"userMobileNumber",
        type:"text",
        label: "Mobile.No",
        value: "userMobileNumber",
        placeholder: "Enter Mobile.No",
    },
    {
        id:"userBranch",
        type:"text",
        label: "Dept.Name",
        value: "userBranch",
        placeholder: "Enter Dept.Name",
    },
    {
        id:"providedCourses",
        type:"text",
        label: "No.of Provided Courses",
        value: "providedCourses",
        placeholder: "",
    },
    {
        id:"youtubeContent",
        type:"text",
        label: "YouTube Courses",
        value: "youtubeContent",
        placeholder: "",
    },
    {
        id:"collegeContent",
        type:"text",
        label: "Own Courses",
        value: "collegeContent",
        placeholder: "",
    },
];

const InstructorProfile = ({ profile }) => {

  console.log("profileId: ", profile?._id)
    const [instructorProfileData, setInstructorProfileData] = useState(null);
      
      useEffect(() => {
        const fetchData = async () => {
          let userDetails = await getStudentDetailsService(profile?._id, "userDetails");
    
          setInstructorProfileData(userDetails);
        };
    
        fetchData();
      }, []);
    
      console.log("Details: ", instructorProfileData);

    const profileData = {
        ...instructorProfileData,
        role:""
    }

  return ( instructorProfileData !== null &&
    <ProfileSettings
      location={"instructorProfile"}
      ProfileConfig={InstructorProfileConfig}
      ProfileData={instructorProfileData}
      profile={profile}
    />
  )
}

export default InstructorProfile;
