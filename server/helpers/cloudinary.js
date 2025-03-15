// const cloudinary = require("cloudinary").v2;

// //configure with env data
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadMediaToCloudinary = async (filePath) => {
//   try {
//     console.log("Cloudinary Upload starting...", filePath)
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//     }).catch(e=>console.log("reason ", e));
//     console.log("Uploaded into Cloudinary... ", result)
//     return result;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error uploading to cloudinary");
//   }
// };

// const deleteMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.log(error);
//     throw new Error("failed to delete assest from cloudinary");
//   }
// };

// module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };


const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    console.log("Starting Cloudinary Upload...");
    
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(new Error("Error uploading to Cloudinary"));
        } else {
          console.log("Upload Successful:", result);
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    console.log("Deleting Cloudinary Asset:", publicId);
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
