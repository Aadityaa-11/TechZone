const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({

    Gender : {
        type:String,
    },
    DateOfBirth:{
        type:String,
    },
    About:{
        type:String,
        require:true,
    },
    ContactNumber:{
        type:String,
        require:true,
    }
})

module.exports = mongoose.model("Profile" , ProfileSchema)