import {toast} from "react-hot-toast"

import { setLoading , setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../slices/ProfileSlice"
import { GiConsoleController } from "react-icons/gi"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
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

            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.message)
                
            }

            toast.success("OTP SEND SUCCESSFULLY")
            navigate("/verify-emailid")
        }catch(error){
            console.log("SENDOTP API ERROR........", error)
            const msg = error.response?.data?.message || "Something went wrong , Try Again";
            toast.error(msg)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function Signup(
    FirstName,
    LastName,
    EmailId,
    Password,
    ConfirmPassword,
    AccountType,
    otp,
    navigate
){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST" , SIGNUP_API , {
                FirstName, 
                LastName,
                EmailId,
                Password,
                ConfirmPassword,
                AccountType,
                otp,
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successfull")
            navigate("/login")
        }catch(error){
            console.log("SIGNUP API ERROR..........")
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }

}

export function login(EmailId , Password , navigate){
    return async(dispatch) => {
        const toastId  = toast.loading("loding....")
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST" , LOGIN_API , {
                EmailId , Password
            })
            console.log("LOGIN API RESPONSE.......")

            if(!response.data.success){
                throw new error(response.data.message)
            }
            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))

            const UserImage = response.data?.user?.UserImage
            ? response.data.user.UserImage
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user , Image : UserImage}))
            
            localStorage.setItem("token" , JSON.stringify(response.data.token))
            localStorage.setItem("User" , JSON.stringify(response.data.user))
            
            navigate("/Dashboard/my-profile")

        }catch(error){
            console.log("LOGIN API ERROR.........")
            toast.error("LOGIN FAILED")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function Logout(){
    return async(dispatch) =>{
        
    }
}
    





