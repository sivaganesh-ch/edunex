import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTableCard from "../common-table/CommonTableCard";

function InstructorCourses({ allRecommendedCoursesList }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const RecommendedCoursesConfig = [      
    {
      name: "_id",
      label: "Id",
      options: {
        display:false,
        filter: true,
        sort: true,
      }
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        disableRowSelectionOnClick: true,
        customHeadLabelRender: () => (
          <p className="font-bold text-center">{"ACTION"}</p>
        ),
        customBodyRender: (index) => (
          <Button className="h-full w-full m-0" onClick={()=>handleRemove(index)} >
            <Trash2 className="hover:text-red-800"/>
          </Button>
        ),
      }
    },
    {
      name: "rollNo",
      label: "Roll.No",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "User Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "emailId",
      label: "Email-Id",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "mobileNo",
      label: "Mobile.No",
      options: {
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
    {
      name: "courseName",
      label: "Course Name",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <p className="w-[200px]">{"Course Name"}</p>
        ),
      }
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <p className="text-center w-[300px]">{"Description"}</p>
        ),
        customBodyRender: (description) => (description)
      }
    },
    {
      name: "lectures",
      label: "No.Of Lectures",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (lectures) => (
          <p className="text-center">{lectures?.length}</p>
        )
      }
    },
    
    {
      name: "contentType",
      label: "Content Type",
      options: {
        filter: true,
        sort: true,
        customBodyRender: () => "YouTube"
      }
    },
  ]

  const handleRemove = (index) => {
    alert(`Removing row-${index + 1}`);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">ALL COURSES</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6 font-bold"
        >
          CREATE NEW COURSE
        </Button>
      </CardHeader>

      <CardHeader>
        <CardTitle className="border-t-2 p-2 border-black dark:border-white text-2xl font-extrabold text-center text-yellow-600">
          RECOMMENDED COURSES
        </CardTitle>
      </CardHeader>

      <CommonTableCard
        pageLocation={"CreateCourse"}
        rowClickable={true}
        // title={"RECOMMENDED COURSES"}
        columns={RecommendedCoursesConfig}
        data={allRecommendedCoursesList}
      />
    </Card>
  );
}

export default InstructorCourses;
