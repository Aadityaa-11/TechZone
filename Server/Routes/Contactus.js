const express = require("express");
const router = express.Router()

const { Contactus } = require("../Controllers/RatingAndReviews")


// Route for contact us form 
router.post("/contactus-form" , Contactus)

module.exports = router