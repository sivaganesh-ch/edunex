import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import StudentRecommendedCourse from "./pages/student/student-course-recommendation";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
// import ExtractYouTubeVideoPlaylistId from "./components/instructor-view/courses/add-new-course/ExtractYouTubeVideoPlaylistId";
// import CourseRecommendationForm from "./pages/student/student-course-recommendation";
import CertificateGenerator from "./components/certificate-generator/CertificateGenerator";
import AdminPanel from "./components/certificate-generator2/AdminPanel";
import CertificatePage from "./components/certificate-generator2/CertificatePage";
import StudentActivityPage from "./components/profile/student-profile/StudentActivityPage";
import StudentProfile from "./components/profile/student-profile";
// import BarChartReferTable from "./pages/instructor/BarChartReferTable";
import BubbleEditor from "./components/certificate-generator2/BubbleEditor";
import StudentViewCommonFooter from "./components/student-view/footer";
import AboutUs from "./pages/footer-pages/AboutUs";
import PrivacyPolicy from "./pages/footer-pages/PrivacyPolicy";
import TermsOfService from "./pages/footer-pages/TermsOfService";
import TipTapBubbleEditor from "./components/certificate-generator2/TipTapBubbleEditor";
// import CanvasComponent from "./components/certificate-generator/Components/CanvasComponent";

function App() {
  const { auth } = useContext(AuthContext);

  console.log("auth", auth);

  return (
    <div>
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              element={<AuthPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route path="/footer" element={<StudentViewCommonFooter/>}/>
        <Route
          path="/instructor"
          element={
            <RouteGuard
              element={<InstructorDashboardpage loginDetails={auth?.user} />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/certificate-generator"
          element={<CertificateGenerator />}
        />
        <Route
          path="/certificate-editor"
          element={<CertificateGenerator />}
        />
        <Route path="/admin-page" element={<AdminPanel />} />
        <Route path="/admin-setup" element={<TipTapBubbleEditor/>} />
        <Route path="/bubble-editor" element={<BubbleEditor/>
        } />
        <Route path="/user-page" element={<CertificatePage />} />
        {/* <Route path="/upload-youtube-playlist" element={<ExtractYouTubeVideoPlaylistId/>}/> */}
        {/* <Route path="/course-recommendation-form" element={<CourseRecommendationForm/>}/>
      <Route path="/progress" element={<StudentViewCourseProgressPage/>}/> */}
        <Route
          path="/instructor/create-new-course"
          element={
            <RouteGuard
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor/create-new-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCoursePage pageType={"addRecommendCourse"} />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        {/* Public */}
        <Route
          path="/info/:id"
          element={
            <StudentActivityPage location={"public"} />
            // <RouteGuard
            //   element={<StudentActivityPage />}
            //   authenticated={auth?.authenticate}
            //   user={auth?.user}
            // />
          }
        />
        {/* Instructor/ Admin */}
        <Route
          path="/instructor/info/:id"
          element={
            <RouteGuard
              element={<StudentActivityPage location={"instructor"} />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
        <Route
          path="/"
          element={
            <RouteGuard
              element={<StudentViewCommonLayout loginDetails={auth?.user} />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        >
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentViewCoursesPage />} />
          <Route
            path="recommend-course"
            element={<StudentRecommendedCourse loginDetails={auth?.user} />}
          />
          <Route
            path="course/details/:id"
            element={<StudentViewCourseDetailsPage />}
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route path="student-courses" element={<StudentCoursesPage />} />
          {/* <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        /> */}
          {/* Student */}
          <Route
            path="/profile/:id"
            element={
              <RouteGuard
                element={<StudentActivityPage location={"user"} />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-of-service" element={<TermsOfService/>} />
          
        </Route>
        <Route path="/about" element={<AboutUs/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/terms" element={<TermsOfService/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
