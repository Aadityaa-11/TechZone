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
        require:true,
    },
    WahtYouWillLearn:{
        type:String,
    },
    CourseContent :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    },
    ratingAndReviews : [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
        }
    ],
    ThumbNail:{
        type:String,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    Tags:{
        type:"string",
    },
    StudentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }]

});

module.exports = mongoose.model("Course" , CourseSchema)