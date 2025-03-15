const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../helpers/cloudinary");

const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// const upload = multer({ dest: "uploads/" });

const storage = multer.memoryStorage(); // ✅ Store files in memory
const upload = multer({ storage });


// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log("Res from media-routes : " ,res)
//     console.log("Path ",req.file.path)
//     const result = await uploadMediaToCloudinary(req.file.path);
//     console.log("After result ", result)
//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (e) {
//     console.log(e);

//     res.status(500).json({ success: false, message: "Error uploading file" });
//   }
// });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("Received file:", req.file.originalname);

    // ✅ Use file buffer instead of path
    const result = await uploadMediaToCloudinary(req.file.buffer);

    console.log("Upload Result:", result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assest Id is required",
      });
    }

    const response = await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "Assest deleted successfully from cloudinary",
      data: response,
    });
  } catch (e) {
    console.log("Delete Error: ", e);

    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

// router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
//   try {
//     const uploadPromises = req.files.map((fileItem) =>
//       uploadMediaToCloudinary(fileItem.path)
//     );

//     const results = await Promise.all(uploadPromises);

//     res.status(200).json({
//       success: true,
//       data: results,
//     });
//   } catch (event) {
//     console.log(event);

//     res
//       .status(500)
//       .json({ success: false, message: "Error in bulk uploading files" });
//   }
// });

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    console.log("Uploading bulk files:", req.files.length);

    // ✅ Use buffer instead of file.path
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.buffer)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ success: false, message: "Error in bulk uploading files" });
  }
});

router.post("/playlist-upload", async (req, res) => {

  // console.log("req : ", req)
  // console.log("reqbody from server : ",req.body);
  const { playlistId } = req.body; // e.g., playlistId=PL12345
  console.log("playListId from server : ", playlistId)
  if (!playlistId) {
      return res.status(400).json({ success: false, error: 'Playlist ID is required' });
  }
  try {
      let videos = [];
      let nextPageToken = '';
      const maxResults = 50; // Maximum videos per request
      do {
          // Fetch videos from YouTube API
          const response = await axios.get(
              'https://www.googleapis.com/youtube/v3/playlistItems',
              {
                  params: {
                      part: 'snippet',
                      playlistId: playlistId,
                      maxResults: maxResults,
                      pageToken: nextPageToken,
                      key: process.env.YOUTUBE_API_KEY,
                  },
              }
          );
          const { items, nextPageToken: newPageToken } = response.data;
          nextPageToken = newPageToken;
          const videoBatch = items.map((item) => ({
              videoId: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails?.high?.url,
          }));
          videos = videos.concat(videoBatch);
      } while (nextPageToken);

      console.log("Response Videos : ", videos)
      // Send the videos as a JSON response
      res.status(200).json({ success: true, YouTubeVideos: videos });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to fetch playlist videos' });
  }
});


module.exports = router;
