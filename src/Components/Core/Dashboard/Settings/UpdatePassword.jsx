import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useForm } from 'react-hook-form'
import IconBtn from '../../../Common/IconBtn'
import { ChangePassword } from '../../../../Services/Operations/SettingsAPI'

const UpdatePassword = () => {

  const{token} = useSelector( (state) => state.auth)
  const navigate = useNavigate()

  const{
    register,
    handleSubmit,
    formState : {errors},
  } = useForm()

  const[ShowCurrentPassword , setShowCurrentPassword] = useState(false)
  const[ShowNewPassword , setShowNewPassword] = useState(false)

  const SubmitPasswordForm = async(data) =>{
    try{
      await ChangePassword(token , data)
    }catch(error){
      console.log("ERROR MESSAGE -" , error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(SubmitPasswordForm)} >
          <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 '>
            <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
            <div className='flex flex-col lg:flex-row gap-5'>
              <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                  <label htmlFor="CurrentPassword" className='lable-style'>Current Password</label>
                  <input 
                    type={ShowCurrentPassword ? "text" : "password"}
                    name='CurrentPassword'
                    id='CurrentPassword'
                    placeholder='Enter Current Password'
                    className='form-style'
                    {...register("CurrentPassword" , {required : true})}
                  />
                  <span
                    className='absolute right-3 top-[40px] z-[10] cursor-pointer'
                    onClick={ () => setShowCurrentPassword( (prev) => !prev)}
                  >
                    {
                      ShowCurrentPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                      ) : (
                        <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                      )
                    }
                  </span>
                  {
                    errors.CurrentPassword && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        "Please Enter your Current Password."
                      </span>
                    )
                  }
                   
              </div>
              <div className="relative flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="NewPassword" className="lable-style">
                  New Password
                </label>
                <input
                  type={ShowNewPassword ? "text" : "password"}
                  name="NewPassword"
                  id="NewPassword"
                  placeholder="Enter New Password"
                  className="form-style"
                  {...register("NewPassword", { required: true })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {ShowNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.NewPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your New Password.
                  </span>
                )}
              </div>  
            </div>
          </div>

          <div className='flex justify-end gap-2'>
             <button
              onClick={ () =>{
                navigate("/dashboard/my-profile")
              }}
              className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
              >
               cancel
             </button>
             <IconBtn type="submit" text="Update"/>
          </div>
      </form>
    </>
  )
}

export default UpdatePassword
