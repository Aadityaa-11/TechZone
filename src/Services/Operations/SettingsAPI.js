import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { SettingsEndpoints } from "../apis"
import { setUser } from "../../slices/ProfileSlice"
import { setLoading } from "../../slices/authSlice"
import {Logout} from "./authAPI"

const{
    UPDATE_DiSPLAY_PICTURE_API , 
    UPDATE_PROFILE_API , 
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = SettingsEndpoints


export function UpdateDisplayPicture(token , FormData){
    return async(dispatch) => {
        const ToastId = toast.loading("Loading....")
        try{
            const Response = await apiConnector("PUT" , 
                UPDATE_DiSPLAY_PICTURE_API , 
                FormData,
                {
                    "Content-Type" : "multipart/Form-Data",
                    Authorization : `Bearer ${token}`,
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                Response
            )

            if(!Response.data.success){
                throw new Error(Response.data.message)
            }
            toast.success("Display Picture Updated Successfully ")
            dispatch(setUser(Response.data.data))

        }catch(error){
               console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
              toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(ToastId)
    }
}

export function UpdateProfile(token , FormData){
    return async(dispatch) =>{
        const ToastId = toast.success("Loading...")
        try{
            console.log("token" , token)
            const response = await apiConnector("PUT" , UPDATE_PROFILE_API , 
                FormData ,
                {
                    Authorization : `Bearer ${token}`,
                }
            )
            console.log("UPDATE_PROFILE_API API_RESPONSE........." , response)

                if(!response.data.success){
                    throw new Error(response.data.message)
                }

                const UserImage = response.data.UpadatedProfileDetails && response.data.UpdatedProfileDetails.Image
                ? response.data.UpadatedProfileDetails.Image 
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.UpdatedProfileDetails?.FirstName} ${response.data.UpdatedProfileDetails?.LastName}`

                dispatch(
                    setUser({...response.data.UpadatedProfileDetails , Image : UserImage})
                )

                toast.success("Profile Updated Successfully")
        }catch(error){
            console.log("UPDATE_PROFILE_API API ERROR......" , error)
            toast.error("Could Not Update Profile , Something went wrong")
        }
        toast.dismiss(ToastId)
    }
}

export function ChangePassword(token , formData){
    return async(dispatch) =>{
        const ToastId = toast.loading("Loading.....")
        try{
            const Response = await apiConnector( "POST" , CHANGE_PASSWORD_API ,
                formData,
                {
                    Authorization : `Bearer ${token}`
                }
            )
            console.log("CHANGE_PASSWORD_API API RESPONSE............." , Response)

            if(!Response.data.success){
                throw new Error(Response.data.message)
            }

            toast.success("Password Changed Successfully")
        }catch(error){
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(ToastId)
    }
}

export function deleteProfile(token , navigate){
    return async(dispatch) =>{
        const ToastId  = toast.loading("Loading....")
        try{
            const Response = await apiConnector("DELETE" , DELETE_PROFILE_API ,
                null , 
                {
                    Authorization : `Bearer ${token}`
                }
            )
            console.log("DELETE_PROFILE_API API RESPONSE............." , Response)

            if(!Response.data.success){
                throw new Error(Response.data.message)
            }
            toast.success("Profile Deleted Succesfully")
            dispatch(Logout(navigate))

        }catch(error){
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(ToastId)
    }
}