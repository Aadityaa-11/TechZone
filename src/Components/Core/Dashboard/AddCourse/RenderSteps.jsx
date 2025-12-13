import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import PublishCourse from './PublishCourse/PublishCourse'
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"

const RenderSteps = () => {

    const {Step} = useSelector( (state) => state.Course)
    const Steps = [
        {
            id : 1 , 
            title : "Course Information",
        },
        {
            id : 2 ,
            title : "Course Builder",
        },
        {
            id : 3,
            title : "Publish"
        }
    ]

    console.log("step : " , Step)
  return (
    <>

        <div className='relative mb-2 flex w-full justify-center'>
            {
                Steps.map( (item ) => (
                    <>
                        <div 
                        key={item.id}
                        className='flex flex-col items-center'
                        >
                            <button
                            className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                                ${ Step === item.id 
                                    ? "border-y-blue-50 bg-yellow-800 text-yellow-50"
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                } ${Step > item.id && "bg-yellow-50 text-yellow-50"}`}
                            >
                                {
                                    Step > item.id ? ( 
                                        <FaCheck className='font-bold text-richblack-900'/>
                                    ) : (
                                        item.id
                                    )
                                }
                            </button>
                        </div>

                        // Dash -- Dash bane rahe 
                        {
                            item.id != Steps.length && (
                                <>
                                    <div
                                        className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 
                                            ${Step > item.id ? "border-yellow-50" : "border-richblack-500"}`}
                                        >
                                    </div>
                                </>

                            )
                        }
                    
                    </>
                ))
            }
        
        </div>

        <div className='relative mb-16 flex w-full select-none justify-between'>
            {
                Steps.map( (item) => (
                    <>
                      <div
                      className='flex min-w-[130px] flex-col items-center gap-y-2 '
                      >
                        <p className={`text-sm ${
                            Step >= item.id ? "text-richblack-5" : "text-richblack-500"
                        }`}>
                            {item.title}</p>
                      </div>
                    </>
                ))
            }
            
        </div>

        {/* Render specific comonent based on current step  */}
        {Step === 1 && <CourseInformationForm/> }
        {Step === 2 && <CourseBuilderForm/>}
        {Step === 3 && <PublishCourse/>}

    
    </>
  )
}

export default RenderSteps
