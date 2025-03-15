const mongoose = require("mongoose");

const StudentCourseRecommendation = new mongoose.Schema({
  rollNo: String,
  name: String,
  emailId: String,
  mobileNo: String,
  category: String,
  courseName:String,
  description: String,
  lectures: [
    { LectureType: String, url: String },
  ],
});

module.exports = mongoose.model("CourseRecommedation", StudentCourseRecommendation);
