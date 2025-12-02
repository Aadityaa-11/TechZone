import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GetPassowordResetToken } from '../Services/Operations/authAPI';

export const ForgetPassword = () =>{

    const[EmailSend , SetEmailSend] = useState(false);
    const[EmailId , SetEmailId] = useState("");
    const{loading} = useSelector( (state)=> state.auth )
    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(GetPassowordResetToken(EmailId , SetEmailSend))
    }
    
    return(
        <div className='min-h-[calc(100vh-3.5rem)] flex justify-center items-center'>
            {
                loading ? 
                (
                <div>
                    <div className='spinner'></div>

                </div>) : 
                (<div className='max-w-[500px] p-4 lg:p-8'>

                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {
                            EmailSend ? "Chect Email" : "Reset Your Password"
                        }
                    </h1>

                    <p className='text-richblack-300 my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        {
                            EmailSend ? 
                             "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${EmailId}`
                        }
                    </p>

                    <form onSubmit={handleSubmit}>
                        {
                            !EmailSend && (
                            <label className='w-full'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    Email Address <sup className='text-pink-200'>*</sup>
                                </p>
                                <input 
                                    type='email'
                                    name='EmailId'
                                    value={EmailId}
                                    onChange={(e) => SetEmailId(e.target.value)}
                                    placeholder='Enter Email Address'
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                />
                            </label>
                            )}

                            <button
                            type='submit'
                            className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                                {
                                    EmailSend ? "Resend Email" : "Reset Password"
                                }
                            </button>
                    </form>
                    <div className='mt-6 flex items-center justify-between' >
                        <Link to="/login">
                            <p className='flex justify-center items-center gap-x-2 text-richblack-5'>
                            <BiArrowBack/> Back to Login
                            </p>
                        </Link>
                    </div>
        

                </div>)
            }

        </div>
    )

}