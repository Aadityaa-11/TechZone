const {mongoose } = require("mongoose");
const { UploadImageToCloudinary } = require("../Config/Cloudinary");
const Profile = require("../Models/Profile");
const User = require("../Models/User")
require("dotenv").config()

exports.UpdateProfile = async(req , res)=>{
    try{
        // data fetch
        console.log("Inside Updateprofile function")
        const{Gender , DateOfBirth , ContactNumber , About} = req.body;

        // get UserId 
        const Id = req.User.id;

        // validation
        if(!Gender || !About || !Id){
            return res.status(500).json({
                success:false,
                message:`All fields are required`
            })
        }

        // find profile
        const UserDetails = await User.findById(Id) ;
        // const ProfileDetails = await Profile.findById(UserDetails.AdditionalDetails)
        const ProfileId = UserDetails.AdditionalDetails;
        const UpdatedProfileDetails = await Profile.findById(ProfileId);

        // update profile 
        UpdatedProfileDetails.DateOfBirth = DateOfBirth,
        UpdatedProfileDetails.Gender = Gender,
        UpdatedProfileDetails.ContactNumber = ContactNumber,
        UpdatedProfileDetails.About = About

        // save the updated profile
        await UpdatedProfileDetails.save();
         
        // return response
        return res.status(200).json({
            success:true,
            message:`Profile Update Successfully`,
            UpdatedProfileDetails,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed in updation of profile`
        })
    }
}

// delete account 
// for delete the account you need to first delete profile of that account he account 

exports.DeleteAccounts = async(req , res)=>{
    try{
        //data id
        const Id = req.params

        // validation
        if(!Id){
            return res.status(500).json({
                success:false,
                message:`All fields are required`
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id : UserDetails.AdditionalDetails})

        // delete User
        await User.findByIdAndDelete(Id)


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed to Delete account`
        })
    }
}

exports.getAllUserDetails = async(req , res) =>{
     try {
        console.log("id" , req.User)
    const id = req.User.id
    
    const userDetails = await User.findById(id)
      .populate("AdditionalDetails")
      .exec()
    console.log(userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message,
    })
  }
}

exports.UpdateDisplayPicture = async(req , res) =>{
    try{
        console.log("req.files:", req.files); // check keys
        console.log("req.User:", req.User);
        console.log("req files" , req.User)
        const DisplayPicture = req.files.DisplayPicture;
        console.log("DisplayPidcure" , DisplayPicture)
        const UserId = req.User.id;
        console.log("UserId" , UserId)
        const Image = await UploadImageToCloudinary(
            DisplayPicture,
            process.env.CLOUD_FOLDER_NAME,
            1000,
            1000
        )  
        
        const UpadatedProfile = await User.findByIdAndUpdate(
            req.User.id,
            {Image : Image.secure_url},
            {new : true}
        );
        if(!UpadatedProfile){
            return res.status(404).json({
                success: false,
                message : "user not found!"

            })
        }
        res.status(200).json({
            success:true,
            message:"Image Uploaded Successfully",
            data : UpadatedProfile

        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

