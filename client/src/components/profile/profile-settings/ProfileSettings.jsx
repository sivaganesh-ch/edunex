import React, { useState } from "react";
import { useDarkMode } from "@/context/dark-mode-context/DarkModeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import customImg from "../../../../public/user.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ProfileSettings = ({ location = "public", ProfileConfig, ProfileData, profile }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [ imgError, setImgError ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  imgError ? alert(imgError) : "";
  
  const userImg = ProfileData?.img;

  return (
    <Card className="">
      <CardHeader className="bg-reds-700 justify-self-center p-4">
        <span className="bg-profile rounded-full border-2 border-dotted">
          <img
            src={ProfileData && location !== "public" ? userImg : customImg}
            onError={(i) => (i.target.style.visibility = "hidden")}
            className="object-cover place-content-center border-1 border-dotted border-black dark:border-white h-[6em] rounded-full bg-profile"
          />
        </span>

        {/* "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" */}
        <Button
          className="w-full justify-start mb-2 px-1 m-0 dark:text-yellow-600 hover:text-yellow-600 hover:bg-gradient-to-r from-[#000000] to-[#434343] animate-appear duration-1000"
          onClick={() => setDarkMode(!darkMode)}
        >
          <span className="animate-pulse">{darkMode ? <Sun /> : <Moon />}</span>
          &nbsp;
          <span>{darkMode ? "Light Mode  " : "Dark Mode  "}</span>
        </Button>
      </CardHeader>
      <CardContent
        className={`grid grid-cols-2 ${
          location === "instructorProfile" ? "md:grid-cols-2" : "md:grid-cols-1  "
        } justify-items-center text-sm gap-10 md:gap-y-2`}
      >
        {ProfileConfig.map((InputItem, index) =>(
          
          (location==="public" && (InputItem.value !== "userName" && InputItem.value!=="userRollNo")) ||
            <div
              key={index}
              className={`hover:bg-gradient-to-br ${
                location === "instructorProfile"
                  ? "odd:justify-self-end even:justify-self-start"
                  : ""
              } from-zinc-600 border-2 rounded-xl px-2 py-1 w-full md:w-[70%] font-serif`}
            >
              {
                <div className="mb-2 font-extrabold break-words dark:text-">
                  {InputItem.label}
                </div>
              }
              {editMode ? (
                <input
                  readOnly={InputItem?.readOnly}
                  id={InputItem.id}
                  value={ProfileData[InputItem.value]}
                  type={InputItem.type}
                  placeholder={InputItem.placeholder}
                  className="w-full pb-2 font-medium focus-within:outline-none bg-inherit"
                />
              ) : (
                <div className="break-words">
                  {ProfileData[InputItem.value]}
                </div>
              )}
            </div>
          )
        )}
        {editMode && <Button>Submit</Button>}
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
