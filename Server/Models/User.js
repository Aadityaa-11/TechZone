const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    FirstName:{
        type : String,
        require:true,
    },
    LastName:{
        type : String,
        require:true,
    },
    EmailId:{
        type:String,
        require:true,
    },
    Password:{
        type:String,
        require:true,
    },
    ConfirmPassword:{
        type:String,
        require:true,
    },
    AccountType:{
        type:String,
        enum : ["Admin" , "Instructor" , "Student"],
        require:true,
    },
    AdditionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Profile",
    },
    Courses:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
        }
    ],
    Image:{
        type:String,
        require:true,
    },
    Token:{
        type:String,
    },
    ResetPasswordExpires:{
        type:Date,
    },
    CourseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]

})

module.exports = mongoose.model("User" , UserSchema)

