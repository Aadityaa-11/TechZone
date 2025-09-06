// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  LoginIn,
  Signup,
  SendOTP,
  ChangePassword,
} = require("../Controllers/AuthN")
const {
  ResetPasswordToken,
  ResetPassword,
} = require("../Controllers/ResetPassword")

const { AuthN } = require('../Middlewares/Auth')

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", LoginIn)

// Route for user signup
router.post("/signup", Signup)

// Route for sending OTP to the user's email
router.post("/sendotp", SendOTP)

// Route for Changing the password
router.post("/changepassword", AuthN , ChangePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", ResetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", ResetPassword)

// Export the router for use in the main application
module.exports = router