const {instance} = require("../Config/razorpay");
const Course = require("../Models/Course");
const User = require("../Models/User");
const MailSender = require("../utils/MailSender")
const {CourseEnrollmentEmail} = require("../Mail/Template/CourseEnrollmentEmail");
const Razorpay = require("razorpay");
const mongoose = require("mongoose")



exports.CapturePayment = async(req , res)=>{

    // get CourseID and UserID 
    const {CourseID }= req.body;
    const UserID = req.User.id; 
    // Validation
    // validate courseID
    if(!CourseID ){
        return res.status(401).json({
            success:false,
            message:`Provide a valid CourseID`
            
        })
    }

    // validate CourseDetails(es id se user ki details aa rahi h bo valid h ki nhi )
    let course;
    try{
        course = await Course.findById(CourseID);
        if(!course){
            return res.status(401).json({
                success:false, 
                message:`Could not find the course`
            })
        }

        // User already pay for the same course
        // UserID string ha aur Course me studentEnrolled ha bo objectID me ha so convert it 
        const uid = new mongoose.Types.ObjectId(UserID);
        if(course.StudentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:`User already Enrolled in course`
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
    // order create
    const Amount = course.price;
    const Currency = "INR";

    const options = {
        amount : Price * 100,
        Currency,
        reciept:Math.random(Date.now()).toString(),
        notes:{
            CourseID:CourseID,
            UserID
        }

    }

    try{
        // initiate teh payment using razorpay
        const PaymentResponse = await instance.orders.create(options);
        console.log(PaymentResponse);
        return res.status(200).json({
            success:true,
            CourseName : course.CourseName,
            Description : course.Description,
            ThumbNail : course.ThumbNail,
            orderID : PaymentResponse.id , 
            currency : PaymentResponse.currency,
            amount : PaymentResponse.amount,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
           message:`Could not initiate order`
        })
    }

    

}

// Verify the signature of Razorpay and server
exports.verifyPayment = async(req , res)=>{
    const WebHookSecret = "123456789";

    const Signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256" , WebHookSecret); // object return karega 
    shasum.update(JSON.stringify(req.body));   // string me convert karo 
    const digest = shasum.digest("hex");  
    // jab bhi hashing algo apply karte h to output hexadecimal me aata h (aur usko generally digest karhte h to apply kar dia)


    if(Signature === digest ){

        console.log(`Payment is authorized`)

        const{CourseID , UserID} = req.body.payload.payment.entity.notes;

        try{
            // action

            // find the course and student enrolled in courese
            const StuEnrollInCourse = await Course.findByIdAndUpdate(
                                                               {_id:CourseID},
                                                               {$push:{
                                                                StudentEnrolled:UserID
                                                               }},
                                                               {new:true}
            );

            console.log("StuEnrollInCourse" , StuEnrollInCourse);

            // find the User and add the course in which user is enrolled 
            const UserHaveCourses = await User.findByIdAndUpdate( 
                                                          {_id:UserID},
                                                          {$push:{
                                                            Courses:CourseID
                                                          }},
                                                          {new:true},
            );

            console.log("UserHaveCourses" , UserHaveCourses)


            // sending the mail to the user
            const EmailResponse = await MailSender(
                                             UserHaveCourses.EmailId,
                                             `Congratualation from Codezone`,
                                             `Now you are able to access the course`

            )

            console.log(`EmailResponse` , EmailResponse)

            // return response 
            return res.status(200).json({
                success:true,
                message: "Payment verified and course enrolled successfully",
            })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message:`Invalid request`
        })
    }



}