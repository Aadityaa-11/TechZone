import React from 'react'
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData , currentcard , setcurrentcard}) => {
  console.log("curretndata ; " , currentcard)
  return (

    <div className={`w-[360px] lg-[30%] ${currentcard == cardData?.heading ? " bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
       : "bg-richblack-800"} text-richblack-25 h-[300px] box-border cursor-pointer`}
    onClick={()=> setcurrentcard(cardData?.heading)} >
           
           <div className='border-richblack-400 border-b-[2px] border-dashed h-[80%] p-6 flex flex-col gap-3 '>
                <div className={`${currentcard == cardData?.heading ? "text-richblack-800" : ""} font-semibold text-[20px]`}>
                    {cardData?.heading}
                </div>

                <div className='text-richblack-400'>
                    {cardData?.description}
                </div>
           </div>

             {/* level and flow chart */}
            <div className={`flex justify-between ${currentcard === cardData?.heading ? "text-blue-300" : "text-richblack-300"} px-6 py-3 font-medium `}>
                {/* level */}
                <div className='flex items-center gap-2 text-[16px]'>
                    <HiUsers/>
                    <p>{cardData?.level}</p>
                </div>
                {/* lessions */}
                <div className='flex items-center gap-2 text-[16px]'>
                    <ImTree/>
                   <p>{cardData?.lessionNumber} Lessions</p>
                </div>
            </div>
    </div>
  )
}

export default CourseCard
