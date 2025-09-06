const mongoose = require('mongoose');
const MailSender = require("../utils/MailSender");
const template = require("../Mail/Template/EmailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    EmailId :{
        type:String,
        require:true,
    },
    OTP:{
        type:String,
        required:true,
    }, 
    CreatedAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,    // 5 minutes me expire kar jayega
    }
})

// a function to send emails 
async function SendVerificationEmail(EmailId , OTP){
    try{
        const mailResponse = await MailSender(EmailId ,
                                             "verification Email from StudyNotion" ,
                                              template(OTP));
        console.log("Email Sent Successfully : " , mailResponse);

    }catch(error){
        console.log("Error occured whie sending mails : " , error);
        throw error;

    }
}

OTPSchema.pre("save" , async function(next){
    await SendVerificationEmail(this.EmailId , this.OTP)
    next();
})



module.exports = mongoose.model("OTP" , OTPSchema)