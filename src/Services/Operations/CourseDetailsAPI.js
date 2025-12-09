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

// Edit the course details
export const EditCourseDetails = async(Data , Token) => {
    let Result = null 
    const ToastId = toast.loading("loading....")
    try{
        const Response = await apiConnector( "POST" , EDIT_COURSE_API , Data ,
            {
                "Content-Type" : "multipart/form-data",
                authorization : `Bearer ${Token}`

            }
        )
        
            console.log("EDIT COURSE API RESPONSE........." , Response)

            if(!Response?.data?.success){
                throw new Error("Could not update course Details")
            }

            toast.success("Course Details Updated Successfully")
            Result = Response?.data?.data

    }catch(error){
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(ToastId)
    return Result
}

export const FetchCourseDetails = async(CourseId) => {
    const ToastID = toast.loading("Loading...")
    let Result = null
    try{
        const Response = await apiConnector( "POST" , COURSE_DETAILS_API , 
            {
                CourseId
            }
        )

        if(!Response?.data?.success){
            throw new Error(Response.data.message)
        }
        toast.success("Data Fetch Successfully")
        Result = Response.data

    }catch(error){
        console.log("COURSE DETAILS API ERROR ......" , error)
        toast.error(error.Response.data.message)
    }
    toast.dismiss(ToastID)
    return Result
}

export const GetAllCourse = async() => {
    const ToastId = toast.loading("Loading....")
    let Result = []
    try{
        const Response = await apiConnector("GET" , GET_ALL_COURSE_API )
        if(!Response?.data?.success){
            throw new Error("Could not able to fetch all courses")
        }

        Result = Response?.data?.data
    }catch(error){
        console.log("GET_ALL_COURSE_API API ERROR......" , error)
        toast.error(error.message)
    }
    toast.dismiss(ToastId)
    return Result

}


// Fething the Available course Categories
export const FetchCourseCategories = async() =>{
    let Result = []
    try{
        const Response = await apiConnector( "GET" , COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API RESPONSE.........." , Response)

        if (!Response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
        }
    
        Result = Response?.data?.data


    }catch(error){
        console.log("COURSE_CATEGORY_API API_ERROR............." , error)
        toast.error(error.message)
    }
    return Result
}