const express = require("express")
const router = express.Router()
const { AuthN , isInstructor } = require("../Middlewares/Auth")
const {
  DeleteAccounts,
  UpdateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", AuthN, DeleteAccounts)
router.put("/updateProfile", AuthN, UpdateProfile)
router.get("/getUserDetails", AuthN, getAllUserDetails)
// Get Enrolled Courses
// router.get("/getEnrolledCourses", AuthN, getEnrolledCourses)
// router.put("/updateDisplayPicture", AuthN, updateDisplayPicture)
// router.get("/instructorDashboard", AuthN, isInstructor, instructorDashboard)

module.exports = router