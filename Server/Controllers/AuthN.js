const bcrypt = require("bcrypt")
const User = require("../Models/User")
const otpGenerator = require("otp-generator")
const OTP = require("../Models/OTP")
const jwt = require("jsonwebtoken")
const CookieParser = require("cookie-parser")
const MailSender = require("../utils/MailSender")
const Profile = require("../Models/Profile")
require("dotenv").config();
const otpTemplate = require("../Mail/Template/EmailVerificationTemplate");


// send otp for email verification
exports.SendOTP = async (req , res) => {
    try{
        // fetch the email from body
        const {EmailId} = req.body;

        // check if useralready 
        // find User with provided email
        const useralreadyexit = await User.findOne({EmailId})

        // if user already exist then return 
        if(useralreadyexit){
            return res.status(401).json({
                success:false,
                message:`User (Email) already registered`
            })
        }

        // genearate otp 
        let otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated " , otp);

        // check unique otp or not
        const result = await OTP.findOne({OTP : otp});

        while(result){
            otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            });
            result = await OTP.findOne({OTP : otp});

        }
        const otpPayload = {EmailId , OTP:otp}

        // create a entry in db
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)

        // Send email with OTP template
        // const mailResponse = await MailSender(
        //     EmailId,
        //     "OTP Verification",   // subject
        //     otpTemplate(otp)      // html body with otp
        // );
        // console.log("Mail response:", mailResponse);

        return res.status(200).json({
            success:true,
            message:`OTP Send Scucessfully`,
            otp,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong`,
            error:error.message
        })

    }
}

// signup 
exports.Signup = async(req , res) =>{
    try{
        // fetch the data
        const  {
            FirstName,
            LastName,
            EmailId,
            Password,
            ConfirmPassword,
            AccountType,
            ContactNumber,
            otp,
        } = req.body;

        // validate kar 
        if(!FirstName  || !LastName || !EmailId || !Password || !ConfirmPassword || !OTP || !ContactNumber){
            return res.status(500).json({
                success:false,
                message:`All Fields are Required`
            })
        }

        // check if  passowrd and confirm password match karo 
        if( Password !== ConfirmPassword){
            return res.status(400).json({
                success:false,
                message :`Password and confirm password do not match , please fill it again `
            })
        }

        // check user already exits or not
        const useralreadyexit = await User.findOne({EmailId});
        if(useralreadyexit){
            return res.status(400).json({
                success:false,
                message:`Useralready Exits`
            })
        }

        // find most recent otp store in database
        const recentotp = await OTP.find({EmailId}).sort({createdAt:-1}).limit(1);
        console.log("recentotp" , recentotp);
        // if(recentotp.length == 0){  // recentotp return a single document not array 
        if(!recentotp){
            // otp not found
            return res.status(500).json({
                message:`Otp not found`
            })
        }
        else if(otp !== recentotp[0].OTP){
            return res.status(400).json({
                success:false,
                message:`Please enter a valid OTP`
            })
        }

        // hash password
        const hashedpassword = await bcrypt.hash(Password, 10);

        // create entry in db
        // create the additional information for profile for user
        let ProfileDetails = await Profile.create({
            Gender:null,
            DateOfBirth:null,
            About:null,
            ContactNumber:null,
        })
        let user = await User.create({
            FirstName , 
            LastName,
            EmailId,
            ContactNumber,
            Password:hashedpassword,
            ConfirmPassword:hashedpassword,
            AccountType,
            AdditionalDetails : ProfileDetails._id,
            Image:`https://api.dicebear.com/5.x/initials/svg?seed=${FirstName}${LastName}`   
        })

        return res.status(200).json({
            success:true,
            message:`User registered Successfully`,
            user,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:`Signup Failed , something went wrong`,
            error : error.message,
        })
    }
}

// login 

exports.LoginIn = async(req, res) =>{
    try{
        // fetch the data
        const {EmailId , Password} = req.body;

        // validate data
        if(!EmailId || !Password) {
            return res.status(400).json({
                success:false,
                message:`All fields are required!!`
            })
        }

        // user check exist or not 
        const useralreadyexit = await User.findOne({EmailId}).populate("AdditionalDetails").exec()
        if(!useralreadyexit){
            return res.status(404).json({
                success:false,
                message:`User not register , Registered it `
            })
        }

        // verifying  the password and generating jwt token and cookie parser
        const Payload = {
            EmailId : useralreadyexit.EmailId,
            id: useralreadyexit._id.toString(),
            AccountType: useralreadyexit.AccountType,
        }
        console.log("AccountType" , useralreadyexit.AccountType)
        
    
        if(await bcrypt.compare(Password , useralreadyexit.Password)){
            let token = jwt.sign(Payload , process.env.JWT_SECRET , { expiresIn: '1h'});
            console.log("TOken :" , token )
            // save token to user document in database 
            // useralreadyexit = useralreadyexit.toObject();
            useralreadyexit.token = token;
            useralreadyexit.Password = undefined;
        
            // set cookies for token and return success response
            const  option = {
                expires : new Date(Date.now() +  3 * 24 * 60 *60 * 1000),
                httpOnly : true,
            }

            return res.cookie("token" , token , option).status(200).json({
                success:true,
                token , 
                useralreadyexit,
                message :`Login successfully `

            })
        }else{
            return res.status(403).json({
                success:false,
                message:`Password Incorrect`
            })
        }


    }catch(error){
        // return 500 Internal server error status code with error message
        return res.status(500).json({
            success:false,
            message:`Login Failed , Please Try Again Later !`
        })
    }
}


// changepassword 

exports.ChangePassword = async(req, res) =>{
    try{

        // fetch the data
        const EmailId = req.body;

        // validate the dat
        if(!EmailId){
            return res.status(500).json({
                success:false,
                message:"Please fil the field carefully"
            })
        }

        // user already exist or not
        const useralreadyexit = await User.findOne({EmailId});
        if(!useralreadyexit){
            return res.status(500).json({
                success:false,
                message:"User is not Registered , please try again after Registeration"
            })
        }




    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Passoword Reset Failed`
        })
    }
}