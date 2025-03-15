import { useState, useContext } from "react";
import { GraduationCap, Menu, Plus, SquareMenu, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";
import CustomProfile from "../../../public/user.png";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const [hideProfileItems, setHideProfileItems] = useState(true);
  console.log(hideProfileItems)
  const { auth, resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  const profileConfig = [
    {
      label: "Profile",
      icon: "",
      link: "/profile/"
    },
    {
      label: "Explore Courses",
      icon: "",
      link: "/courses"
    },
    {
      label: "My Courses",
      icon: "",
      link: "/student-courses",
    },
    {
      label: "LogOut",
      icon: "",
      link: ""
    },
  ];

  const handleButtonNavigation = ( item ) => {
    if (item?.label === "LogOut") {
      handleLogout();

    }
    else if(item?.label === "Profile") {
      navigate(item?.link + auth?.user?._id);
      setHideProfileItems(!hideProfileItems);
    }
    else {
      navigate(item?.link);
      setHideProfileItems(true);
    }
  }

  return (
    <header className="flex flex-wrap items-center justify-between p-4 border-b sticky top-0 z-10 bg-neutral-900 dark:bg-slate-900 text-white">
      <div className="flex items-center space-x-4">
        <span onClick={()=>handleButtonNavigation({link:"/home"})} className="flex items-center hover:cursor-pointer hover:text-yellow-600">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
          EduNex
          </span>
          {/* <Plus strokeWidth={4} /> */}
        </span>
        <div className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : handleButtonNavigation({link:"/courses"});
            }}
            className="text-[14px] md:text-[16px] font-medium text-black hover:text-yellow-600"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="md:flex items-center space-x-4">
        <div className="md:flex gap-4 items-center">
          <div
            onClick={() => handleButtonNavigation({link:"/student-courses"})}
            className="hidden md:flex cursor-pointer items-center gap-3 hover:text-yellow-600 md:animate-bounce"
          >
            <span className="font-extrabold md:text-xl text-[14px] ml-2">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          
          <div className="bg-white p-[2px] rounded-full bg-gradient-to-tr from-blue-700 to-red-800 border-dotted">
          <div onClick={()=>setHideProfileItems(!hideProfileItems)} className="size-10 bg-white rounded-full hover:scale-105 hover:cursor-pointer">
            <img src={CustomProfile} alt="" />
          </div>
          </div>
          <Card className={`absolute ${hideProfileItems?"card-inactive":"card-active"} pb-2 bg-zinc-100 dark:bg-card  shadow-inner z-10 w-full max-w-[200px] right-4 top-[4.9rem]`}>
            <CardHeader className="border-b-2 bg-green-7s00 text-center break-words ">
              <CardTitle className="text-blue-900 font-bold hover:cursor-default dark:text-yellow-600">{auth?.user?.userName}</CardTitle>
            </CardHeader>
            { profileConfig.map((item, index)=> (
            <CardContent key={index} className="p-0 px-2">
              <Button 
                className="w-full bg-card text-black dark:text-white hover:bg-white/10"
                onClick={()=> handleButtonNavigation(item)}
              >
                {item.label}
              </Button>
            </CardContent>
            ))}
          </Card>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
