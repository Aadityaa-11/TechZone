const Course = require("../Models/Course")
const User = require("../Models/User")
const Category = require("../Models/Category")
const {UploadImageToCloudinary} = require("../Config/Cloudinary")
require("dotenv").config()




// create Course handler function
exports.CreateCourse = async(req , res) =>{
    try{
        // fetch the data
        let {
            CourseName ,
            CourseDescription , 
            WhatYouWillLearn , 
            Price , 
            Tags : _Tags ,
            category,
            Status,
            Instructions : _Instructions,
        } = req.body;
       console.log("hii hii ")
        // get thumbnail
        const ThumbNail = req.files.ThumbNailImage;

                // convert the Tag and Instructions front stringyarray to array
        const Tags = JSON.parse(_Tags);
        const Instructions = JSON.parse(_Instructions)

 console.log("HIII after thumbnail image")
        // validation ..
        if(!CourseName || !CourseDescription || !WhatYouWillLearn || !Price || !Tags || !ThumbNail  || !category || !Instructions.length){
            return res.status(400).json({
                success:false,
                message: `All Fields are Required!!`
            })
        }


        // if(typeof Tag == "string"){
        //     Tag = Tag.split(",").map(Tag => Tag.trim())
        // }

        // if(typeof Instructions == "string"){
        //     Instructions = Instructions.split(",").map(Instructions => Instructions.trim())
        // }
        

        if(!Status || Status == undefined){
            Status = "Draft"
        }

        // check for instructor
        const UserId = req.User.id;
        console.log("UserId : ", UserId)
        const InstructorDetails = await User.findById(UserId)
        console.log("Instructor Details : " , InstructorDetails)

        if(!InstructorDetails){
            return res.status(400).json({
                success:false,
                message:`Instructor Details not found`,
            });   
        }
        console.log("File received:", req.files?.ThumbNailImage);

        const CategoryDetails = await Category.findById(category)
        if(!CategoryDetails){
            return res.status(400).json({
                success: false,
                message : `Category Details not found`
            })
        }


        // upload Image to cloudinary
        const ThumbNailImage = await UploadImageToCloudinary(
            ThumbNail ,
            process.env.FOLDER_NAME
        );
         console.log("ThumNailImage uploaded successfully" , ThumbNailImage)

        // CREATE AN ENTRY FOR NEW COURSE
        const NewCourse = await Course.create({
            CourseName,
            CourseDescription,
            Instructor: InstructorDetails._id,
            WhatYouWillLearn : WhatYouWillLearn,
            Price,
            Tags,
            Category : CategoryDetails._id,
            Status,
            ThumbNail : ThumbNailImage.secure_url,
            Instructions,
        })

        console.log("course data" , NewCourse)

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id : InstructorDetails._id},
            {
                $push : { Courses : NewCourse._id, }
            },
            {new : true},
        )

        // Add new course to the scheman of category
        let upadatedCategoryDetails = await Category.findByIdAndUpdate(
            {_id : CategoryDetails._id},
            {
                $push : {
                    Courses : NewCourse._id
                }
            },
            {new : true}
        )

        // update the TAG ka schema
        // todo hw 
        console.log("updated category details " , upadatedCategoryDetails)
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
        const AllCourses = await Course.find({} , { 
                                                    CourseName:true,
                                                    Price:true,
                                                    ThumbNail:true,
                                                    Instructor:true,
                                                    CourseContent : true,
                                                    RatingAndReviews:true,
                                                    StudentEnrolled:true })
                                                    .populate("Instructor")
                                                    .populate({
                                                        path:"CourseContent",
                                                        populate:{
                                                            path:"SubSection"
                                                        },
                                                    })
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
        console.log("CourseID",CourseID)

        // validate the data
        if(!CourseID){
            return res.status(401).json({
                success:false,
                message:error.message,
            })
        }

        // find the course
        const CourseDetails = await Course.findById( {_id : CourseID})
                                                     .populate(
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
        console.log("CourseDetails : " , CourseDetails)
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

