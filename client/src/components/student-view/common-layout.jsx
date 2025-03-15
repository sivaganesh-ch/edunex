import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import StudentViewCommonFooter from "./footer";

function StudentViewCommonLayout( { loginDetails } ) {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader loginDetails={loginDetails} />
      ) : null}

      <Outlet />
      <StudentViewCommonFooter />
    </div>
  );
}

export default StudentViewCommonLayout;
