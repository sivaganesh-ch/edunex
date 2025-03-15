const mongoose = require("mongoose");
const UserDB = require("../../models/User");
const CoursesDB = require("../../models/Course");
const UserCoursesDB = require("../../models/StudentCourses");
const UserCoursesProgressDB = require("../../models/CourseProgress");

function formatDateTime(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${day}/${month}/${year} - ( ${hours}:${minutes}:${seconds} ${ampm} )`;
}

const getUserCourseDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.json({ success: false, message: "User Not Found...!" });
    }
    const UserDetails = await UserDB.findById(userId);
    if (UserDetails?.length == 0 || !UserDetails) {
      res.json({ success: false, message: "User Not Found...!" });
    }
    console.log("Details: ", UserDetails);
    let UserDetailsCopy = UserDetails.toObject();
    const UserCourses = await UserCoursesDB.find({ userId: userId });
    const UserCoursesProgress = await UserCoursesProgressDB.find({
      userId: userId,
    });

    const getActualCourseDetails = async (courseId) => {
      const Courses = await CoursesDB.findOne({ _id: courseId });
      console.log("Courses: ", Courses?.curriculum.length);
      const data = {
        // contentType: Courses.contentType,
        category: Courses?.category,
        NoOfLectures: Courses?.curriculum.length,
      };
      // console.log("data from actualCourseData: ", data);
      return data;
    };

    const extractProgressOnEachCourse = async (
      targetCourseId,
      UserCoursesProgress
    ) => {
      // UserCoursesProgress.map((eachCourse, i) => {
      const eachCourseLectureStatus = async (
        eachCourseArray,
        targetCourseId
      ) => {
        var lectureProgress = {};
        console.log("cId ", eachCourseArray);
        // console.log(eachCourse)
        if (eachCourseArray?.length !== 0) {
          const eachCourse = eachCourseArray[0];
          const eachCourseId = eachCourse?.courseId;

          // console.log("before: "+eachCourseId+" = "+targetCourseId)
          if (eachCourseId === targetCourseId) {
            // console.log("true: "+eachCourseId+" = "+targetCourseId)
            const lectureStatusInEachCourse = {
              inComplete: 0,
              inProgress: 0,
              completed: 0,
            };

            // console.log("Each Course", eachCourse)
            // console.log(
            //   "Lectures in Course: ",
            //   eachCourse.lecturesProgress.length
            // ); // No.of Lectures in a course
            lectureProgress["totalLectures"] =
              eachCourse.lecturesProgress.length;
            if (eachCourse.completed) {
              // All Lectures Completed No Need to check
              lectureStatusInEachCourse.completed =
                eachCourse.lecturesProgress.length;
            } else {
              eachCourse.lecturesProgress.map(async (eachLecture, i) => {
                if (eachLecture.viewed) {
                  // completed
                  lectureStatusInEachCourse.completed += 1;
                } else {
                  if (eachLecture.progressValue === 0) {
                    // inComplete
                    lectureStatusInEachCourse.inComplete += 1;
                  } else {
                    lectureStatusInEachCourse.inProgress += 1;
                  }
                }
              });
            }
            lectureProgress["lectureStatus"] = lectureStatusInEachCourse;
          }
        }
        // else {
        //   console.log("CouId: ", targetCourseId)
        //   let { NoOfLectures } = getActualCourseDetails(targetCourseId);
        //   lectureProgress = {
        //     totalLectures: NoOfLectures,
        //     lectureStatus: { inComplete: NoOfLectures, inProgress: 0, completed: 0 }
        //   }
        // }

        return lectureProgress;
      };
      // });

      let eachCourse = UserCoursesProgress.filter((eachCourseItem) => {
        return eachCourseItem.courseId == targetCourseId;
      });
      // console.log("FoundCourse: ", eachCourse[0])
      console.log("Check ", eachCourse);

      var lectureProgress = {};
      if (eachCourse?.length !== 0) {
        lectureProgress = await eachCourseLectureStatus(
          eachCourse,
          targetCourseId
        );
      } else {
        console.log("TargetCourseID: ", targetCourseId);
        let { NoOfLectures } = await getActualCourseDetails(targetCourseId);
        lectureProgress = {
          totalLectures: NoOfLectures,
          lectureStatus: {
            inComplete: NoOfLectures,
            inProgress: 0,
            completed: 0,
          },
        };
      }

      // console.log("lectureStatus: ", lectureProgress)

      return lectureProgress;
    };

    const findCourseStatus = (lectures) => {
      let totalLectures = lectures?.totalLectures;
      let overallLecturesStatus = lectures?.lectureStatus;

      if (!lectures || !totalLectures || !overallLecturesStatus)
        return "inComplete";

      if (totalLectures === overallLecturesStatus?.completed) {
        return "completed";
      } else if (
        lectures?.totalLectures === overallLecturesStatus?.inComplete
      ) {
        return "inComplete";
      } else {
        return "inProgress";
      }
    };

    const findUserOverallCourseStatus = (allCoursesDetails) => {
      const overallCoursesStatus = {
        inComplete: 0,
        inProgress: 0,
        completed: 0,
      };

      allCoursesDetails.map((eachCourse, i) => {
        let courseStatus = eachCourse?.courseStatus;
        if (courseStatus === "completed") {
          overallCoursesStatus.completed += 1;
        } else if (courseStatus === "inProgress") {
          overallCoursesStatus.inProgress += 1;
        } else {
          overallCoursesStatus.inComplete += 1;
        }
      });

      return overallCoursesStatus;
    };

    const extractStructuredData = async (UserCourses, UserCoursesProgress) => {
      let studentAllCoursesDetails = [];

      console.log("User Courses: ", UserCourses[0].courses);
      if (!UserCourses[0]?.courses) return [];

      studentAllCoursesDetails = await Promise.all(
        UserCourses[0].courses.map(async (eachCourse) => {
          const eachCourseData = {};
          let dateOfPurchase = eachCourse?.dateOfPurchase;
          eachCourseData["courseId"] = eachCourse?.courseId;
          eachCourseData["dateOfPurchase"] = await formatDateTime(
            dateOfPurchase
          );
          eachCourseData["title"] = eachCourse.title;
          eachCourseData["instructorName"] = eachCourse.instructorName;
          let lectures = await extractProgressOnEachCourse(
            eachCourse.courseId,
            UserCoursesProgress
          );
          console.log("Lectures: ", lectures);
          eachCourseData["lectures"] = lectures;
          let { category } = await getActualCourseDetails(eachCourse.courseId);
          eachCourseData["category"] = category;
          eachCourseData["courseStatus"] = findCourseStatus(lectures);

          return eachCourseData; // Collecting the processed object
        })
      );

      // console.log("studentAllCoursesDetails Outside:", studentAllCoursesDetails); // Now logs correctly
      return studentAllCoursesDetails;
    };

    if (UserDetailsCopy.length !== 0) {
      // UserCourses.length !==0 && UserCoursesProgress.length!==0

      delete UserDetailsCopy.password; // deleting password from UserDetails Copy to hide from user
      delete UserDetailsCopy.__v; // deleted un-used key __v

      UserDetailsCopy["youtubeContent"] = 0; // count of users Youtube Courses
      UserDetailsCopy["collegeContent"] = 0; // count of users college Courses
      // User Image/ Profile
      UserDetailsCopy["img"] =
        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg";

      if (UserCourses.length !== 0 && UserCoursesProgress.length !== 0) {
        const allCoursesDetails = await extractStructuredData(
          UserCourses,
          UserCoursesProgress
        );

        UserDetailsCopy["totalEnrolledCourses"] = allCoursesDetails.length;
        const data = {
          userId: UserCourses[0]?.userId,
          userDetails: UserDetailsCopy,
          enrolledCourses: allCoursesDetails.length,
          overallCoursesStatus: findUserOverallCourseStatus(allCoursesDetails),
          allCoursesDetails: allCoursesDetails,
        };

        if (allCoursesDetails.length !== 0) {
          res.json({
            success: true,
            data: data,
          });
        }
      } else {
        UserDetailsCopy["totalEnrolledCourses"] = 0;
        let data = {
          userId: UserCourses[0]?.userId,
          userDetails: UserDetailsCopy,
          enrolledCourses: 0,
          overallCoursesStatus: {},
          allCoursesDetails: [],
        };

        res.json({
          success: true,
          data: data,
        });
      }
    } else {
      res.status(200).json({
        succes: false,
        message: "User Not Found...!",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getUserCourseDetails,
  formatDateTime,
};
