import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getElementAtEvent, Pie } from "react-chartjs-2";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentProfile, {
  StudentProfileConfig,
} from "../student-profile";
import ProfileSettings from "../profile-settings/ProfileSettings";
import { useDarkMode } from "@/context/dark-mode-context/DarkModeContext";
import CommonTableCard from "@/components/instructor-view/common-table/CommonTableCard";
import { getStudentDetailsService } from "../../../services";
import {styled} from "@mui/material/styles";
import { useEffect } from "react";

ChartJS.register(
  ArcElement,

  Tooltip,
  Legend
);

// Custom Header Cell Styling (optional, but recommended)
const StyledTableCell = styled('td')(({ theme }) => ({
  '&.MuiTableCell-head': { // Target header cells specifically
    fontWeight: 'bold',
    textAlign: 'center', // Center the text within the cell
    borderBottom: 'none', // Remove the bottom border for visual grouping
  },
}));

const StudentActivityPage = ({ location, authUserId }) => {
  const { id } = useParams();

  const { darkMode, setDarkMode } = useDarkMode();
  const [response, setResponse] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const studentProfileData = userDetails?.userDetails

  let overallCoursesStatus = userDetails?.overallCoursesStatus
  const status = [
    { value: overallCoursesStatus?.completed, label: "Completed" },
    { value: overallCoursesStatus?.inProgress, label: "In-Progress" },
    { value: overallCoursesStatus?.inComplete, label: "InComplete" },
  ];

  // console.log("status: ", status)

  const barChart1Data = {
    labels: status.map((section) => section.label),
    datasets: [
      {
        label: "Courses",
        data: status.map((section) => section.value),
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 0, 0.8)",
        backgroundColor: ["green", "orange", "red"],
        hoverBackgroundColor: [
          "rgba(0, 109, 0, 1)",
          "rgba(245, 168, 7, 0.7)",
          "rgba(109, 0, 0, 1)",
        ],
        borderWidth: 1,
        links: ["completed", "progress", "incomplete"],
      },
    ],
  };

  const options1 = {
    responsive: true, // Ensures responsiveness
    maintainAspectRatio: false, // Allows the chart to resize correctly
    plugins: {
      legend: {
        display: true,
        position: "right", //  Position the Legend at the Top
        align: "center", //  Align Center
        labels: {
          color: darkMode ? "white" : "black", //
          font: {
            size: 14, //  Legend Label Font Size
          },
          boxWidth: 20,
          padding: 20, // Adjust Spacing Between Legend Labels
        },
        title: {
          display: false,
          text: "", // Legend Title (Above Labels)
          position: "bottom",
          color: darkMode ? "#DAA520" : "black",
          font: {
            size: 30, // 🎯 Font Size for Legend Title
            weight: "bold",
          },
          // padding: { top: 10, bottom: 5 }, // Adds spacing
        },
      },
    },
    // layout: {
    //   padding: {
    //     top: 0, // ✅ Adds Extra Space Above the Legend
    //   },
    //   width: 30,
    // },
  };

  const chartRef = useRef();
  // const chartRef2 = useRef();

  const onClickChart2 = (event) => {
    if (getElementAtEvent(chartRef.current, event)) {
      console.log(getElementAtEvent(chartRef.current, event));
      const datasetIndex = getElementAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
      console.log(barChart1Data.datasets[datasetIndex].links[dataPoint]);
    }
  };

  const TableTitle = "ALL COURSES DETAILS"

  const ActivityConfig = [
    {
      name: "dateOfPurchase",
      label: "Course Enrolled Date-Time",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "title",
      label: "Course Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "instructorName",
      label: "Instructor Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "lectures",  // lectures.totalLectures
      label: "No.of Lectures",
      options: {
        display: false,
        filter: true,
        sort: true,
        customBodyRender: (lectures) => {
          return lectures.totalLectures
        },
      }
    },
    {
      name: "lectures",  // lectures.lectureStatus.inComplete
      label: "In-Complete",
      options: {
        display: false,
        filter: true,
        sort: true,
        customBodyRender: (lectures) => {
          return lectures.lectureStatus.inComplete
        },
      }
    },
    {
      name: "lectures",  // lectures.lectureStatus.inProgress
      label: "In-Progress",
      options: {
        display: false,
        filter: true,
        sort: true,
        customBodyRender: (lectures) => {
          return lectures.lectureStatus.inProgress
        },
      }
    },
    {
      name: "lectures",  // lectures.lectureStatus.completed
      label: "Completed",
      options: {
        display: false,
        filter: true,
        sort: true,
        customBodyRender: (lectures) => {
          return lectures.lectureStatus.completed
        },
      }
    },
    {
      name: "lectures",  // lectures.totalLectures
      label: "Course Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (lectures) => {
          let totalLectures = lectures?.totalLectures;
          let inComplete = lectures?.lectureStatus.inComplete;
          let inProgress = lectures?.lectureStatus.inProgress;
          let completed = lectures?.lectureStatus.completed;
          console.log(totalLectures, " - ", inComplete, " - ", inProgress, " - ", completed)
          if (inProgress > 0) {
            return <p className="place-self-center w-max rounded-2xl p-2 text-white font-bold bg-yellow-500 hover:cursor-pointer">In-Progress</p>
          }
          else if (totalLectures === completed) {
            return <p className="place-self-center w-max rounded-2xl p-2 text-white font-bold bg-green-600 hover:cursor-pointer">Completed</p>
          }
          
          else {
            return <p className="place-self-center w-max rounded-2xl p-2 text-white font-bold bg-red-600 hover:cursor-pointer">In-Complete</p>
          }
        },
      }
    },
    {
      name: "courseType",  // not in data
      label: "Course Type",
      options: {
        display: false,
        filter: true,
        sort: true,
      }
    },
    {
      name: "category", 
      label: "Category",
      options: {
        filter: true,
        sort: true,
      }
    
    },
  ];

  const ActivityData = userDetails?.allCoursesDetails

  useEffect(()=> {
    const fetchData = async () => {
      let result = await getStudentDetailsService(id);
      console.log("Response: ",result)
      setResponse(result);
      setUserDetails(result?.data);
    }

    fetchData();
  }, [])

  console.log("User Details: ", userDetails);

  return (
    <div className="flex justify-start min-h-screen min-w-full flex-col">
      {response?.success ? (
        <div className="bg-reds-800">
          {/* <nav className="w-full h-[50px] sticky z-auto top-0 left-0 bg-slate-950 border-b-2">
            <div className="w-full"></div>
          </nav> */}
          {/* <div className='flex-wrap  gap-4 p-4 w-full max-w-[calc(100%-200px)] bg-green-600 flex sm:flex-col md:flex-row'> */}
          <div className="mx-auto w-full max-max-w-[100%-80px] top-0 p-4 md:p-6 md:max-w-[888px] lg:max-w-screen-xl  rbg-green-600">
            {" "}
            {/* lg:max-w-screen-xl */}
            <div className="gap-4 md:flex-row lg:space-x-4 flex flex-col overflow-visible rbg-orange-300">
              <section className="">
                <section className=" w-full h-full md:w-[300px] md:max-w-[300px] rbg-blue-700">
                  {/* <Card className='h-full w-full bg-green-500'>
                                    <CardHeader className="">
                                        
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                </Card> */}
                  <ProfileSettings
                    location={location}
                    ProfileConfig={StudentProfileConfig}
                    ProfileData={studentProfileData}
                  />
                </section>
              </section>
              <section className="space-y-4 w-full md:max-w-[calc(100%-350px)] rbg-blue-700">
                {/* <Card className='h-full max-h-[300px] max-w-[calc(100%-20px)] p-0 pb-10'>
                                  <CardHeader className="p-0 m-0 mb-1">
                                    <CardTitle className="text-center text-3xl p-0 m-0">COURSES STATUS</CardTitle>
                                  </CardHeader>
                                  <CardContent className="">
                                    <Pie
                                      data={barChart1Data}
                                      options={options1}
                                      redraw={true}
                                      onClick={onClickChart2}
                                      ref={chartRef}
                                    ></Pie>
                                  </CardContent>                     
                                </Card>
                                <Card className='w-full h-[200px]'>
                                    
                                </Card> */}
                <Card className="rbg-pink-800 justify-items-center p-4 w-full h-full max-h-max">
                  <h1 className="text-3xl text-center text-green-800 mb-4 break-words">COURSES STATUS</h1>
                    {userDetails?.enrolledCourses!==0 && userDetails !== null
                    ?( 
                  <section className="w-full max-w-[300px]">
                  <div className="w-full h-auto">
                      <Pie
                        data={barChart1Data}
                        options={options1}
                        redraw={true}
                        onClick={onClickChart2}
                        ref={chartRef}
                      ></Pie>
                  </div>
                  </section>
                    ): (<p className="text-2xl text-center text-red-800">User Not Enrolled any Course</p>)
                    }
                </Card>
                {/* <div className="w-full h-full max-h-[60px] p-1"> */}
                  <CommonTableCard 
                    rowClickable={false}
                    pageLocation={"ActivityPage"}
                    title={TableTitle}
                    data={ActivityData}
                    columns={ActivityConfig}
                  />
                {/* </div> */}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl text-center">{response?.message || "User Not Found...!"}</h1>
      )}
    </div>
  );
};

export default StudentActivityPage;
