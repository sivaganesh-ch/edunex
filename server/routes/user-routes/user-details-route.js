const express = require("express");
const {
  getUserCourseDetails
} = require("../../controllers/user-controller/user-course-details");
const { 
  getDashboardData,
} = require("../../controllers/instructor-controller/dashboard-details-controller");
const { 
  getAllUsersDetails,
} = require("../../controllers/instructor-controller/all-users-details-controller");

const router = express.Router();

router.get("/get/:reqType/:userDegree", getDashboardData);
router.get("/course-details/:userId", getUserCourseDetails);
router.get("/all-details/:role", getAllUsersDetails);

module.exports = router;