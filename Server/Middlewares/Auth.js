// importing required modules
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const User = require("../Models/User")
require("dotenv").config();

// this function is used as middleware to authenticate User request
// authN ==> Authentication
exports.AuthN = async(req , res , next)=>{
    try{

        // fetch the token (extracting jwt from request cookies , body or header)
        const Token = req.body.token
                     || req.cookies.Token
                     || req.header("Authorization").replace("Bearer " , "")
                     
        console.log("token" , Token)

       // validate , if jwt is miising , return 401 unauthorized response
       if(!Token){
        return res.status(401).json({
                success:false,
                message:`Token is missing`
            })
       }

       // verify the token
       try{
           // verifying the JWT using the secret key stored in environment variables
           let decode = jwt.verify(Token , process.env.JWT_SECRET);  // it return the token
           console.log("decode" , decode)
           req.User = decode;
          
       }catch(error){
        // verification issue (if JWT verification fails , return 401 Unauthorized response)
        return res.status(401).json({
                success:false,
                message:`Token invalid`
            })

       }
       next();

    }catch(error){
        // if there is an error during the authentication process , return 401 Uauthorized response
        return res.status(401).json({
                success:false,
                message: `Something went wrong while validating the token`
            })
    }
}

// Student 
exports.IsStudent = async(req, res , next)=>{
    try{
        const {AccountType} = req.body;
        if(AccountType != 'Student'){
            return res.status(401).json({
                success:true,
                message:`This is the protected Router for Students`
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`User role cannot be Verified , please try again later`
        })

    }
}

// isAdmin

exports.IsAdmin = async(req, res , next)=>{
    try{
        const {AccountType} = req.body;
        console.log("AccountType" , AccountType)
        if(req.User.AccountType !== 'Admin'){
            return res.status(401).json({
                success:true,
                message:`This is the protected Route for admin`
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`user role connot verified , please try again later`
        })

    }
}

// isInstructor

exports.isInstructor = async(req, res) =>{
    try{
        const {AccountType} = req.body;
        if(AccountType != 'Instructor'){
            return res.status(500).json({
                success:false,
                message:`This is the protected route for Instructor`
            })
        }
        next();

    }catch(error){
       return res.status(500).json({
            success:false,
            message:`user role connot verified , please try again later`
        })
    }
}
