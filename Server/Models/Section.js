const mongoose = require("mongoose")
const MimeNode = require("nodemailer/lib/mime-node")
const SubSection = require("./SubSection")

const SectionSchema = new mongoose.Schema({
    
    SectionName:{
        type : String,
    },
    SubSection:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"SubSection"
    }]
})

module.exports = mongoose.model("Section" , SectionSchema)