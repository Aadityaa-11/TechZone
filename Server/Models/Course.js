const mongoose  = require("mongoose");
const Category = require("./Category");

const CourseSchema = new mongoose.Schema({
    CourseName:{
        type:String,
    },
    CourseDescription:{
        type:String,
    },
    Instructor:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    WhatYouWillLearn:{
        type:String,
    },
    CourseContent :[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        }
    ],
    ratingAndReviews : [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
        }
    ],
    Price:{
        type:Number

    },
    ThumbNail:{
        type:String,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    Tags:{
        type:[String],
    },
    StudentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    Status : {
        type: String,
        enum: ["Draft" , "Published"]
    },
    Instructions : {
        type: [String],
    }
    

});

module.exports = mongoose.model("Course" , CourseSchema)