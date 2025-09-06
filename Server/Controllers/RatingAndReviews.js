const RatingAndReview = require("../Models/RatingAndReviews")
const Course = require("../Models/Course");
const RatingAndReviews = require("../Models/RatingAndReviews");
const { mongoose } = require("mongoose");



exports.CreateRatingAndReviews = async(req , res) =>{
    try{
        // fetch the Userid
        const UserID = req.User.id;

        // fetch the data from req body 
        const{CourseID , Rating , Review} = req.body;

        // check if user is enrolled or not 
        const CourseDetails = await Course.findById(
                                                 {_id : CourseID,
                                                 StudentEnrolled : {$eleMatch: {$eq : UserID}}
                                                 }
                                                )
    
        if(!CourseDetails){
            return res.status(404).json({
                success:false,
                message:`User not Enrolled in courese`
            })
        }

        // check if User already Review the courese 
        const AlreadyReviewed = RatingAndReview.findOne({
                                                        User : UserID ,
                                                        Course : CourseID,
                                                        })

        if(AlreadyReviewed){
            return res.status(400).json({
                success:false,
                message:`User Already Reviewed`
            })
        }

        // creating rating and review
        const RatingAndReview = await RatingAndReviews.create({
                                                              Rating , Review ,
                                                              Course : CourseID ,
                                                              User:UserID ,
                                                             })

        // updating the Rating and reviews in course 
        const UpdatedCourseDetails = await Course.findByIdAndUpdate(
                                                             {_id:CourseID},
                                                             {
                                                                $push:{
                                                                   RatingAndReviews : RatingAndReview.id,
                                                                }
                                                             },{new:true}
                                                             )
       
        // return response 
        return res.status(200).json({
            success:false,
            message:`Course Created Successfully`,
            UpdatedCourseDetails,
        })

        
    }catch(error){

        return res.status(500).json({
            success:false,
            message:`Failed in creation of rating and reviews`,
        })
        
    }


}

// get Average Rating
exports.GetAverageRating = async(req , res) =>{
    try{
        // get Course Id 
        const CourseID = req.body.CourseID;

        // calculate Average rating
        const Result = await RatingAndReview.aggregate([
            {
                $match:{
                    Course:new mongoose.Types.ObjectId(CourseID)

                }
            },
            {
                $group:{
                    _id:null,
                    AverageRating:{ $avg : "$Rating"}

                }
            }
        ]);

        // return rating
        if(Result.length > 0){
            return res.status(200).json({
                success:true,
                AverageRating : Result[0].AverageRating,
            })
        }

        // if no  rating and reviews found 
        return res.status(401).json({
            success:false,
            message:`Average Rating is 0 , no rating is found till now `,
            AverageRating:0,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// getAllRatingAndReviews 
exports.GetAllRatingAndReviews = async(req, res)=>{
    try{

        const AllRatingAndReviews = await RatingAndReview.findOne({})
                                                    .sort({Rating : "desc"})
                                                    .populate({
                                                       path:"User",
                                                       select:"FirstName lastName EmailId Image"
                                                    })
                                                    .populate({
                                                        path:"Course",
                                                        select:"CourseName"
                                                    })
                                                    .exec();

        
            return res.status(200).json({
                success:true,
                message:`All reviews fetched Successfully`,
                data:AllRatingAndReviews
            })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
