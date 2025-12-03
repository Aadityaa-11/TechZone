import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import CountryCode from "../../data/countrycode.json"
import Buttons from '../Core/HomePage/Buttons'
import {apiConnector} from "../../Services/apiconnector"
import { contactusformEndpoint } from '../../Services/apis'


const ContactusForm = () => {
    const[loading , setLoading] = useState()
    const{
        register,
        handleSubmit,
        reset,
        formState : {errors , isSubmitSuccessful},
    } = useForm()

    const submitContactForm = async(data) =>{
        try{
            console.log("Data is : " , data)
            setLoading(true)
            console.log("api call")
            const res = await apiConnector("POST" , contactusformEndpoint.CONTACTUSFORM_API , data)
            setLoading(false)
        }catch(error){
            console.log("Error , Something went wrong" , error)
            console.log("Error Message" , error.message)
            setLoading(false)

        }
    }

    useEffect( ()=>{
        if(isSubmitSuccessful){
            reset({
                FirstName: "",
                EmailId:"",
                LastName:"",
                PhoneNo:"",
                Message:""
            })
        }

    } , [reset , isSubmitSuccessful])

  return (
    <form 
    className='flex flex-col gap-7'
    onSubmit={handleSubmit(submitContactForm)}>
        
        <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label htmlFor='FirstName' className='lable-style'>
                    First Name
                </label>
                <input
                type='text'
                name='FirstName'
                id='FirstName'
                placeholder='Enter Your First name'
                className="form-style"
                {...register("FirstName" , {required : true})}
                />
                {
                    errors.FirstName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please Enter your name
                        </span>
                    )
                }

            </div>

            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label htmlFor='LastName' className='lable-style'>
                    Last Name
                </label>
                <input
                type='text'
                name='LastName'
                id='LastName'
                placeholder='Enter Your Last Name'
                className='form-style'
                {...register("LastName" , {required : true})}
                />
            </div>      
        </div>

        <div className='flex flex-col gap-2 '>
            <label htmlFor='EmailId' className='lable-style'>
                    Email Address
            </label>
            <input
            type='email'
            name='EmailId'
            id='EmailId'
            placeholder='Enter Email Address'
            className='form-style'
            {...register("EmailId" , {required:true})}
            />
            {errors.EmailId && (
                <span className='-mt-1 text-[12px] text-yellow-100' >
                    Please Enter Your Email Address.
                </span>
            )}
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor='PhoneNo' className='lable-style'>
                Phone Number 
            </label>
            

            <div className='flex gap-5'>
                
                    <select
                    type="text"
                    name='CountryCode'
                    id='CountryCode'
                    className='form-style w-[80px]'
                    {...register("CountryCode" , {required:true})}
                    >
                        {
                            CountryCode.map( (element , index) => {
                                return(
                                    <option key={index} value={element.code}>
                                        {element.code}-- {element.country}
                                    </option>
                                )
                            })
                        }

                    </select>
                

                
                    <input
                    type='number'
                    name="PhoneNo"
                    id="PhoneNo"
                    placeholder='12345-6789'
                    className="form-style w-[calc(100%-80px)]"
                    {...register("PhoneNo" , {
                        required:{
                            value:true,
                            message:"Please Enter Your Phone Number.",
                        },
                        maxLength : {value : 12 , message : "Invalid Phone Number"},
                        minLength : {value : 10 , message : "Invalid Phone Number"}
                    })}
                    />
                
            </div>
            {
                errors.PhoneNo && (
                    <span className='-mt-1 text-[12px] text-yellow-100'>
                        {errors.PhoneNo.message}
                    </span>
                )
            }
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor='Message' className='lable-style'>
                Message
            </label>
            <textarea
            name='Message'
            id='Message'
            cols="30"
            rows="7"
            placeholder='Enter Your Message here'
            className='form-style'
            {...register("Message" , {required:true})}
            />
            {
                errors.Message && (
                    <span className='-mt-1 text-[12px] text-yellow-100'>
                        Please Enter your Message
                    </span>
                )
            }
        </div>

        <button
        disabled={loading}
        type='submit'
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
            ${
                !loading && 
                "transition-none duration-200 hover:scale-95 hover:shadow-none"
                } disabled:bg-richblack-500 sm:text-[16px]`}
        >
            Send Message
        </button>
    </form>
  )
}

export default ContactusForm
