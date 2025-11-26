// importing required modules
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const User = require("../Models/User")
require("dotenv").config();

// this function is used as middleware to authenticate User request
// authN ==> Authentication(user login h ki nhi check)
exports.AuthN = async(req , res , next)=>{
    try{

        // fetch the token (extracting jwt from request cookies , body or header)
        //  console.log("From body.token:", req.body.token);
    // console.log("From cookies.Token:", req.cookies?.token);
    // console.log("From header Authorization:", req.header("Authorization"));
        const token = req.cookies?.token 
                        || req.body?.token 
                        || req.header("Authorization")?.replace("Bearer ", "");
                     
        console.log("token inside authn" , token)

       // validate , if jwt is miising , return 401 unauthorized response
       if(!token){
        return res.status(401).json({
                success:false,
                message:`token is missing`
            })
       }

       // verify the token
       try{
        console.log("Inside verifying token ")
           // verifying the JWT using the secret key stored in environment variables
           let decode = jwt.verify(token , process.env.JWT_SECRET);  // it return the token
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
        console.log("AuthN middleware error" , error);
        // if there is an error during the authentication process , return 401 Uauthorized response
        return res.status(401).json({
                success:false,
                message: `Something went wrong while validating the token`,
                error : error.message
            })
    }
}

// Student 
exports.IsStudent = async(req, res , next)=>{
    try{
        
        if(req.User.AccountType !== 'Student'){
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
        console.log("AccountType" , req.UserAccountType)
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

exports.isInstructor = async(req, res , next) =>{
    try{
        console.log("AccountType : " , req.User.AccountType)
        if(req.User.AccountType !== 'Instructor'){
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
