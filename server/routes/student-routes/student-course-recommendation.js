const express = require("express");
const {
  saveRecommendCourse,
  getAllRecommendedCourses
} = require("../../controllers/student-controller/recommend-course-controller");
const router = express.Router();

router.post("/add", saveRecommendCourse);
router.get("/get", getAllRecommendedCourses);
router.delete("/delete", getAllRecommendedCourses);

module.exports = router;