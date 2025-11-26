const express = require("express")
const router = express.Router()
const { AuthN , isInstructor } = require("../Middlewares/Auth")
const {
  DeleteAccounts,
  UpdateProfile,
  getAllUserDetails,
  UpdateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../Controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", AuthN, DeleteAccounts)
router.put("/UpdateProfile", AuthN, UpdateProfile)
router.get("/getUserDetails", AuthN, getAllUserDetails)

// Get Enrolled Courses
// router.get("/getEnrolledCourses", AuthN, getEnrolledCourses)
router.put("/updateDisplayPicture", AuthN, UpdateDisplayPicture)
// router.get("/instructorDashboard", AuthN, isInstructor, instructorDashboard)

module.exports = router