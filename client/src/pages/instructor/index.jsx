import { useContext, useEffect, useState } from "react";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorRevenueOnCourses from "@/components/instructor-view/courses-revenue";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import StudentsList from "@/components/instructor-view/users-list";
import InstructorProfile from "@/components/profile/instructor-profile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { useDarkMode } from "@/context/dark-mode-context/DarkModeContext";
import { InstructorContext } from "@/context/instructor-context";
import {
  fetchInstructorCourseListService,
  fetchInstructorDashboardDataService,
  getAllUsersDetailsService,
  getRecommendCoursesService,
} from "@/services";
import {
  BarChart,
  Book,
  ChevronLeft,
  CircleUserRound,
  IndianRupee,
  IndianRupeeIcon,
  LogOut,
  Menu,
  Moon,
  Sun,
  Users,
} from "lucide-react";

// import { DarkModeSwitch } from "react-toggle-dark-mode";

function InstructorDashboardpage({ loginDetails }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const {
    instructorDashboardData,
    setInstructorDashboardData,
    setInstructorDashboardResMessage,
    instructorCoursesList,
    setInstructorCoursesList,
    allRecommendedCoursesList,
    setAllRecommendedCoursesList,
    allUsersList,
    setAllUsersList,
    reqType,
    filterDegree,
  } = useContext(InstructorContext);
  const { darkMode, setDarkMode } = useDarkMode();
  const [hideSidebar, setHideSideBar] = useState(false);

  async function fetchInstructorDashboardData() {
    const response = await fetchInstructorDashboardDataService(
      reqType.toLowerCase() || "enrolled",
      filterDegree
    );
    console.log("DashboardRes: ", response);
    if (response?.success) {
      setInstructorDashboardData(response?.data);
      setInstructorDashboardResMessage(response?.message);
    }
  }

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  async function fetchAllRecommnededCourses() {
    const response = await getRecommendCoursesService("user");
    if (response?.success) setAllRecommendedCoursesList(response?.data);
  }

  async function fetchAllUsersList() {
    const response = await getAllUsersDetailsService("user");
    if (response?.success) setAllUsersList(response?.data);
  }

  useEffect(() => {
    fetchInstructorDashboardData();
  }, [reqType,filterDegree]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    fetchAllRecommnededCourses();
  }, []);

  useEffect(() => {
    fetchAllUsersList();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "Dashboard",
      component: (
        <InstructorDashboard
          dashboardData={calculateTotalProvidedCoursesAndStudentsAndProfit()}
          filteredData={instructorDashboardData}
        />
      ),
    },
    {
      icon: Book,
      label: "Create Courses",
      value: "Create Courses",
      component: (
        <InstructorCourses
          allRecommendedCoursesList={allRecommendedCoursesList}
        />
      ),
    },
    {
      icon: IndianRupee,
      label: "Revenue on Courses",
      value: "Revenue on Courses",
      component: (
        <InstructorRevenueOnCourses
          listOfCourses={instructorCoursesList}
          totalStudentsAndProfit={calculateTotalProvidedCoursesAndStudentsAndProfit()}
        />
      ),
    },
    {
      icon: Users,
      label: "Users List",
      value: "Users List",
      component: <StudentsList allUsersList={allUsersList} />,
    },
    {
      icon: CircleUserRound,
      label: "Profile",
      value: "Profile",
      component: <InstructorProfile profile={loginDetails} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  console.log(instructorCoursesList, "instructorCoursesList");

  function calculateTotalProvidedCoursesAndStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } =
      instructorCoursesList.reduce(
        (acc, course) => {
          const studentCount = course.students.length;

          acc.totalStudents += studentCount;
          // acc.totalProfit += course.pricing * studentCount;
          // console.log("Course: ", course);
          course.students.forEach((student) => {
            acc.totalProfit += parseInt(student.paidAmount);
            acc.studentList.push({
              studentId: student.studentId,
              courseTitle: course.title,
              paidAmount: student.paidAmount,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });

          return acc;
        },
        {
          totalStudents: 0,
          totalProfit: 0,
          studentList: [],
        }
      );

    return {
      totalProvidedCourses: instructorCoursesList?.length || 0,
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  return (
    <div className="flex-1 md:flex flex-wrap overflow-auto bg-gray-100 dark:bg-slate-900 animate-appear duration-500">
      <aside
        className={`${
          hideSidebar ? "md:nav-inactive" : "h-full md:h-auto md:nav-active"
        } md:min-h-screen w-full md:w-full absolute md:sticky top-0 z-10 md:visible overflow-clip bg-white dark:bg-slate-950 shadow-md`}
      >
        <div
          className={`${hideSidebar ? "h-16 md:h-max" : "h-full"} p-4 w-full`}
        >
          <span className="flex items-center justify-between">
            <h1
              className={`${
                hideSidebar ? "visible md:hidden" : ""
              } text-2xl font-bold text-center hover:cursor-default`}
            >
              ADMIN VIEW
            </h1>

            <Menu
              onClick={() => setHideSideBar(!hideSidebar)}
              className="hover:cursor-pointer"
            />
          </span>

          <nav className={`mt-4 top-10`}>
            {menuItems.map((menuItem, index) =>
              !hideSidebar ? (
                <Button
                  className={`${
                    activeTab === menuItem.value
                      ? "bg-zinc-900 text-yellow-600"
                      : "white"
                  } w-full justify-start mb-2 dark:text-yellow-600 hover:text-yellow-600 hover:bg-gradient-to-r from-[#000000] to-[#434343] animate-appear duration-500`}
                  key={index}
                  variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                  onClick={
                    menuItem.value === "logout"
                      ? handleLogout
                      : () => setActiveTab(menuItem.value)
                  }
                >
                  <menuItem.icon className="mr-2 h-4 w-4 my-6" />
                  {menuItem.label}
                </Button>
              ) : (
                <menuItem.icon
                  key={index}
                  onClick={
                    menuItem.value === "logout"
                      ? handleLogout
                      : () => setActiveTab(menuItem.value)
                  }
                  className={`${
                    activeTab === menuItem.value ? "text-yellow-600" : "white"
                  } mr-2 h-4 w-4 my-6 hover:cursor-pointer dark:hover:text-yellow-700`}
                />
              )
            )}
            {
              !hideSidebar ? (
                <Button
                  className="w-full bg-inherit text-black dark:bg-white justify-start mb-2 dark:text-yellow-600 hover:text-yellow-600 hover:bg-gradient-to-r from-[#000000] to-[#434343] animate-appear duration-1000"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun /> : <Moon />}
                  &nbsp;
                  <span>
                    {darkMode ? "Enable Light Mode  " : "Enable Dark Mode  "}
                  </span>
                </Button>
              ) : darkMode ? (
                ""
              ) : (
                ""
              )
              // {/*<Sun/>:<Moon/>*/}
            }
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-h-screen p-8 overflow-clip cal-main-w md:max-w-[80%] mt-10 md:m-0 md:mx-auto">
        <h1 className="text-3xl w-full text-center bg-gradient-to-bl from-[#000000] to-[#434343] text-yellow-600 border p-2 rounded-2xl break-words font-bold mb-8 dark:text-yellow-600">
          {activeTab.toUpperCase()}
        </h1>
        <div className="w-full md:w-full mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem, index) => (
              <TabsContent key={index} value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
