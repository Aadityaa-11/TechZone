import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../Common/IconBtn'
import { RiEditBoxLine } from "react-icons/ri"
import { FormattedDate } from '../../../Utils/DateFormatter'

const MyProfile = () => {

    const{User} = useSelector( (state) => state.profile)
    const navigate = useNavigate()
    
  return (
    <>
       <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Profile</h1>
       
       {/* section 1  */}
       <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className="flex items-center gap-x-4">
                <img
                src={User?.Image} 
                alt={`profile-${User?.FirstName}`}
                className='aspect-square w-[78px] rounded-full object-cover'
                />

                <div className='space-y-1'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        {User?.FirstName + " " + User?.LastName}</p>
                    <p className='text-sm text-richblack-300'>
                        {User?.EmailId}
                    </p>
                </div>
            </div>
            <IconBtn text="Edit" onClick={()=> navigate("/dashboard/settings")}>
                <RiEditBoxLine/>
            </IconBtn>
       </div>

        {/* section 2  */}
       <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
          <div className='flex w-full justify-between items-center'>
            <p className='text-lg font-semibold text-richblack-5'>About</p>
            <IconBtn
            text="Edit"
            onClick={()=>{
                navigate("/dashboard/settings")
            }}
            >
                <RiEditBoxLine/>
            </IconBtn>
          </div>

          <p
           className={`${
            User?.AdditionalDetails?.About
            ? "text-richblack-5"
            : "text-richblack-400"
           } text-sm font-medium`} 
          >
            {User?.AdditionalDetails?.About ?? "Write Something About Yourselft"}
          </p>
       </div>

       {/* section 3  */}
       <div className='flex flex-col justify-between p-8 border-[1px] border-richblack-700 bg-richblack-800'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-3xl text-richblack-5'>Personal Details </p>
                <IconBtn 
                   text="Edit"
                    onClick={()=> {
                        navigate("/dashboard/settings")
                    }}>
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            <div className='flex max-w-[500px] justify-between'>
                <div className='flex flex-col gap-y-5'>
                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                        <p className='text-sm font-medium text-richblack-5'>{User?.FirstName}</p>
                    </div>
                

                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>Email</p>
                        <p className='text-sm font-medium text-richblack-5'>{User?.EmailId}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                        <p className='text-sm font-medium text-richblack-5'>{User?.AdditionalDetails?.Gender ?? "Add Gender"}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-y-5'>
                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                        <p className='text-sm font-medium text-richblack-5'>{User?.LastName}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                        <p className='text-sm font-medium text-richblack-5'>{User?.AdditionalDetails?.ContactNumber ?? "ADD Contact Number "}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
                        <p className='text-sm font-medium text-richblack-5'>{FormattedDate(User?.AdditionalDetails?.DateOfBirth) ?? "Add Date of Birth"}</p>
                    </div>
                </div>

            </div>
            
       </div>
    </>
  )
}

export default MyProfile
