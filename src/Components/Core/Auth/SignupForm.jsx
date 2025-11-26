import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Tab from "../../Common/Tab"
import { ACCOUNT_TYPE } from '../../../Utils/Constants';
import { setSignupData } from '../../../slices/authSlice';
import { sendotp } from '../../../Services/Operations/authAPI';

const SignupForm = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [AccountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [FormData , setformData] = useState({
        FirstName:"" , 
        LastName:"" ,
        EmailId:"" ,
        Password:"" ,
        ConfirmPassword:""
    });
    const [showpassword , setshowpassword] = useState(false);
    const [ShowConfirmpassword , setShowConfirmpassword] = useState(false);

    const {FirstName , LastName , EmailId , Password , ConfirmPassword} =  FormData
    

 // handle input field , when some value changes
    function changeHandler(event){

        setformData( (prevdata) =>(
            {
                ...prevdata,
                [event.target.name] : event.target.value
            }
        ))
    }

    function submithandler(event){
            event.preventDefault();
            if(Password != ConfirmPassword){
                toast.error("Password Do not match");
                return;
            }
            
            const signupData = {
                ...FormData ,
                AccountType,
            }
            // setting signup data to state
            // to be used after otp verification
            dispatch(setSignupData(signupData))
            // send OTP to user verification
            dispatch(sendotp(FormData.EmailId , Navigate))

            // Reset
            setformData({
                FirstName : "",
                LastName : "",
                Email : "",
                Password : "",
                ConfirmPassword : "",
            })
            setAccountType(AccountType.STUDENT)
  
            
        }
    
  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    // student - Instructor tab 
  <div className='text-white'>

    {/* Tab  */}
    <Tab tabData={tabData} field={AccountType} setfield={setAccountType} />

    <form onSubmit={submithandler} className='gap-y-4 flex w-full flex-col'>

    <div className='flex gap-x-4'>
        <label>
            <p className='mb-1 text-leading-[1.375rem]  text-[0.875rem] text-richblack-5'>
                First Name<sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type='text'
            placeholder='Enter your First Name'
            onChange={changeHandler}
            name='FirstName'
            value={FormData.FirstName}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label>

        <label>
            <p className='mb-1 text-leading-[1.375rem]  text-[0.875rem] text-richblack-5'>
                Last Name<sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type='text'
            placeholder='Enter your Last Name'
            onChange={changeHandler}
            name='LastName'
            value={FormData.LastName}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label>
    </div>

    <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address<sup className='text-pink-200'>*</sup>
        </p>

        <input 
        required
        type='text'
        placeholder='Enter Email Address'
        onChange={changeHandler}
        name='EmailId'
        value={FormData.EmailId}
        style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"      
        />
    </label>

    <div className='flex gap-x-4'>
        <label className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password<sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type={showpassword ? ("text") : ("password")}
            placeholder='Enter Password'
            name='Password'
            value={FormData.Password}
            onChange={changeHandler}
            style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"      
            />

            <span className='absolute right-3 top-[38px] z-[10] cursor-pointer'
             onClick={() => setshowpassword( prev => !prev )}>
                {showpassword ? 
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                 (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
            </span>
        </label>

        <label className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password<sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type={ShowConfirmpassword ? ("text") : ("password")}
            placeholder='Confirm Password'
            name='ConfirmPassword'
            value={FormData.ConfirmPassword}
            onChange={changeHandler}
            style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"  

            />

            <span className='absolute right-3 top-[38px] z-10 cursor-pointer'
            onClick={ () => setShowConfirmpassword( prev => !prev )}>
                {ShowConfirmpassword ? 
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
            </span>
        </label>
    </div>

    <button 
    type='submit'
    className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
    
    > 
        create Account
    </button>
   </form>

  </div>
  )
}

export default SignupForm
