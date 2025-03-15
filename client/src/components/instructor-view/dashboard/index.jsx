import { useContext, useRef, useState } from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend, // x
  LinearScale, // y
  Tooltip,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale, // x
  LinearScale, // y
  Tooltip,
  Legend
);

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/context/dark-mode-context/DarkModeContext";
import { InstructorContext } from "@/context/instructor-context";
import { degreeTypeOptions } from "@/config";
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  IndianRupeeIcon,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BarChartReferTable from "@/pages/instructor/BarChartReferTable";
import { ErrorMessage } from "@/components/Alert-Toast";

function InstructorDashboard({ dashboardData, filteredData }) {
  const {
    filterDegree,
    setFilterDegree,
    reqType,
    setReqType,
    instructorDashboardResMessage,
    setBarChartClickedData,
  } = useContext(InstructorContext);
  const [hideFiltersTab, setHideFiltersTab] = useState(true);
  const [displayResponseTable, setDisplayResponseTable] = useState(false);
  const { darkMode } = useDarkMode();
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const modelRef = useRef(null);

  console.log("filteredData: ", filteredData);
  const barChart1Labels =
    filteredData.length !== 0 ? Object.keys(filteredData.enrolledUsers) : "";

  // console.log("BarChart1Labels: ", barChart1Labels);

  let structuredEnrolledUsers = new Array();
  console.log("Struct Enrolld: ", structuredEnrolledUsers);
  const barChart1LabelsData = new Array();

  for (let eachBranch of barChart1Labels) {
    let eachBranchRecords = filteredData.enrolledUsers[eachBranch];
    // console.log(eachBranchRecords);
    barChart1LabelsData.push(eachBranchRecords.length);
    structuredEnrolledUsers.push(...eachBranchRecords);
  }

  const config = [
    {
      icon: Users,
      label: "Total Registrations",
      value: dashboardData.totalStudents || 0,
    },
    {
      icon: BookOpenText,
      label: "Total Provided Courses",
      value: dashboardData.totalProvidedCourses || 0,
    },
    {
      icon: IndianRupeeIcon,
      label: "Total Revenue on Courses",
      value: dashboardData.totalProfit + "/-",
    },
  ];

  const barChart1Data = {
    labels: barChart1Labels,
    datasets: [
      {
        label: "Students",
        data: barChart1LabelsData,
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 0, 0.8)",
        backgroundColor: ["gray", "orange", "aqua", "red"],
        barThickness: 100,
        borderWidth: 1,
        links: ["1", "2", "3", "4"],
      },
    ],
  };

  const options1 = {
    responsive: true, // Ensures responsiveness
    maintainAspectRatio: false, // Allows the chart to resize correctly
    plugins: {
      legend: {
        display: true,
        position: "top", //  Position the Legend at the Top
        align: "center", //  Align Center
        labels: {
          color: darkMode ? "white" : "black",
          font: {
            size: 14, //  Legend Label Font Size
          },
          padding: 20, // Adjust Spacing Between Legend Labels
        },
        title: {
          display: true,
          text: "BRANCH-WISE ENROLLED STUDENTS", // Legend Title (Above Labels)
          color: darkMode ? "#DAA520" : "black",
          font: {
            size: 16, // 🎯 Font Size for Legend Title
            weight: "bold",
          },
          padding: 10, // ✅ Add Padding Below the Legend Title
        },
      },
    },
    // layout: {
    //   padding: {
    //     top: 0, // ✅ Adds Extra Space Above the Legend
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: `Branches in ${filterDegree}`,
          color: darkMode ? "white" : "black",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true, // Start from 0
        title: {
          display: true,
          text: `${reqType} Students`,
          color: darkMode ? "white" : "black",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          stepSize: 1,
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    onClick: (event) => handleChartClick(event, chartRef1, "chart1"),
  };

  let checkRequiredDataIsTrue = Object.keys(filteredData).length > 1;

  const barChart2LabelsData = checkRequiredDataIsTrue
    ? [
        filteredData?.registeredUsers.length,
        structuredEnrolledUsers?.length,
        filteredData?.notEnrolledUsers.length,
      ]
    : [0, 0, 0];

  const barChart2Data = {
    labels: ["Registered", "Enrolled", "Not-Enrolled"],
    datasets: [
      {
        label: "Students",
        data: barChart2LabelsData,
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 0, 0.8)",
        backgroundColor: ["green", "orange", "red"],
        borderWidth: 1,
        links: ["link-1", "link-2", "link-3"],
      },
    ],
  };

  const options2 = {
    responsive: true, // Ensures responsiveness
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", //  Position the Legend at the Top
        align: "center", //  Align Center
        labels: {
          color: darkMode ? "white" : "black",
          font: {
            size: 14, //  Legend Label Font Size
          },
          padding: 20, // Adjust Spacing Between Legend Labels
        },
        title: {
          display: true,
          text: `OVERVIEW IN ${filterDegree.toUpperCase()}`, //  Legend Title (Above Labels)
          color: darkMode ? "#DAA520" : "black",
          font: {
            size: 16, //  Font Size for Legend Title
            weight: "bold",
          },
          padding: 10, //  Add Padding Below the Legend Title
        },
      },
    },
    layout: {
      padding: {
        top: 0, //  Adds Extra Space Above the Legend
      },
    },
    scales: {
      x: {
        // title: {
        //   display: true,
        //   text: "Months",
        //   color: darkMode ? "white" : "black",
        //   font: { size: 14, weight: "bold" },
        // },
        ticks: {
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true, // Start from 0
        title: {
          display: true,
          text: "No.of Students",
          color: darkMode ? "white" : "black",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          stepSize: 1,
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    onClick: (event) => handleChartClick(event, chartRef2, "chart2"),
  };

  console.log("Filter Based On: ", filterDegree);

  const handleChartClick = (event, chartRef, chartLocation) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const elements = chart.getElementsAtEventForMode(
      event.native,
      "index",
      { intersect: true },
      false
    );

    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const datasetIndex = elements[0].datasetIndex;
      const dataPoint = chart.data.datasets[datasetIndex].data[clickedIndex];
      const label = chart.data.labels[clickedIndex];

      // console.log({ index: clickedIndex, value: dataPoint, label });

      if (chartLocation === "chart1") {
        console.log(filteredData.enrolledUsers[label]);

        let clickedData = {
          title: `${label} ${reqType} Students in ${filterDegree}`,
          data: filteredData.enrolledUsers[label],
        };
        setBarChartClickedData(clickedData);
      } else {
        if (label === "Enrolled") {
          let clickedData = {
            title: `${label} Students in ${filterDegree}`,
            data: structuredEnrolledUsers,
          };
          console.log("Enrolled: ", clickedData);
          setBarChartClickedData(clickedData);
        } else if (label === "Not-Enrolled") {
          let clickedData = {
            title: `${label} Students in ${filterDegree}`,
            data: filteredData.notEnrolledUsers,
          };
          console.log("Not Enrolled: ", clickedData);
          setBarChartClickedData(clickedData);
        } else if (label === "Registered") {
          let clickedData = {
            title: `${label} Students in ${filterDegree}`,
            data: filteredData.registeredUsers,
          };
          console.log("Registered: ", clickedData);
          setBarChartClickedData(clickedData);
        }
      }
      handleDisplayResponseTable();
    }
  };

  const handleDisplayResponseTable = () => {
    setDisplayResponseTable(!displayResponseTable);
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  const handleModelClose = (event) => {
    // const elements = getElementAtEvent(modelRef.current, event);
    handleDisplayResponseTable()
  }

  return (
    <div className="flex gap-4 justify-between">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {config.map((item, index) => (
            <Card key={index} className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={modelRef} onClick={handleModelClose} className={`${displayResponseTable?"visible animate-appear duration-300 overflow-y-auto":"invisible"} fixed z-[20] flex justify-center items-center w-full h-full  left-0 top-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-[2px]`}>
          <div className="w-[80%]" onClick={(e) => e.stopPropagation()}>
            <BarChartReferTable />
          </div>
        </div>

        <section className="">
          {filteredData.length !== 0 &&
            filteredData?.enrolledUsers.length === 0 && (
              <Card className=" text-center font-bold break-words p-1 mb-2 border-dotted border-black dark:border-white">
                <h1 className="drop-shadow-[0px_0px_5px_rgba(226,19,19,0.5)] text-red-900">
                  {instructorDashboardResMessage}
                </h1>
              </Card>
            )}

          <Card className="mb-4 p-4 justify-items-center w-full">
            <div className="w-full max-w-[500px] min-h-[300px] max-h-[300px] rbg-red-600">
              <Bar
                // redraw={true}
                data={barChart2Data}
                options={options2}
                // onClick={onClickChart1}
                ref={chartRef2}
              ></Bar>
            </div>
          </Card>

          {filteredData.length !== 0 &&
            filteredData?.enrolledUsers.length === 0 && (
              <Card className=" text-center font-bold break-words p-1 mb-2 border-dotted border-black dark:border-white">
                <h1 className="drop-shadow-[0px_0px_5px_rgba(226,19,19,0.5)] text-red-900">
                  {instructorDashboardResMessage}
                </h1>
              </Card>
            )}
          <Card className=" p-4 justify-items-center w-full min-h-[300px] max-h-[300px]">
            <Bar
              data={barChart1Data}
              // redraw={true}
              options={options1}
              // onClick={onClickChart1}
              ref={chartRef1}
            ></Bar>
          </Card>
        </section>
      </div>
      <aside>
        <section className="h-full">
          <Card
            className={`${
              hideFiltersTab ? "nav-inactive" : "nav-active"
            } overflow-clip flex max-w-[26%] max-h-[200px] fixed top-60 -right-[2rem] dark:bg-slate-950 border-2 animate-trans-left`}
          >
            <CardHeader
              className="p-0"
              onClick={() => setHideFiltersTab(!hideFiltersTab)}
            >
              <Button className="w-full flex p-1 justify-start max-w-[30px] break-all border-r bg-gradient-to-t from-[#000000] to-[#434343] bg-grays-700 h-[100%] text-white dark:text-yellow-600">
                {hideFiltersTab ? (
                  <ChevronLeft size={300} strokeWidth={5} />
                ) : (
                  <ChevronRight size={300} strokeWidth={5} />
                )}
                <CardTitle className="text-center font-bold text-wrap text-xl ">
                  Filters
                </CardTitle>
              </Button>
            </CardHeader>

            <CardContent
              className={`${
                hideFiltersTab ? "invisible transition-[2s]" : "visible"
              } overflow-auto`}
            >
              <div className="p-1">
                {degreeTypeOptions.map((item, index) => (
                  <div key={index} className="flex items-center p-1">
                    <Input
                      type="radio"
                      id={item.id}
                      value={item.label}
                      name="degree"
                      className="size-4"
                      onChange={(e) => setFilterDegree(e.target.value)}
                    />
                    <Label htmlFor={item.label} className="ml-2">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </aside>
    </div>
  );
}

export default InstructorDashboard;
