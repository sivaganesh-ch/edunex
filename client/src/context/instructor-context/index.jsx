import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);
  const [instructorCoursesList, setInstructorCoursesList] = useState([]);
  const [instructorDashboardData, setInstructorDashboardData] = useState([]);
  const [instructorDashboardResMessage, setInstructorDashboardResMessage] = useState([]);
  const [allRecommendedCoursesList, setAllRecommendedCoursesList] = useState(
    []
  );
  const [allUsersList, setAllUsersList] = useState([]);
  const [filterDegree, setFilterDegree] = useState("B-Tech");
  const [reqType, setReqType] = useState("Enrolled");
  const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);
  const [barChartClickedData, setBarChartClickedData] = useState([]);
  

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage,
        instructorDashboardData,
        setInstructorDashboardData,
        instructorDashboardResMessage, 
        setInstructorDashboardResMessage,
        barChartClickedData, 
        setBarChartClickedData,
        instructorCoursesList,
        setInstructorCoursesList,
        allRecommendedCoursesList,
        setAllRecommendedCoursesList,
        allUsersList,
        setAllUsersList,
        currentEditedCourseId,
        setCurrentEditedCourseId,
        filterDegree,
        setFilterDegree,
        reqType, 
        setReqType,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
