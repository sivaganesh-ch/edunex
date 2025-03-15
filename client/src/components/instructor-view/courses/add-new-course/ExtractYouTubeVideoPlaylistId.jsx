import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ExtractYouTubeVideoPlaylistId(
  { 
    result, 
    setResult, 
    currentIndex,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    handleUploadPlayList
  }
) {
  const [url, setUrl] = useState("");
  const [uploadContentType, setUploadContentType] = useState("Video")

  // Function to extract the YouTube video ID and playlist ID
  const extractIds = (url) => {
    if(uploadContentType==="Video"){
      // Regex to extract video ID
      const videoRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const videoMatch = url.match(videoRegex);
      const videoId = videoMatch && videoMatch[1]!=="videoseries" ? videoMatch[1] : "Invalid Video URL";
      return { videoId };
    }
    else if(uploadContentType==="PlayList"){
      // Regex to extract playlist ID
      const playlistRegex = /(?:[?&]list=)([a-zA-Z0-9_-]+)/;
      const playlistMatch = url.match(playlistRegex);
      const playlistId = playlistMatch ? playlistMatch[1] : "Invalid PlayList URL";
      return { playlistId };
    } 
    
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleExtract = async () => {
    const ids = extractIds(url);
    setResult(ids);
    
    if (uploadContentType==="Video" && ids?.videoId!=="Invalid Video URL") {
      let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: `https://www.youtube.com/embed/${ids?.videoId}`,
        public_id: ids.videoId,
      };
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
    else if(uploadContentType==="PlayList" && ids?.playlistId!=="Invalid PlayList URL") {
      console.log(ids?.playlistId!=="Invalid PlayList URL")
      console.log(ids.playlistId)
      handleUploadPlayList(ids)
    }
  };

  return (
    <div className="grid grid-flow-row gap-4 sm:grid-flow-col">
      <select 
        defaultValue={uploadContentType} 
        onChange={(e)=>setUploadContentType(e.target.value)} 
        // className="h-9 w-28 rounded-md ml-1 bg-black h-50 text-white font-medium"
        className="rounded-md bg-black p-2 text-white font-semibold "
      >
        <option className="text-center" value="Video">Video</option>
        <option className="text-center" value="PlayList">PlayList</option>
      </select>
      <Input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Enter YouTube URL"
        className=""
      />
      
      {/* {result?.videoId===null && result?.playlistId===null && */}
        <Button disabled={!url} onClick={handleExtract}>
          Preview
        </Button>
      {/* } */}
    </div>
  );
}

export default ExtractYouTubeVideoPlaylistId;




/* Test Cases

https://youtu.be/nzGN_24fkTA?si=Q4G4r56arBbj27ZA
https://www.youtube.com/embed/nzGN_24fkTA?si=Q4G4r56arBbj27ZA
https://www.youtube.com/watch?v=nzGN_24fkTA
https://www.youtube.com/live/Q-NMOPlOH40?si=7ON6aaywqTGhyguz  //
https://invalid.com/somepath
https://www.youtube.com/watch?v=abcdefghijk
https://www.youtube.com/playlist?list=PLbtI3_MArDOnvdVSOI14rMKVNMeiSHUyM
https://www.youtube.com/embed/videoseries?list=PLbtI3_MArDOnvdVSOI14rMKVNMeiSHUyM
https://youtu.be/abcdefghijk?list=PLbtI3_MArDOnvdVSOI14rMKVNMeiSHUyM

*/