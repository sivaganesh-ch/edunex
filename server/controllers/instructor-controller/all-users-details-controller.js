const mongoose = require("mongoose");
const UserDB = require("../../models/User");
const UserCoursesDB = require("../../models/StudentCourses");
const { formatDateTime } = require("../user-controller/user-course-details");

const getAllUsersDetails = async (req, res) => {
  try {
    const { role } = req.params;

    console.log("role", role)
    const findUserDetails = async () => {
      if (
        // role === "user" &&
        role !== "all" &&
        role !== "" &&
        role !== null &&
        role !== undefined
      ) {
        const AllUsersDetails = await UserDB.find({ role });
        const AllUsersCourses = await UserCoursesDB.find();

        return { AllUsersDetails, AllUsersCourses };
      } else if (role === "all") {
        const AllUsersDetails = await UserDB.find();
        const AllUsersCourses = await UserCoursesDB.find();
        let data = {
          AllUsersDetails,
          AllUsersCourses,
        };
        return data;
      }
    };

    const { AllUsersDetails, AllUsersCourses } = await findUserDetails();

    // console.log("Details ", AllUsersDetails);
    // console.log("AllCourses ", AllUsersCourses);

    const findUserTotalCoursesById = (eachUserId) => {
      let existedUser = AllUsersCourses.find(
        (eachCourse) => eachCourse.userId == eachUserId
      );
      // console.log("userCourses: ", existedUser);

      return existedUser ? existedUser?.courses?.length || 0 : 0;
    };

    const data = await Promise.all(
      AllUsersDetails.map(async (eachUser) => {
        // Make map() function async
        let eachUserCpy = eachUser.toObject();
        let eachUserId = eachUser?._id;

        const totalEnrolledCourses = await findUserTotalCoursesById(eachUserId); // Await async function
        // console.log("Total Enrolled Courses: ", totalEnrolledCourses);

        return {
          ...eachUserCpy,
          password: undefined,
          __v: undefined,
          totalEnrolledCourses: totalEnrolledCourses,
        };
      })
    );

    // console.log(data); // Now data is correctly populated with resolved promises

    if (data.length !== 0) {
      res.json({
        success: true,
        data: data,
      });
    } else {
      res.json({
        success: false,
        message: "No Records Found...!",
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
  getAllUsersDetails,
};
