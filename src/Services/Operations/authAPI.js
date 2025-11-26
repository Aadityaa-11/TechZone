import {toast} from "react-hot-toast"

import { setLoading , setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { Navigate } from "react-router-dom"

const {
    SENDOTP_API,
    SIGNUP_API,
} = endpoints

export function sendotp(EmailId , navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , SENDOTP_API , {
                EmailId, 
                // CheckUserPresent : true,
            })
            console.log("SENDOTP API RESPONSE.........." , response)
            toast.success("Data is printed in console")

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP SEND SUCCESSFULLY")
            navigate("/login")
        }catch(error){
            console.log("SENDOTP API ERROR........", error)
            toast.error("COULD NOT SEND OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

