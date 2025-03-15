import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { progress } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    console.log("Response of Course : ", response)
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        console.log("progress : ", response?.data?.progress)
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });
        
        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress(currentLectureItem) {
    console.log("Updating this Lecture : ", currentLectureItem);
    if (currentLectureItem.progressValue) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLectureItem._id,
        currentLectureItem.progressValue //
      );

      if (response?.success) {
        fetchCurrentCourseProgress(); //
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue >0){ 
      updateCourseProgress(currentLecture);
      console.log("Backend UpdateCourseProgress Called")
    }
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, "currentLecture");

  function handleMaxWatched(currentLectureId){
    const Lecture = studentCurrentCourseProgress?.progress?.find(
      (progressItem) => progressItem.lectureId === currentLectureId
    )
    
    if(Lecture?.viewed){
      return { viewed:true, progress : 1 }
    }
    else {
      return { viewed:false, progress : Lecture?.progressValue || 0 }
      // return Lecture?.progressValue || 0
    }
  }

  const maxWatched = handleMaxWatched(currentLecture?._id)
  // console.log("Max Watched from Course Progress : ", maxWatched);

  async function handleLectureClick(index, item) {
    
    console.log("index = ", index)
    if(index===0){
      setCurrentLecture(item);
    }
    else if(index>0) {
      const prevLectureViewed = studentCurrentCourseProgress?.progress[index-1]?.viewed;
      if(prevLectureViewed) {
        console.log("Entered...")
        await callBackendUpdateMaxPlayed();
        setCurrentLecture(item);
      }
    }
    else {
      const currentLectureViewed = studentCurrentCourseProgress?.progress[index]?.viewed;
      if (currentLectureViewed) {
        await callBackendUpdateMaxPlayed();
        setCurrentLecture(item);
      }
    }
  }

  // console.log("before setting maxPlayed : ", maxWatched.progress);
  
  const [maxPlayed, setMaxPlayed] = useState(maxWatched?.progress);
  // const [maxPlayed, setMaxPlayed] = useState(maxWatched.progress);
  
  
  console.log("maxPlayed from progress : ",maxPlayed)
  async function callBackendUpdateMaxPlayed () {
    
    if(maxPlayed>0 && maxPlayed!==maxWatched.progress && maxWatched.progress!==1) {
      // const progressValue = Math.floor(maxPlayed * 1000) === 999

      const currentLectureItem = {
        ...currentLecture,
        progressValue : maxPlayed, // progressValue?1:maxPlayed
      }
      console.log("Backend Called to update maxPlayed : ", maxPlayed);
      console.log("For this Lecture : ", currentLectureItem);
      await updateCourseProgress(currentLectureItem);
    }
    else {
      console.log("Backend Not-Called, maxPlayed : ", maxPlayed);
      console.log("For this Lecture : ", currentLecture);
    }
  }

  async function handleBackButton () {
    await callBackendUpdateMaxPlayed();
    navigate("/student-courses");
  }

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleBackButton}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button className="text-white rounded-full hover:bg-white dark:text-black hover:text-black" onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      {/* <p>{currentLecture?._id}</p> */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
        {currentLecture!==null &&           
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}//
            progressData={currentLecture}
            playerLocation="courseProgress"
            maxWatched={handleMaxWatched(currentLecture._id)} // check
            maxPlayed={maxPlayed}
            setMaxPlayed={setMaxPlayed}
          />
        }
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item, index) =>(
                      
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        style={studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ?{pointerEvents:"visible"}:{pointerEvents:"visible"}}
                        key={item._id}
                        onClick={()=>handleLectureClick(index, item)}
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{item?.title}</span>
                          </>
                        ) : item?.title && (
                          <>
                            <Play className="h-4 w-4 " />
                            <span>{item?.title}</span>
                          </>
                        )}
                        
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog} >
        <DialogContent showOverlay={true} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-yellow-600">Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <Label>You will get the Digital-Certificate on Tomorrow...!</Label>
              <div className="flex flex-row flex-wrap gap-3 pt-3 justify-around"> 
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses Page
                </Button>
                {/* Reset Previous watched data */}
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button> 
                {/* <Button className="">My Cerificates</Button> */}
                <Button 
                  className="absolute z-10 text-black dark:bg-slate-900 dark:text-red-900 dark:hover:bg-white hover:text-white right-1 top-2 w-1/12 rounded-full bg-white" 
                  onClick={()=>setShowCourseCompleteDialog(false)}
                >
                  X
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;
