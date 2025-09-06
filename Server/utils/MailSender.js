const nodemailer = require("nodemailer")

const MailSender = async(EmailId , TiTle , Body)=>{
    try{
        let Transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        let info = await Transporter.sendMail({
            from : "TechZone || by Aditya Yadav",
            to : `${EmailId}`,
            subject : `${TiTle}`,
            html : `${Body}`
        })
        console.log("INFO" , info);
        return info;

    }catch(error){
        console.log(error.message);
    }
}

module.exports = MailSender;