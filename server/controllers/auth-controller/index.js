const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { 
    userName,
    userRollNumber, 
    userBranch,
    userRegisteredSEM,
    userDegree,
    userMobileNumber,
    userEmail, 
    password, 
    role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }, { userRollNumber }, { userMobileNumber }],
    
  });

  if (existingUser && existingUser?.role === role) {
    return res.json({
      success: false,
      message: "User name or User Email or Mobile Number already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  if (role==="user") {
    const newUser = new User({
      userName,
      userRollNumber, 
      userBranch,
      userRegisteredSEM,
      userDegree,
      userMobileNumber,
      userEmail, 
      role,
      password: hashPassword, 
    });
  
    await newUser.save();
  }
  else {
    const newUser = new User({
      userName,
      userBranch,
      userEmail, 
      role,
      password: hashPassword, 
    });
  
    await newUser.save();
  }
  

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

const loginUser = async (req, res) => {
  const { role, userEmail, password } = req.body;

  const checkUser = await User.findOne({ userEmail, role });

  if (!checkUser || checkUser?.role !== role) {
    return res.json({
      success: false,
      message: `Login Not Found as ${role.toUpperCase() || "USER"}`,
    });
  }

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userRollNumber: checkUser?.userRollNumber || "",
        userName: checkUser?.userName || "",
        userEmail: checkUser?.userEmail || "",
        userMobileNumber: checkUser?.userMobileNumber || "",
        userBranch: checkUser?.userBranch || "",
        userDegree: checkUser?.userDegree || "",
        role: checkUser?.role || "",
      },
    },
  });
};

module.exports = { registerUser, loginUser };
