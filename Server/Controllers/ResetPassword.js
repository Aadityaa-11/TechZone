const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const MailSender = require("../utils/MailSender");
const { generate } = require("otp-generator");
const bcrypt = require('bcrypt')
const crypto = require("crypto")

// ResetPasswordToken
exports.ResetPasswordToken = async(req , res) =>{
    try{
        console.log("req.body" , req.body)
        // fetch the email id from req body
        const {EmailId} = req.body;

        // check user for this email , validate the email id 
        const user  = await User.findOne({EmailId});

        if(!user){
            return res.status(401).json({
                success:false,
                message:`Your Email is not Registered with us`
            })
        }
        console.log("Emailid" , EmailId)

        // generate Token 
        const token = crypto.randomBytes(20).toString("hex")
        //   const rawToken = crypto.randomBytes(32).toString("hex");
        // const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        // console.log("HashedToken" , hashedToken)
        // Upadate user by token and expiry time 
        const upadatedDetails = await User.findOneAndUpdate(
                                            {EmailId : EmailId},
                                            {
                                                // token:hashedToken,
                                                Token : token,
                                                ResetPasswordExpires:Date.now() + 5*60*1000,
                                            },
                                            {new : true} )// this return a updated document 
                                                         // without this line old doc is return

        // create url 
        // const url = `http://Localhost:3000/update-password/${rawToken}`
                const url = `http://Localhost:3000/update-password/${token}`

         
        // mail sender
        await MailSender(EmailId , 
                         "password Reset Link",
                         `Your link for email verification is :${url} . Please click this Url to Reset your Password`
        )

        return res.status(200).json({
            success:true,
            message : `Email send Successfully , Please Check YOur Email to continue Further`,
            data : url
        })
    }catch(error){
       return res.status(500).json({
            success:false,
            message:`user role connot verified , please try again later`,
            
        })
    }
}

// ResetPassword

exports.ResetPassword = async(req , res)=>{
    try{
        // data fetch
        const{EmailId ,Password , ConfirmPassword , Token} = req.body;
        // validation
        if(Password !== ConfirmPassword){
            return res.status(500).json({
                success:false,
                message:`Password and confirm password does not matching`
            })
        }
        // get Userdetails from db using token
        const UserDetails = await User.findOne({Token});
        // if no entry - invalid Token
        if(!UserDetails){
            return res.status(500).json({
                success:false,
                message:`token is invalid`
            })
        }

        // Token time checking
        if(UserDetails.ResetPasswordExpires <= Date.now()){
            return res.status(403).json({
                success:false,
                message:`Token Expired , please regenerate your token`
            })
        }

        // hash password
        const hashedpassword = await bcrypt.hash(Password , 10);

        // password update
        await User.findOneAndUpdate(
            {Token:Token},
            {Password : hashedpassword},
            {new:true},
        )

         await MailSender(EmailId , 
                         "Password Changed Successfully",
                         `Your Password for this EmailId is ${EmailId} is Successfully Changed`
        )

        // return response
        return res.status(200).json({
            success:true,
            message:`Password Reset Successful`
        })

    }catch(error){
        return res.status(500).json({
            error:error.message,
            success:false,
            message:`Some Error in updating the Password`
        })

    }
}