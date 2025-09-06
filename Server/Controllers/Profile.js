const Profile = require("../Models/Profile");
const User = require("../Models/Profile")

exports.UpdateProfile = async(req , res)=>{
    try{
        // data fetch
        const{Gender , DateOfBirth , ContactNo , About} = req.body;

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
        const UserDetails = User.findById(Id) ;
        const ProfileId = UserDetails.AdditionalDetails;
        const ProfileDetails = await Profile.findById(ProfileId);

        // update profile 
        ProfileDetails.DateOfBirth = DateOfBirth,
        ProfileDetails.Gender = Gender,
        ProfileDetails.ContactNo = ContactNo,
        ProfileDetails.About = About
        await ProfileDetails.save();
         
        // return response
        return res.status(200).json({
            success:false,
            message:`Profile Update Successfully`,
            ProfileDetails,
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
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
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