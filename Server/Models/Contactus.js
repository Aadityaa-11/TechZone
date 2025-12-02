const mongoose = require("mongoose")

const ContactusSchema = new mongoose.Schema({
    FirstName : {
        type:String, 
        require:true,
    },
    LastName : {
    type:String, 
    require:true,
    },
    EmailId:{
        type:String,
        require:true,
    },
    PhoneNo: {
        type:Number,
        
    },
    Message:{
        type:String,
        require:true,
    },
}, 
   {timestamps: true}
);

module.exports = mongoose.model("Contactus" , ContactusSchema)