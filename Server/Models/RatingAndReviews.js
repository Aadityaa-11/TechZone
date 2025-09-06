const mongoose = require("mongoose")

const RatingAndReviewSchema = new mongoose.Schema({
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Course",
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    Rating:{
        type:Number,
        required:true,
    },
    Reviews:{
        type:String,
        require:true,
    }

});

module.exports = mongoose.model("RatingAndReviews" , RatingAndReviewSchema)