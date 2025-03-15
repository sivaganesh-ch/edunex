const UserDB = require("../../models/User");
const UserCoursesDB = require("../../models/StudentCourses");

const getDashboardData = async (req, res) => {
  try {
    const { reqType, userDegree } = req.params;

    console.log(reqType, "->", userDegree);

    const UserCourses = await UserCoursesDB.find();
    const User = await UserDB.find({ userDegree });
    // const notEnrolledUsers = User.map(doc => doc.toObject())
    
    
    function findAndRemoveElement(arr, predicate) {
      const duplicateArray = arr.map(doc => doc.toObject()); // Convert to plain objects
      const index = duplicateArray.findIndex(predicate);
      
      if (index !== -1) {
          const [element] = duplicateArray.splice(index, 1); // Remove element in duplicate array
          return { element, updatedArray: duplicateArray };
      }
      
      return [];
  }

    const getDataByBranchWise = async (reqType) => {
      // const notEnrolled = User;
      const Branches = new Object();
      var notEnrolledUsers = [];


      UserCourses.forEach(async (eachUser) => {
        const userId = eachUser.userId;

        var existedUsers = [];

        if (reqType === "enrolled") {
          let enrolledUser = findAndRemoveElement(
            User,
            (eachUser) => eachUser?._id.toString() == userId
          );
          
          console.log("enrolledUser: ", enrolledUser);
          existedUsers = enrolledUser;
        }

        
        console.log(reqType, existedUsers);

        if (existedUsers.length !== 0) {
          
            notEnrolledUsers = existedUsers?.updatedArray;
            const existedUsersCpy = existedUsers.element;
            console.log("existedUsersCopy; ",existedUsersCpy);
            const key = existedUsersCpy?.userBranch;

            const student = {
              ...existedUsersCpy,
              password: undefined,
              __v: undefined,
            };

            if (Branches[key]) {
              // Branches[key] += 1
              Branches[key].push(student);
            } else {
              // Branches[key] = 1
              Branches[key] = [student];
            }
        }
        else {
          notEnrolledUsers = User
        }
        
      });
      // console.log("Branches: ", Branches);
      return {
        enrolledUsers:Object.keys(Branches).length === 0 && Branches.constructor === Object? [] : Branches,
        notEnrolledUsers
      };
    };

    // console.log("UserCourses: ", UserCourses);
    // console.log("Users: ", User);

    if (UserCourses.length !== 0 && User.length !== 0) {
      const { enrolledUsers, notEnrolledUsers } = await getDataByBranchWise("enrolled");
      

      const data = {
        enrolledUsers,
        notEnrolledUsers,
        registeredUsers: User,
      };
      console.log(data);
      const result = Object.keys(enrolledUsers).length !== 0 ? true : false;
      if (result) {
        res.status(200).json({
          success: true,
          message: "Fetched Successfully...!",
          data: data,
        });
      } else {
        res.json({
          success: true,
          message: `Registered Users Not Buy the Courses in ${userDegree} category!`,
          data: data,
        });
      }
    } else {
      res.json({
        success: true,
        message: `No one Registered in ${userDegree} Category!`,
        data: { enrolledUsers: []},
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getDashboardData,
};
