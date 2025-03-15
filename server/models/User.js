const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  userRollNumber: String, 
  userBranch: String,
  userRegisteredSEM: String,
  userDegree: String,
  userMobileNumber: String,
  userEmail: String, 
  password: String, 
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
