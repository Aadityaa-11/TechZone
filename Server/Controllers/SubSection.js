const SubSection = require("../Models/SubSection")
const Cloudinary = require("../Config/Cloudinary")
const Section = require("../Models/Section")
const { UploadImageToCloudinary } = require("../Config/Cloudinary")
require("dotenv").config()

exports.CreateSubSection = async(req , res) =>{
    try{

        // data fetch
        const {SectionId , Title , Description , TimeDuration } = req.body

        // extract file/video
        const Video = req.files.VideoFile
        console.log("video" , Video)

        // validation
        if(!SectionId || !Title || !Description ||  !TimeDuration ){
            return res.status(500).json({
                success:false, 
                message:`All fields are Required`
            })
        }

        // upload to clodinary
        const UploadDetails = await UploadImageToCloudinary(Video , process.env.FOLDER_NAME);
        console.log("uploadDetails" , UploadDetails)
        // create a subsection
        const SubSectionDetails = await SubSection.create({
            Title : Title,
            TimeDuration : TimeDuration,
            Description : Description,
            VideoUrl:UploadDetails.secure_url,
        })
        console.log("Subsections :" , SubSectionDetails)

        // update section with subsection object id 
        const UpdatedSection= await Section.findByIdAndUpdate( 
                                                            {_id : SectionId},
                                                            {
                                                                $push:{
                                                                    SubSection:SubSectionDetails._id,
                                                                }
                                                            },
                                                            {new:true}

                                                             ).populate("SubSection").exec()
        // return response 
        return res.status(200).json({
            success:true,
            message:`Subsection created successfully`,
            data : UpdatedSection,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed in creation of subsection`
        })
    }
}


exports.UpadateSubsection = async(req , res)=>{
    try{
        // fetch the data
        const { SubSectionId ,  Title , Description , TimeDuration } = req.body;

        // fech the video 
        const video = req.file.Videofile

        // validation
          if(!SubSectionId || !Title || !Description ||  !TimeDuration ){
            return res.status(401).json({
                success:false, 
                message:`All fields are Required`
            })
        }
        
        // update video 
        const uploadvideo = await Cloudinary.UploadImageToCloudinary(video , process.env.FOLDER_NAME)

        // update data
        const UpdateSection = await SubSection.findByIdAndUpdate(
                                                        SubSectionId,
                                                        {Description:Description,
                                                        TimeDuration:TimeDuration,
                                                        Title:Title ,
                                                        videourl:uploadvideo.secure_url},
                                                        {new:true},
                                                    )

        // return response
        return res.status(200).json({
            success:true,
            message:`SubSection updated successfully`,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`SubSection updation failed , Something went wrong`,
            error:error.message,
        })
    }
}

exports.DeleteSubSection = async(req , res)=>{
    try{
           // fetch the data
        const { SubSectionId ,  Title , Description , TimeDuration } = req.body;

        // validation
          if(!SubSectionId || !Title || !Description ||  !TimeDuration ){
            return res.status(401).json({
                success:false, 
                message:`All fields are Required`
            })
        }

        // delete data
        await SubSection.findByIdAndDelete(SubSectionId);


           // return response
        return res.status(200).json({
            success:true,
            message:`SubSection Deleted successfully`,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`SubSection Deletion failed , Something went wrong`,
            error:error.message,
        })
    }
}