import axiosInstance from "@/api/axiosInstance";
import { ErrorMessage } from "@/components/Alert-Toast";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", formData)
  .catch((error)=> ErrorMessage(error.message));

  return data;
}

export async function loginService(formData) {

  
    const { data } = 
      await axiosInstance.post("/auth/login", formData)
      .catch((error)=>{
        // console.log(error)
        ErrorMessage(error.message)
      });
    
    return data;
}

export async function checkAuthService() {
  try {
    const { data } = await axiosInstance.get("/auth/check-auth");
    
    return data;
    
  } catch (error) {
    if(error?.status!==401){
      ErrorMessage(error.message);
    }
    
  }
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorDashboardDataService(reqType, filterDegree) {
  
  const { data } = await axiosInstance.get(`/user/get/${reqType}/${filterDegree}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}

export async function getRecommendCoursesService() {
  const { data } = await axiosInstance.get(`/student/course-recommendation/get`);

  return data;
}

export const getAllUsersDetailsService = async (role) => {
  const { data } = await axiosInstance.get(`/user/all-details/${role}`);

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function youtubeBulkVideosUploadService(playListId, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/playlist-upload", playListId, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });
  console.log("res from client : ",data)
  return data;
}



export async function fetchStudentViewCourseListService(query) {
  console.log("query : ", query)
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function updateLectureViewed(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId, progressValue) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
      progressValue,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}

export async function recommendCourseService(formData) {
  const { data } = await axiosInstance.post(`/student/course-recommendation/add`, formData);

  return data;
}

export async function getStudentDetailsService(userId, resType) {
  const { data }  = await axiosInstance.get(`/user/course-details/${userId}`);
  // console.log("res: ", data)
  if (resType === "userDetails" && data?.success) return data?.data?.userDetails;
  return data;
};