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
    console.log("TOken inside addcourse " , Token)
    const ToastId = toast.loading("Loading.....")
    try{
        const Response = await apiConnector("POST" , CREATE_COURSE_API , Data , 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${Token}`
            }
        )
        console.log("Rsponse success" ,Response?.data?.success)
        console.log("CREATE COURESE API RESPONSE...." , Response)
        
 if (Response.data && Response.data.success !== true) {
            throw new Error(Response.data.message || "Could Not Add Course Details");
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
    
        Result = Response?.data?.AllCategories


    }catch(error){
        console.log("COURSE_CATEGORY_API API_ERROR............." , error)
        toast.error(error.message)
    }
    return Result
}

// create a section 
export const CreateSection = async(data , token) => {
    let Result = null 
    const ToastID = toast.loading('loading.....')
    try{
        const Response = await apiConnector( "POST" , CREATE_SECTION_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("CREATE SECTION API RESPONSE............" , Response)

        if(!Response?.data?.success){
            throw new Error("Could not Create Section")
        }
        toast.success("Course Section Created")
        Result = Response?.data?.UpdatedCourseDetails
    }catch(error){
        console.log("CREATE SECTION API ERROR..............." , error)
        toast.error(error.message)
    }
    toast.dismiss(ToastID)
    return Result
}

// create section 
export const UpdateSection = async(data , token) => {
    let Result = null 
    const ToastID = toast.loading("loading.....")
    try{
        const Response = await apiConnector( "POST" , UPDATE_SECTION_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("UPDATE SECTION API RESPONSE..............." , Response)
        
        if(!Response?.data?.success){
            throw new Error("Could not create section")
        }
        toast.success("Course Section Updated")
        Result = Response?.data?.data
    }catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(ToastID)
  return Result
}

// delete a section 
export const DeleteSection = async(data , token ) => {
    let Result = null 
    const ToastID = toast.loading("Loading......")
    try{
        const Response = await apiConnector( "POST" , DELETE_SECTION_API , data , {
            Authorization : `Bearer ${token}`
        })

        console.log("DELETE SECTION API RESPONSE............." , Response)
        if(!Response?.data?.success){
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        Result = Response?.data?.data 

    }catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(ToastID)
  return Result
}

// create a subsection
export const CreateSubSection = async(data , token) => {
    let Result = null
    const ToastID = toast.loading("loading.....")
    try{
        const Response = await apiConnector("POST" , CREATE_SUBSECTION_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("CREATE SUB-SECTION API RESPONSE.........." , Response)

        if(!Response?.data?.success){
            throw new Error("Could Not Add Lecture")
        }

        toast.success("Lecture Added")
        Result = Response?.data?.data 
    }catch(error){
        console.log("CREATE SUB SECTION API ERROR........." , error)
        toast.error(error.message)
    }
    toast.dismiss(ToastID)
    return Result
}

// update a subsection 
export const UpdateSubSection = async(data , token) => {
    let Result = null
    const ToastID = toast.loading("Loading......")
    try{
        const Response = await apiConnector("POST" , UPDATE_SUBSECTION_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("UPDATE SUB-SECTION API RESPONSE......." , Response)
        if(!Response?.data?.success){
            throw new Error("Could Not update lecture")
        }
        toast.success("Lecture Updated")
        Result = Response?.data?.data
    }catch(error){
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(ToastID)
    return Result
}

// delete sub-section 
export const DeleteSubSection = async(data , token) => {
    let Result
    const ToastID = toast.loading("loading....")
    try{
        const Response = await apiConnector("POST" , DELETE_SUBSECTION_API , data , {
            Authorization :  `Bearer ${token}`
        })
        console.log("DELETE SUB-SECTION API RESPONSE......." , Response)

        if(!Response?.data?.success){
            throw new Error("Could not Delete lecture")
        }
        toast.success("Lecture Deleted")
        Result = Response?.data?.data
    }catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(ToastID)
  return Result
}