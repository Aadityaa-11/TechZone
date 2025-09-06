const Course = require("../Models/Course");
const Section = require("../Models/Section")

exports.CreateSection = async(req , res) =>{
    try{
        // data fetch
        const{CourseId , SectionName} = req.body;

        // data validation
        if(!CourseId || !SectionName){
            return res.status(500).json({
                success:false,
                message:`Missing Properties`
            });
        }

        // create section
        const newsection = await Section.create({SectionName});

        // update course with section ObjectID
        const UpdatedCourseDetails = await Course.findByIdAndUpdate(
                                                                    CourseId ,
                                                                    {
                                                                        $push :{
                                                                            CourseContent:newsection._id,
                                                                        }
                                                                    } , 
                                                                    {new:true}
                                                                );
        
        // return response
        return res.status(200).json({
            success:true,
            message:`Section created successfully`,
            UpdatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Course Creation Successfully`
        })
    }
}

exports.UpdateSection = async(req , res ) =>{
    try{
        // fetch the data input
        const {SectionName , SectionId} = req.body;

        // validate the data
        if(!SectionName || !SectionId){
            return res.status(500).json({
                success:false,
                message:`Missing Properties`
            })
        }

        // update data
        const section = await Section.findByIdAndUpdate( SectionId , {SectionName} , {new:true})
        
        // return response
        return res.status(200).json({
            success:true,
            message:`Section Updated Successfully`
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed in update Section`
        })
    }
}

exports.DeleteSection = async(req , res)=>{
    try{

        // get id (fetch) ==> assuming we are sendign in params
        const SectionId = req.params;

        // delete the section
        await Section.findByIdAndDelete(SectionId);

        // return response 
        return res.status(200).json({
            success:true,
            message:`Section Deleted Successfully`
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Someting went wrong , Failed in deleting the section`
        })
    }

}