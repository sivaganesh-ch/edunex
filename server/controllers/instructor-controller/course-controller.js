const Course = require("../../models/Course");
const CourseRecommendation = require("../../models/CourseRecommendation");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
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

const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});

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

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    const courseRecommendDetails = await CourseRecommendation.findById(id);

    if (courseDetails) {
      return res.status(200).json({
        success: true,
        data: courseDetails,
      });
    }
    if (courseRecommendDetails) {
      console.log(courseRecommendDetails)
      // const data = {
      //   instructorId: "",
      //   instructorName: "",
      //   date: "",
      //   title: courseRecommendDetails?.courseName,
      //   category: courseRecommendDetails?.category,
      //   level: "",
      //   primaryLanguage: "",
      //   subtitle: "",
      //   description: courseRecommendDetails?.description,
      //   image: "",
      //   welcomeMessage: "",
      //   pricing: 0,
      //   objectives: "",
      //   // students: [
      //   //   {
      //   //     studentId: String,
      //   //     studentName: String,
      //   //     studentEmail: String,
      //   //     paidAmount: String,
      //   //   },
      //   // ],
      //   curriculum: [{
      //     title: "",
      //     videoUrl: courseRecommendDetails?.lectures[0].url,
      //     public_id: "",
      //     freePreview: false,
      //   }],
      //   isPublised: false,
      // }

      const data = {
        _id: courseRecommendDetails?._id,
        instructorId: "",
        instructorName: "",
        date: "1735034514952",
        title: courseRecommendDetails?.courseName,
        category: courseRecommendDetails?.category,
        level: "",
        primaryLanguage: "",
        subtitle: "",
        description: courseRecommendDetails?.description,
        image:
          "",
        welcomeMessage: "",
        pricing:  "",
        objectives: "check, console",
        students: [
          {
            studentId: "",
            studentName: "",
            studentEmail: "",
            paidAmount: "",
            _id: "",
          },
          {
            studentId: "",
            studentName: "",
            studentEmail: "",
            paidAmount: "",
            _id: "",
          },
        ],
        curriculum: [
          {
            title: "",
            videoUrl:
              "",
            public_id: "",
            freePreview: false,
            _id: "",
          },
          {
            title: "",
            videoUrl:
              "",
            public_id: "",
            freePreview: false,
            _id: "",
          },
        ],
        isPublised: true,
        __v: "0",
      };

      console.log("data: ",data)

      return res.status(200).json({
        success: true,
        data: data,
      });
    }

    res.status(404).json({
      success: false,
      message: "Course not found!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByID,
  getCourseDetailsByID,
};
