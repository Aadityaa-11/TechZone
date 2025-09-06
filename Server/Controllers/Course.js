const Course = require("../Models/Course")



// create Course handler function
exports.CreateCourse = async(req , res) =>{
    try{
        // fetch the data
        const {CourseName , CourseDescription , WahtYouWillLearn , Price , Tag} = req.body;

        // get thumbnail
        const ThumbNail = req.files.ThumbNailImage;

        // validation 
        if(!CourseName || !CourseDescription || !WahtYouWillLearn || !Price || !Tag){
            return res.status(400).json({
                success:false,
                message: `All Fields are Required!!`
            })
        }

        // check for instructor
        const UserId = req.User.id;
        const instructor = await User.findById(UserId)
        console.log("Instructor Details : " , InstructorDetails)

        if(!InstructorDetails){
            return res.status(400).json({
                success:false,
                message:`Instructor Details not found`,
            });   
        }

        // upload Image to cloudinary
        const ThumbNailImage = await UploadImageToCloudinary(ThumbNail , process.env.FOLDER_NAME);

        // CREATE AN ENTRY FOR NEW COURSE
        const NewCourse = await Course.create({
            CourseName,
            CourseDescription,
            Instructor: InstructorDetails._id,
            WahtYouWillLearn : WahtYouWillLearn,
            Price,
            Tag:TagDetails._id,
            ThumbNail : ThumbNailImage.secure_url,
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id : InstructorDetails},
            {
                spudh : {
                    Courses : NewCourse._id,
                }
            },
            {new : true},
        );

        // update the TAG ka schema
        // todo hw 

        // return response 
        return res.status(200).json({
            success:true,
            message:`Course Created Successfully`,
            data : NewCourse
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Course Creation Failed , please try again!! `,
            error : error.message,
        }) 
    }
}


// getall courses handler function

exports.showAllCourses = async(req , res) =>{
    try{
        // TODO : change
        const AllCourses = await Course.find({} , { CourseName:true,
                                                    Price:true,
                                                    ThumbNail:true,
                                                    Instructor:true,
                                                    RatingAndReviews:true,
                                                    StudentEnrolled:true })
                                                    .populate("Instructor")
                                                    .exec()

        return res.status(200).json({
            success:true,
            message:`Data for all Courses fetched Successfully`,
            data : AllCourses,
        })                                            

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Cannot fetch course data`,
            error : error.message,
        })
    }
}

// get all courses are there in it
exports.GetCourseDetails = async(req, res)=>{
    try{

        // fetch the coureseID
        const {CourseID} = req.body;

        // validate the data
        if(!CourseID){
            return res.status(401).json({
                success:false,
                message:error.message,
            })
        }

        // find the course
        const CourseDetails = await Course.findById( {_id : CourseID})
                                                     .popolate(
                                                        {
                                                        path:`Instructor`,
                                                        populate:{
                                                            path:`AdditionalDetails`
                                                        },
                                                        } 
                                                    )
                                                    .populate(`Category`)
                                                    .populate(`RatingAndReviews`)
                                                    .populate({
                                                        path:`CourseContent`,
                                                        populate:{
                                                            path:`SubSection`,
                                                        }
                                                    })
                                                    .exec();

        if(!CourseDetails){
             return res.status(401).json({
                success:false,
                message:`Could not find the course with coureID ${CourseID}`,
            })

        }

        return res.status(401).json({
            success:true,
            message:`Course Details fetched Successfully`,
        })



    }catch(error){
        return res.status(500).json({
            success:false,
            message: `Failed in fetching course details `
        })
    }
}

