const RecommendedCourse = require("../../models/CourseRecommendation");

const saveRecommendCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new RecommendedCourse(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    res.status(201).json({
      success: true,
      message: "Course saved successfully",
      // data: saveCourse,
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllRecommendedCourses = async (req, res) => {
  try {
    const coursesList = await RecommendedCourse.find({});

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteRecommendedCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RecommendedCourse.findByIdAndDelete(id);

    if (deleted !== null) {
      res.status(200).json({
        success: true,
        message: "Deleted Successfully...!",
      });
    }
    else {
      res.json({
        success: false,
        message: "No Recommendations Found",
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
    saveRecommendCourse,
    getAllRecommendedCourses,
  };
  