import React, { useState } from "react";
import ProfileSettings from "../profile-settings/ProfileSettings";
import { getStudentDetailsService } from "../../../services";

// export const StudentProfileData = 
// {
//   img: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
//   name: "Ch.Jagadish",
//   role: "Student",
//   rollNo: "21H71A0581",
//   degree: "B.Tech",
//   branchName: "CSE",
//   emailId: "jagadishch@gmail.com",
//   mobileNo: "90xxxxxxxx",
//   enrolledCourses: "8",
//   youtubeContent: "6/8",
//   collegeContent: "2/8",
// };
export const StudentProfileConfig = [
  {
    id: "full-name",
    type: "text",
    label: "Full Name",
    value: "userName",
    placeholder: "Enter Full Name",
  },
  {
    id: "role",
    readOnly: true,
    type: "text",
    label: "Role",
    value: "role",
    placeholder: "",
  },
  {
    id: "roll-no",
    readOnly: true,
    type: "text",
    label: "Roll.No",
    value: "userRollNumber",
    placeholder: "",
  },
  {
    id: "degree",
    readOnly: true,
    type: "text",
    label: "Degree",
    value: "userDegree",
    placeholder: "",
  },
  {
    id: "branch-name",
    readOnly: true,
    type: "text",
    label: "Branch Name",
    value: "userBranch",
    placeholder: "Enter Branch Name",
  },
  {
    id: "email-id",
    type: "text",
    label: "Email-Id",
    value: "userEmail",
    placeholder: "Enter Email-Id",
  },
  {
    id: "mobile-no",
    type: "text",
    label: "Mobile.No",
    value: "userMobileNumber",
    placeholder: "Enter Mobile.No",
  },
  {
    id: "enrolled-courses",
    readOnly: true,
    type: "text",
    label: "Enrolled Courses",
    value: "totalEnrolledCourses",
    placeholder: "",
  },
  {
    id: "youtube-content",
    readOnly: true,
    type: "text",
    label: "YouTube Content",
    value: "youtubeContent",
    placeholder: "",
  },
  {
    id: "college-content",
    readOnly: true,
    type: "text",
    label: "College Content",
    value: "collegeContent",
    placeholder: "",
  },
];

const StudentProfile = () => {
  const [studentProfileData, setStudentProfileData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      let userDetails = await getStudentDetailsService(id, "userDetails");

      setStudentProfileData(userDetails);
    };

    fetchData();
  }, []);

  console.log("User-Details: ", userDetails);
  return (
    <ProfileSettings
      role={"user"}
      ProfileConfig={StudentProfileConfig}
      ProfileData={studentProfileData}
    />
  );
};

export default StudentProfile;
