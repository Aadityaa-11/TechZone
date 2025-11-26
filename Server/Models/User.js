// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const UserSchema = new mongoose.Schema({
    // Define the name field with type String, required, and trimmed
    FirstName:{
        type : String,
        require:true,
    },
    LastName:{
        type : String,
        require:true,
    },
    // Define the email field with type String, required, and trimmed
    EmailId:{
        type:String,
        require:true,
    },
    // Define the password field with type String and required
    Password:{
        type:String,
        require:true,
    },
    ConfirmPassword:{
        type:String,
        require:true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    AccountType:{
        type:String,
        enum : ["Admin" , "Instructor" , "Student"],
        require:true,
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:true,

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

},
{timestamps:true}
)

module.exports = mongoose.model("User" , UserSchema)

