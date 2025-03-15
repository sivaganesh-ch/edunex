import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { recommendCourseService } from "../../../services";
import AlertMessage, {
  ErrorMessage,
  SuccessMessage,
} from "@/components/Alert-Toast";

const index = ({ loginDetails }) => {
  const inputFieldcontents = [{ name: "" }];

  const courseCategory = ["Web Development", "Software Development", "Others"];

  const [Lectures, setLectures] = useState([{ LectureType: "video", url: "" }]);

  const [inputFieldData, setInputFieldData] = useState({
    name: loginDetails?.userName,
    rollNo: loginDetails?.userRollNo || "21H71A0581",
    emailId: loginDetails?.userEmail,
    mobileNo: loginDetails?.userMobileNo || "90xxxxxx09",
    category: "Web Development",
    courseName: "",
    description: "",
  });

  console.log("InputFields: ", inputFieldData);

  const handleAddLecture = (index) => {
    const newInputs = [...Lectures];
    newInputs.splice(index + 1, 0, { LectureType: "video", url: "" }); // Insert below
    setLectures(newInputs);
  };

  const handleInputFieldData = (event) => {
    const { name, value } = event.target;
    const newData = { ...inputFieldData };
    newData[name] = value;
    setInputFieldData(newData);
  };

  const handleLectureChangeInput = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...Lectures];
    newInputs[index][name] = value;
    setLectures(newInputs);
  };

  // Function to remove an input field
  const handleRemoveLecture = (index) => {
    setLectures((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

  const resetFormData = () => {
    setInputFieldData({
      name: loginDetails?.userName,
      rollNo: loginDetails?.userRollNo || "21H71A0581",
      emailId: loginDetails?.userEmail,
      mobileNo: loginDetails?.userMobileNo || "90xxxxxx09",
      category: "Web Development",
      courseName: "",
      description: "",
    });

    setLectures(
      [{ LectureType: "video", url: "" }]
    )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...inputFieldData,
      lectures: Lectures,
    };
    console.log("recommend Course Data: ", formData);
    try {
      const response = await recommendCourseService(formData);
      console.log("response: ", response);
      if (response?.success) {
        SuccessMessage(response?.message || "Submit Successfully...!");
        resetFormData();
      } else {
        ErrorMessage(response?.message || "Submission Failed...!");
      }
    } catch (error) {
      ErrorMessage(error.message);
    }
  };

  const verifyAllFields = () => {
    if (
      inputFieldData.courseName !== "" &&
      inputFieldData.description !== "" &&
      Lectures.length !== 0 &&
      Lectures[0].url !== ""
    ) {
      return true;
    }
    return false;
  };

  console.log("Recommended Videos: ", Lectures);
  return (
    <div className="wrapper break-words flex justify-center items-center bg-[#ccd3e2] dark:bg-slate-900 min-w-full min-h-screen">
      <AlertMessage />
      <div className="max-w-3xl min-h-[calc(100vh-50px)] w-full rounded-3xl px-1 py-3 relative">
        <form
          onSubmit={handleSubmit}
          className="boxShadow relative shadow-2xl bg-gray-200 text-black rounded-md border border-cyan-50  min-h-full max-w-3xl m-4"
        >
          <div className="form-header border-2 border-b-gray-600 py-7 px-10 min-w-full text-center font-bold">
            <h1 className="text-4xl">EduNex</h1>
            <h3 className="font-semibold leading-9">
              Recommend a Course to Instructor
            </h3>
          </div>
          <div className="form-body py-7 px-10 min-w-full">
            <section className="section">
              <input
                type="text"
                readOnly
                autoComplete="off"
                name="name"
                value={inputFieldData.name}
                className="inputField"
                placeholder="Enter Name"
              />
              <input
                type="text"
                readOnly
                autoComplete="off"
                name="rollNo"
                value={inputFieldData.rollNo}
                className="inputField"
                placeholder="Enter Roll.No"
              />
            </section>

            <section className="section">
              <input
                type="text"
                readOnly
                autoComplete="off"
                name="emailId"
                value={inputFieldData.emailId}
                className="inputField"
                placeholder="Email Id"
              />
              <input
                type="text"
                readOnly
                autoComplete="off"
                name="mobileNo"
                value={inputFieldData.mobileNo}
                className="inputField"
                placeholder="Mobile.No"
              />
            </section>

            <section className="section border-b-black">
              <select
                name="category"
                defaultValue={inputFieldData.category}
                onChange={(e) => handleInputFieldData(e)}
                className="w-full inputField"
              >
                {courseCategory.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </section>

            <section className="section">
              <input
                type="text"
                required
                autoComplete="off"
                name="courseName"
                value={inputFieldData.courseName}
                className="inputField"
                placeholder="Enter Course Name"
                onChange={(e) => handleInputFieldData(e)}
              />
            </section>

            <section className="bg-[#d0d3da] rounded-md px-2 mb-4">
              <h1 className="text-xl font-semibold px-2 py-3">
                Add Course Videos
              </h1>

              {Lectures.map((item, index) => (
                <div key={index} className="border-b-black border-b-2 py-3">
                  <section key={index} className="section border-b-black">
                    <select
                      name="LectureType"
                      onChange={(e) => handleLectureChangeInput(index, e)}
                      value={item.LectureType}
                      className="md:w-[30%] rounded-lg px-2 py-3"
                    >
                      <option value="video">Video</option>
                      <option value="playlist">PlayList</option>
                    </select>
                    <input
                      type="text"
                      autoComplete="off"
                      name="url"
                      value={item.url}
                      onChange={(e) => handleLectureChangeInput(index, e)}
                      className="inputField"
                      placeholder="Enter Url"
                      required
                    />
                  </section>
                  <section className="flex justify-end">
                    {Lectures.length !== 1 && (
                      <button
                        name={index}
                        className="text-red-700 bg-transparent mr-10 hover:scale-110"
                        onClick={() => handleRemoveLecture(index)}
                      >
                        <Trash2 />
                      </button>
                    )}
                    <button
                      className="text-white bg-black rounded-lg p-1 hover:scale-110"
                      onClick={() => handleAddLecture(index)}
                    >
                      <Plus />
                    </button>
                  </section>
                </div>
              ))}
            </section>

            <section className="section">
              <input
                type="text"
                required
                autoComplete="off"
                name="description"
                value={inputFieldData.description}
                className="inputField"
                placeholder="Description about Course"
                onChange={(e) => handleInputFieldData(e)}
              />
            </section>

            <section className="section place-self-center ">
              <input
                type="submit"
                value="Submit"
                disabled={!verifyAllFields()}
                className={`${
                  !verifyAllFields()
                    ? "bg-black/70 shadow-xl"
                    : "bg-black hover:scale-105 hover:text-yellow-500"
                } px-10 py-3 mt-10 text-white font-bold rounded-3xl`}
              />
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
