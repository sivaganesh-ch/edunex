// import { useCallback, useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
// import { Slider } from "../ui/slider";
// import { Button } from "../ui/button";
// import {
//   Maximize,
//   Minimize,
//   Pause,
//   Play,
//   RotateCcw,
//   RotateCw,
//   Volume2,
//   VolumeX,
// } from "lucide-react";

// function VideoPlayer({
//   width = "100%",
//   height = "100%",
//   url,
//   onProgressUpdate,
//   progressData,
//   playerLocation
// }) {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [muted, setMuted] = useState(false);
//   const [played, setPlayed] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);

//   const playerRef = useRef(null);
//   const playerContainerRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);

//   function handlePlayAndPause() {
//     setPlaying(!playing);
//   }

//   function handleProgress(state) {
//     if (!seeking) {
//       setPlayed(state.played);
//     }
//   }

//   function handleRewind() {
//     playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
//   }

//   function handleForward() {
//     playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
//   }

//   function handleToggleMute() {
//     setMuted(!muted);
//   }

//   function handleSeekChange(newValue) {
//     setPlayed(newValue[0]);
//     setSeeking(true);
//   }

//   function handleSeekMouseUp() {
//     setSeeking(false);
//     playerRef.current?.seekTo(played);
//   }

//   function handleVolumeChange(newValue) {
//     setVolume(newValue[0]);
//   }

//   function pad(string) {
//     return ("0" + string).slice(-2);
//   }

//   function formatTime(seconds) {
//     const date = new Date(seconds * 1000);
//     const hh = date.getUTCHours();
//     const mm = date.getUTCMinutes();
//     const ss = pad(date.getUTCSeconds());

//     if (hh) {
//       return `${hh}:${pad(mm)}:${ss}`;
//     }

//     return `${mm}:${ss}`;
//   }

//   const handleFullScreen = useCallback(() => {
//     if (!isFullScreen) {
//       if (playerContainerRef?.current.requestFullscreen) {
//         playerContainerRef?.current?.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       }
//     }
//   }, [isFullScreen]);

//   function handleMouseMove() {
//     setShowControls(true);
//     clearTimeout(controlsTimeoutRef.current);
//     controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
//   }

//   useEffect(() => {
//     const handleFullScreenChange = () => {
//       setIsFullScreen(document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullScreenChange);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullScreenChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (played === 1 && playerLocation==="courseProgress") {
//       onProgressUpdate({
//         ...progressData,
//         progressValue: played,
//       });
//     }
//   }, [played]);

//   return (
//     <div
//       ref={playerContainerRef}
//       className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
//       ${isFullScreen ? "w-screen h-screen" : ""}
//       `}
//       style={{ width, height }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setShowControls(false)}
//     >
//       <ReactPlayer
//         ref={playerRef}
//         className="absolute top-0 left-0"
//         width="100%"
//         height="100%"
//         url={url}
//         playing={playing}
//         volume={volume}
//         muted={muted}
//         onProgress={handleProgress}
//       />
//       {showControls && (
//         <div
//           className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
//             showControls ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Slider
//             value={[played * 100]}
//             max={100}
//             step={0.1}
//             onValueChange={(value) => handleSeekChange([value[0] / 100])}
//             onValueCommit={handleSeekMouseUp}
//             className="w-full mb-4"
//           />
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePlayAndPause}
//                 className="text-white bg-transparent hover:text-white hover:bg-gray-700"
//               >
//                 {playing ? (
//                   <Pause className="h-6 w-6" />
//                 ) : (
//                   <Play className="h-6 w-6" />
//                 )}
//               </Button>
//               <Button
//                 onClick={handleRewind}
//                 className="text-white bg-transparent hover:text-white hover:bg-gray-700"
//                 variant="ghost"
//                 size="icon"
//               >
//                 <RotateCcw className="h-6 w-6" />
//               </Button>
//               <Button
//                 onClick={handleForward}
//                 className="text-white bg-transparent hover:text-white hover:bg-gray-700"
//                 variant="ghost"
//                 size="icon"
//               >
//                 <RotateCw className="h-6 w-6" />
//               </Button>
//               <Button
//                 onClick={handleToggleMute}
//                 className="text-white bg-transparent hover:text-white hover:bg-gray-700"
//                 variant="ghost"
//                 size="icon"
//               >
//                 {muted ? (
//                   <VolumeX className="h-6 w-6" />
//                 ) : (
//                   <Volume2 className="h-6 w-6" />
//                 )}
//               </Button>
//               <Slider
//                 value={[volume * 100]}
//                 max={100}
//                 step={1}
//                 onValueChange={(value) => handleVolumeChange([value[0] / 100])}
//                 className="w-24 "
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="text-white">
//                 {formatTime(played * (playerRef?.current?.getDuration() || 0))}/{" "}
//                 {formatTime(playerRef?.current?.getDuration() || 0)}
//               </div>
//               <Button
//                 className="text-white bg-transparent hover:text-white hover:bg-gray-700"
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleFullScreen}
//               >
//                 {isFullScreen ? (
//                   <Minimize className="h-6 w-6" />
//                 ) : (
//                   <Maximize className="h-6 w-6" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoPlayer;

import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

function VideoPlayer({
  width = "100%",
  height = "100%",
  url,
  onProgressUpdate,
  progressData,
  playerLocation,
  maxWatched,
  maxPlayed,
  setMaxPlayed,
  giveFullPlyerControls = false,
}) {
  
  console.log("initial maxWatched1 : ",maxWatched )
  
  console.log("initial maxPlayed1 : ",maxPlayed )
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  
  const [played, setPlayed] = useState(0);
  // setMaxPlayed(Math.max(maxWatched.progress, played));
  // console.log("maxPlayed2 ",maxPlayed)
  // const [played, setPlayed] = useState(maxWatched>0 && maxWatched<1? maxWatched: 0);

  // console.log("after played-1 : ", played)
  // setMaxPlayed(maxWatched?.progress)
  // const [maxPlayed, setMaxPlayed] = useState(maxWatched.progress); // Added to track the furthest point watched
  // console.log("maxPlayed-1 : ",maxPlayed ,"------\n")
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // console.log("Current Lecture Changed : ", progressData)
  console.log("played : ", played)
  // setMaxPlayed(maxPlayed)
  console.log("maxPlayed : ",maxPlayed)

  function handlePlayAndPause() {
    setPlaying(!playing);
  }

  function  handleProgress(state) {
    if(playerLocation==="courseProgress" && giveFullPlyerControls===false){

      if (!seeking) {
        if (maxWatched.progress===1 || maxWatched.viewed===true) {
          setPlayed(0)
        }
        setPlayed(state.played); //state.played>maxWatched?state.played:maxWatched
        // Update maxPlayed only if current played value is greater
        // setMaxPlayed((prevMax) => Math.max(prevMax>maxWatched?prevMax:maxWatched, state.played));
        
        setMaxPlayed(Math.max(maxWatched.progress, state.played));
      }
    } else if(playerLocation==="courseDetails"){
      if(!seeking) {
        setPlayed(state.played);
      }
    }
    else {
      if(!seeking) {
        setPlayed(state.played);
        setMaxPlayed(Math.max(maxWatched.progress||0, state.played));
      }
    }
  }

  function handleRewind() {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
  }

  function handleForward() {
    const currentTime = playerRef?.current?.getCurrentTime();
    if (giveFullPlyerControls===false && playerLocation==="courseProgress") {

      const duration = playerRef?.current?.getDuration();
      const maxSeekTime = maxPlayed * duration;

      if (currentTime + 5 <= maxSeekTime || maxPlayed === 1) {
        playerRef?.current?.seekTo(currentTime + 5);
      }
    }
    else {
      playerRef?.current?.seekTo(currentTime + 5);
    }
  }

  function handleToggleMute() {
    setMuted(!muted);
  }

  function handleSeekChange(newValue) {
    console.log("Seek Change : ", newValue)
    
    

    if (playerLocation==="courseProgress" && giveFullPlyerControls===false) {
      
      const duration = playerRef?.current?.getDuration();
      const maxSeekTime = maxPlayed * duration;
      if (newValue[0] * duration <= maxSeekTime || maxPlayed === 1) {
        setPlayed(newValue[0]);
        setPlaying(true)
        setSeeking(true);
      }
    }
    else{
      setPlayed(newValue[0]);
      setPlaying(true)
      setSeeking(true);
    }
  }

  function handleSeekMouseUp() {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  }

  function handleVolumeChange(newValue) {
    setVolume(newValue[0]);
  }

  function pad(string) {
    return ("0" + string).slice(-2);
  }

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }

    return `${mm}:${ss}`;
  }

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  function handleMouseMove() {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3500);
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {

    if (playerLocation==="courseProgress") {

      const handleBeforeUnload = (event) => {
        // playerRef.current.playing=false;
        // localStorage.setItem(`maxPlayed_${progressData._id}`, maxPlayed);

        event.preventDefault();

        console.log("Before Close...maxPlayed : ", maxPlayed)
        // localStorage.setItem(`maxPlayed_${progressData._id}`, maxPlayed);

        // Math.floor(played * 100)===98
        if (maxPlayed>0 && maxPlayed<1 && maxPlayed!==maxWatched.progress && playerLocation === "courseProgress") {
          // console.log(progressData)
          // localStorage.setItem(`sid_${progressData._id}`, maxPlayed)
          console.log("Backend Called.... for partial watched ", maxPlayed)
          onProgressUpdate({
            ...progressData,
            progressValue: maxPlayed,
          });
        }
      };
      // console.log( progressData)
      if (maxWatched.progress!==1) {
        // Math.floor(played * 100)===98
        if ( (maxPlayed === 1 && maxPlayed!==maxWatched.progress || Math.floor(maxPlayed * 1000)===999) && playerLocation === "courseProgress") {
          console.log("Backend Called....For Successful Complete")
          onProgressUpdate({
            ...progressData,
            progressValue: 1,
          });
        }
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [maxPlayed, played]); // add played

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
      ${isFullScreen ? "w-screen h-screen" : ""}
      `}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="player-screen">
        <ReactPlayer
          ref={playerRef}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
        />
        <div className="absolute w-full h-full bg-black bg-transparent"></div>

        <div className=" absolute w-full h-full flex justify-center items-center bg-transparent">
          {showControls && 
          <div  
            onClick={()=>setPlaying(!playing)}
            className="size-28 flex justify-center items-center bg-transparent"
          >
            {playing ? (
                    <Pause style={{width:"96%",height:"96%", opacity:"0.7", color:"white", backgroundColor:"black", padding:"2px", borderRadius:"60%"}}/>
                  ) : (
                    <Play style={{width:"96%",height:"96%", opacity:"0.7", color:"white", backgroundColor:"black", padding:"2px", borderRadius:"60%"}} />
                  )}
          </div>
          }
        </div>
      </div>
      {showControls && (
        <div
          // onTouchStart={()=> setShowControls(true)}
          className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            value={[(played * 100)]} // maxPlayed>played ? (maxPlayed * 100) : (played * 100)
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAndPause}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                onClick={handleRewind}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleForward}
                className={`text-white bg-transparent hover:text-white hover:bg-gray-700 ${
                  played * (playerRef?.current?.getDuration() || 0) >=
                  maxPlayed * (playerRef?.current?.getDuration() || 0)
                  && giveFullPlyerControls===false
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                variant="ghost"
                size="icon"
                disabled={
                  (played * (playerRef?.current?.getDuration() || 0) >=
                    maxPlayed * (playerRef?.current?.getDuration() || 0) &&
                  maxPlayed !== 1) && giveFullPlyerControls===false
                }
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleToggleMute}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                className="w-24 "
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white">
                {formatTime(played * (playerRef?.current?.getDuration() || 0))}/{" "}
                {formatTime(playerRef?.current?.getDuration() || 0)}
              </div>
              <Button
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
                onClick={handleFullScreen}
              >
                {isFullScreen ? (
                  <Minimize className="h-6 w-6" />
                ) : (
                  <Maximize className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
