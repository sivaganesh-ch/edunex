const StudentCourses = require("../../models/StudentCourses");
const StudentCoursesProgress = require("../../models/CourseProgress");

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });
    // const studentBoughtCoursesProgress = await StudentCoursesProgress.findOne({
    //   userId: studentId,
    // });

    // const organizeStudentBoughtCourses = async () => {
    //   const data = [];

    //   for (let eachCourse of studentBoughtCourses) {
    //     const eachCourseCpy = eachCourse.toObject();

    //     let foundCourseInProgress = studentBoughtCoursesProgress.find(
    //       (eachProgressCourse) =>
    //         eachProgressCourse.courseId == eachCourseCpy?.courseId
    //     );

    //     if (foundCourseInProgress?.completed) {
    //       eachCourseCpy["completed"] = true;
    //       eachCourseCpy["completionDate"] = foundCourseInProgress?.completionDate;
    //       eachCourseCpy["courseStatus"] = "Download";
    //     }
    //     else {
    //       eachCourseCpy["completed"] = false;
    //       eachCourseCpy["completionDate"] = "Not-Completed";
    //     }
    //     data.push(eachCourseCpy);
    //   }

    //   return data;
    // };

    res.status(200).json({
      success: true,
      data: studentBoughtCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { getCoursesByStudentId };
