import React, { useState } from 'react'
// import Signup from '..'
import frameImage from '../../../assets/Images/frame.png'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc";

import { useSelector } from 'react-redux'

const Template = ({title , desc1 ,desc2 , Image , formtype , setisLoggedIn}) => {
     const{loading} = useSelector( (state) => state.auth)
    return (

    <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-20px gap-y-0 '>
        {
            loading ? 
            (
                <div>loding...</div>
            ):
            (
                <div className='mx-auto flex max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-36'>
                    <div className='w-11/12 max-w-[450px] mx-auto md:mx-0'>
                        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] '>{title}</h1>

                        <p className='text-[1.125rem] leading[1.625rem] mt-4'>
                            <span className='text-richblack-100'>{desc1}</span>
                            {" "}
                            <span className='text-blue-100 italic'>{desc2}</span>
                        </p>

                        {formtype === "Signup" ?
                        (<SignupForm setisLoggedIn = {setisLoggedIn}/>) :
                        (<LoginForm setisLoggedIn={setisLoggedIn}/>)
                        }

                        <div className='flex w-full items-center my-4 gap-x-2'>
                            <div className='w-full h-[1px] bg-richblack-700 leading[1.375rem]'></div>
                            <p className='text-richblack-700 font-medium leading-[1.375rem]'>
                                OR
                            </p>
                            <div className='w-full h-[1px] bg-richblack-700'></div>
                        </div>

                        <button className='w-full flex justify-center items-center rounded-[8px] font-medium text ring-richblack-100
                        border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6
                        '>
                            <FcGoogle />
                            <p className='text-richblack-200'>Sign up with Google</p>
                        </button>

                    </div>

                    <div className='relative w-11/12 max-w-[450px] mx-auto md:mx-0'>
                        <img src={frameImage}
                        alt='pattern'
                        width={558}
                        height={504}
                        loading='lazy'
                        />

                        <img src={Image} 
                        alt='image'
                        width={558}
                        height={480}
                        loading='lazy'
                        className='absolute top-4 right-4 z-10'
                        />

                    </div>
                </div>
            )
        }      
    </div>
  )
}

export default Template
