// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  CreateCourse,
  showAllCourses,
  GetCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../Controllers/Course")


// // Categories Controllers Import
const {
  ShowAllCategories,
  CreateCategory,
  categoryPageDetails,
} = require("../Controllers/Category")

// // Sections Controllers Import
const {
  CreateSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section")

// // Sub-Sections Controllers Import
const {
  CreateSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRating,
// } = require("../controllers/RatingAndReview")

// const {
//   updateCourseProgress
// } = require("../controllers/courseProgress");

// // Importing Middlewares
const { AuthN , isInstructor, isStudent, IsAdmin } = require("../Middlewares/Auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/CreateCourse", AuthN, isInstructor, CreateCourse)
//Add a Section to a Course
router.post("/addSection", AuthN, isInstructor, CreateSection)
// // Update a Section
// router.post("/updateSection", auth, isInstructor, updateSection)
// // Delete a Section
// router.post("/deleteSection", auth, isInstructor, deleteSection)
// // Edit Sub Section
// router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// // Delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// // Add a Sub Section to a Section
router.post("/AddSubSection", AuthN, isInstructor, CreateSubSection)
// Get all Registered Courses
router.get("/ShowAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", GetCourseDetails)
// Get Details for a Specific Courses
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// // Edit Course routes
// router.post("/editCourse", auth, isInstructor, editCourse)
// // Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// // Delete a Course
// router.delete("/deleteCourse", deleteCourse)

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
  router.post("/CreateCategory", AuthN, IsAdmin, CreateCategory)
  router.get("/ShowAllCategories", ShowAllCategories)
// router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews", getAllRating)

module.exports = router