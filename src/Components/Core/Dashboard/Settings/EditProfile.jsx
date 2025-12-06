import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../Common/IconBtn'
import { UpdateProfile } from '../../../../Services/Operations/SettingsAPI'

const Genders = ["Male" , "Female" , "Non-Binary" , "Prefer not to say" , "Other"]

const EditProfile = () => {

    const {User} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) =>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
    
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const SubmitProfileForm = async(data) => {
        // console.log("Form data token" , data , token)
        // console.log("token" , token)
        try{
            dispatch(UpdateProfile(token , data))
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    

  return (
    <>
       <form onSubmit={handleSubmit(SubmitProfileForm)}>
          {/* Profile Information  */}
          <div className='flex flex-col my-10 gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 px-12 p-8 text-white'>
              <h2 className='text-lg font-semibold text-richblack-5'>
                Profile Information
                </h2>
              <div className='flex flex-col lg:flex-row gap-5'>
                 <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="FirstName" className='label-style'>FirstName</label>
                    <input 
                    type='text'
                    name='FirstName'
                    id='FirstName'
                    placeholder='Enter Your First Name'
                    className='form-style'
                    {...register("FirstName" , {required: true})}
                     defaultValue={User?.FirstName}
                    />
                    {
                        errors.FirstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your First Name
                            </span>
                        )
                    }
                 </div>

                 <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="LastName" className='lable-form'>LastName</label>
                    <input 
                    type='text'
                    name='LastName'
                    id='LastName'
                    placeholder='Enter Your Last Name'
                    className='form-style'
                    {...register("LastName" , {required:true})}
                    defaultValue={User?.LastName}
                    />
                    {
                        errors.LastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your Last Name
                            </span>
                        )
                    }
                 </div>
              </div>

              <div className='flex flex-col lg:flex-row gap-5'>
                   <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="DateOfBirth">Date Of Birth</label>
                        <input
                        type='date'
                        name='DateOfBirth'
                        id='DateOfBirth'
                        className='form-style'
                        {...register("DateOfBirth" , {
                            required:{
                                value: true,
                                message: "Please Enter Your Date of Birth",
                            },
                            max: {
                                value : new Date().toISOString().split("T")[0],
                                message : "Date of Birth Cannot be in the future.",
                            }
                        })}
                        defaultValue={User?.AdditionalDetails?.DateOfBirth}
                        />{
                            errors.DateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.DateOfBirth.message}
                                </span>
                            )
                        }
                   </div>

                   <div className='flex flex-col gap-2 lg:w-[48%]'>
                       <label htmlFor="Gender">Gender</label>
                       <select 
                         type = "text"
                         name="Gender" 
                         id="Gender"
                         className='form-style'
                         {...register("Gender" , {required:true})}
                         defaultValue={User?.AdditionalDetails?.Gender}
                         >
                            {
                                Genders.map( (element , index) => {
                                    return(
                                        <option key={index} value={element}>
                                            {element}
                                        </option>
                                    )
                                })
                            }
                       </select>
                       {
                        errors.Gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your Gender 
                            </span>
                        )
                       }
                   </div> 
              </div>

              <div className='flex flex-col lg:flex-row gap-5'>
                   <div className='flex flex-col lg:w-[48%] gap-2'>
                       <label htmlFor="ContactNumber" className='lable-style'>Contact Number</label>
                       <input
                         type='tel'
                         name='ContactNumber'
                         id='ContactNumber'
                         placeholder='Enter Your Contact Number'
                         className='form-style'
                         {...register("contactNumber" , {
                            required:{
                                value:true,
                                message:"Please Enter Your Contact Number.",
                            },
                            maxLength:{ value: 12 , message: "Invalid Contact Number"},
                            minLength: { value: 10 , message : "Invalid Contact Number"}
                         })}
                         defaultValue={User?.AdditionalDetails?.ContactNumber}
                         />
                         {
                            errors.ContactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.ContactNumber.message}
                                </span>
                            )
                         }
                   </div>

                   <div className='flex flex-col gap-2 lg:w-[48%]'>
                       <label htmlFor="About" className='lable-style'>About</label>
                       <input
                         type='text'
                         name='About'
                         id='About'
                         placeholder='Please Enter something about you'
                         className='form-style'
                         {...register("About" , {required:true})}
                         defaultValue={User?.AdditionalDetails?.About}
                       />
                       {
                        errors.About && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your About
                            </span>
                        )
                       }
                   </div>

              </div>
          </div>

          <div className='flex justify-end gap-2'>
            <button
             onClick={ () => {
                navigate("/dashboard/my-profile")
             }}
             className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
            >
            Cancel
            </button>
            <IconBtn type="submit" text="Save"/>
           </div>

       </form>
    </>
  )
}

export default EditProfile
