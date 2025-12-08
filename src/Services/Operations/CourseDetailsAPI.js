import toast from "react-hot-toast";
import { CourseEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";



const {
    CREATE_COURSE_API,
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    EDIT_COURSE_API,
    GET_ALL_COURSE_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETIOIN_API   
} = CourseEndPoints

// ADD THE COURSE
export const AddCourse = async(Data , Token) =>{
    let Result = null 
    const ToastId = toast.loading("Loading.....")
    try{
        const Response = await apiConnector("POST" , CREATE_COURSE_API , Data , 
            {
                "Content-Type" : "multipart/form-data",
                authorization : `Bearer ${Token}`
            }
        )
        console.log("CREATE COURESE API RESPONSE...." , Response)

        if(Response?.data?.success){
            throw new Error("Could Not Add Course Details")
        }

        toast.success("Course Details Added Successfully")
        Result = Response?.data?.data 
    }catch(error){
        console.log("CREATE COURSE API ERROR.............." , error)
        toast.error(error.message)
    }
    toast.dismiss(ToastId)
    return Result
}