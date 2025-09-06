// Import the required modules
const express = require("express")
const router = express.Router()

const { CapturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../Controllers/Payment")
const { AuthN , isInstructor, IsStudent, isAdmin } = require("../Middlewares/Auth")
router.post("/capturePayment", AuthN , IsStudent, CapturePayment)
router.post("/verifyPayment",AuthN , IsStudent, verifyPayment)
// router.post("/sendPaymentSuccessEmail", AuthN , IsStudent, sendPaymentSuccessEmail);

module.exports = router