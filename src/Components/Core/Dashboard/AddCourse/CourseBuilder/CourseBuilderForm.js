import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddCircleOutline } from 'react-icons/md'
import {BiRightArrow} from "react-icons/bi"
import {toast} from "react-hot-toast"

import NestedView from './NestedView'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/CourseSlice'
import { CreateSection, UpdateSection } from '../../../../../Services/Operations/CourseDetailsAPI'


const CourseBuilderForm = () => {

    const{
        register,
        handleSubmit,
        setValue,
        formState : {errors}
    } = useForm()

    const[ EditSectionName , setEditSectionName] = useState(null)
    const {Course} = useSelector( (state) => state.Course)
    const dispatch = useDispatch()
    const {token} = useSelector( (state) => state.auth)
    const [loading , setloading] = useState(false)

    const CancelEdit = () => {
        setEditSectionName(null)
        setValue("SectionName" , "")
    }

    const goToBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))

    }

    const goToNext = () => {
        
        if(Course?.CourseContent?.length === 0){
            toast.error("Please add atleast one Section")
            return;
        }
        if(Course.CourseContent.some( (section) => section.subSection.length === 0 )){
            toast.error("Please add atleast one lecture in each section")
            return
        }

        // if everything is good
        dispatch(setStep(3))
    }

    const HandleChangeEditSectionName = (SectionId , SectionName) => {
        if(EditSectionName === SectionId){
            CancelEdit()
            return;
        }

        setEditSectionName(SectionId)
        setValue("SectionName" , SectionName)
    }

    const onSubmit = async(data) => {
        setloading(true)
        let Result

        console.log("Section Name " , data.SectionName)
        

        if(EditSectionName){
            // we are editing the section name
            Result = await UpdateSection(
                {
                    SectionName : data.SectionName , 
                    SectionId : EditSectionName,
                    CourseId : Course._id ,
                } , token)
        }
        else{
            Result = await CreateSection({
                SectionName : data.SectionName,
                CourseId : Course._id ,
            } , token)
        }

        // update values
        if(Result){
            dispatch(setCourse(Result))
            setEditSectionName(null)
            setValue( "SectionName" , "" )
        }

        // loading false
        setloading(false)
    }




  return (
    <div className='text-richblack-5'>
            
        <h2>Course Builder</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div>
                <label htmlFor='SectionName'>Section Name <sup className='text-pink-200'>*</sup></label>
                <input 
                name='SectionName' 
                id='SectionName'
                placeholder='Add Section Name'
                {...register( "SectionName" , {required : true})}
                className='w-full'
                />
                {
                    errors.SectionName && (
                        <span>Section Name is required</span>
                    )
                }
            </div>

            <div className='mt-10 flex w-full'>
                <IconBtn 
                  type="submit"
                  text={ EditSectionName ? "Edit Section Name" : "Create Section"}
                  outline={true}
                  customClasses={"text-white"}
                  >
                    <MdAddCircleOutline size={20} className='text-yellow-50' />
                </IconBtn>
                {
                    EditSectionName && (
                        <button 
                         type='button'
                         onClick={CancelEdit}
                         className='text-sm text-richblack-300 underline ml-10'
                         >
                            Cancel Edit
                         </button>
                    )
                }
            </div>
        </form>

        {
            Course?.CourseContent?.length > 0 && (
                <NestedView HandleChangeEditSectionName={HandleChangeEditSectionName} />
            )
        }

        <div className='flex justify-end gap-x-3 mt-10'>
            <button
              className='rounded-md cursor-pointer flex items-center'
              onClick={goToBack}
             >
                Back
            </button>

            <IconBtn text="Next" onClick={goToNext}>
                <BiRightArrow />
            </IconBtn>
        </div>


      
    </div>
  )
}

export default CourseBuilderForm
