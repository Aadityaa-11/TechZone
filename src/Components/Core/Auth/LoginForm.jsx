import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {AiOutlineEyeInvisible , AiOutlineEye} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../../../Services/Operations/authAPI'

const LoginForm = ({setisLoggedIn}) => {

    const [formData , setformData] = useState({EmailId:"" , Password:""})
    const [showpassword , setshowpassword] = useState(false);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    

    function changeHandler(event){
        setformData((prevdata) =>(
            {
                ...prevdata,
                [event.target.name] : event.target.value
            }
        ))
    }

    function submithandler(event){
        event.preventDefault();

        

        dispatch(login(formData))

        dispatchEvent()
        setisLoggedIn(true)
        toast.success("Logged In Successfully")
        Navigate("/dashboard")
    }

  return (
    <form onSubmit={submithandler} className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'> 
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]  '>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>

            <input
               required
               type='email'
               placeholder='Enter Email Address'
               name='EmailId'
               value={FormData.EmailId}
               onChange={changeHandler}
               className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>
                Password<sup  className='text-pink-200'>*</sup>
            </p>

            <input
               required
               type= {showpassword ? ("text") : ("password")}
               placeholder='Enter Password'
               name='Password'
               value={FormData.Password}
               onChange={changeHandler}
               className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span className='absolute right-3 top-[38px] cursor-pointer'
            onclick={ () => setshowpassword( (prev) => !prev)} >
                {showpassword ? (<AiOutlineEyeInvisible fontsize='24px' fill='#AFB2BF'/>) : 
                (<AiOutlineEye fontsize='24px' fill='#AFB2BF' />)}
            </span>

            <Link to="#">
            <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                Forget Password
            </p>
            </Link>
        </label>

        <button className=' bg-yellow-50 rounded font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
           sign In 
        </button>
      
    </form>
  )
}

export default LoginForm
