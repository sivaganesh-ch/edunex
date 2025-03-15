import { courseCategories } from "@/config";
import banner from "../../../../public/pic1.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate, useSearchParams } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    console.log("Stringify: ", JSON.stringify(currentFilter));
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses(filter) {
    const query = new URLSearchParams({
      ...filter,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses({category:"cloud-computing"}); // Preload Content latest courses
  }, []);

  return (
    <div className="min-h-screen ">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8 max-h-screen">
        <div className="lg:w-1/2 lg:pr-12 mb-10 animate-trans-right">
          <h1 className="text-4xl font-bold mb-4 text-center dark:text-yellow-600 animate-pulse">Your Success is Our Mission</h1>
          <h6 className="text-xl italic font-serif text-center animate-pulses">
          "The skills you acquire today can shape a better tomorrow"
          </h6>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={200}
            height={100}
            className="w-full h-auto rounded-lg shadow-xl shadow-gray-300 animate-trans-left"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100 dark:bg-zinc-600">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start hover:scale-105"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Latest Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem, index) => (
              <div
                key={index}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow-xl cursor-pointer hover:scale-105"
              >
                
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover animate-pulse hover:animate-none"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-zinc-200 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px] dark:text-yellow-600 animate-pulse">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="animate-bounce dark:text-yellow-600 text-3xl">No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
