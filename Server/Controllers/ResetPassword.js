const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const MailSender = require("../utils/MailSender");
const { generate } = require("otp-generator");
const bcrypt = require('bcrypt')
const crypto = require("crypto")

// ResetPasswordToken
exports.ResetPasswordToken = async(req , res) =>{
    try{

        // fetch the email id from req body
        const EmailId = req.body.EmailId;

        // check user for this email , validate the email id 
        const user  = await User.findOne({EmailId});

        if(!user){
            return res.status(401).json({
                success:false,
                message:`Your Email is not Registered with us`
            })
        }

        // generate Token 
        const Token = crypto.randomUUID();
        // Upadate user by token and expiry time 
        const upadatedDetails = await User.findOneAndUpdate(
                                            {EmailId : EmailId},
                                            {
                                                Token:Token,
                                                ResetPasswordExpires:Date.now() + 5*60*1000,
                                            },
                                            {new : true} )// this return a updated document 
                                                         // without this line old doc is return

        // create url 
        const url = `http://Localhost:3000/update-password/${Token}`
         
        // mail sender
        await MailSender(EmailId , 
                         "password Reset Link",
                         `Your link for email verification is :${url} . Please click this Url to Reset your Password`
        )

        return res.status(200).json({
            success:true,
            message : `Email send Successfully , Please Check YOur Email to continue Further`
        })
    }catch(error){
       return res.status(500).json({
            success:false,
            message:`user role connot verified , please try again later`
        })
    }
}

// ResetPassword

exports.ResetPassword = async(req , res)=>{
    try{
        // data fetch
        const{Password , ConfirmPassword , Token} = req.body;
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
                message:`Token is invalid`
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