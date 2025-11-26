import React, { useState } from 'react'
import HighlightText from './HighlightText';
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const ExploreMore = () => {
    const tabsName = [
            "Free",
            "New to coding",
            "Most popular",
            "Skills paths",
            "Career paths",
            ];

    const[currenttab , setcurrenttab] = useState(tabsName[0]);
    const[courses , setcourses] = useState(HomePageExplore[0].courses);
    const[currentcard , setcurrentcard] = useState(HomePageExplore[0].courses[0].heading)
    
    const setMyCard = (value) =>{
      setcurrenttab(value)
      const result = HomePageExplore.filter( (object) => object.tag == value) 
      // this line return arrray of object
      setcourses(result[0].courses);
      setcurrentcard(result[0].courses[0].heading)  // by default first card pe shadow chahete h ya seclected dhekhe

    }

  return (
    <div>
      {/* explore more section  */}
      <div>
        <div>
          <div className='text-4xl font-semibold text-center '>
            Unlock the <HighlightText text={"Power of Code"} />
          </div>

          <div className='text-center text-richblack-300 text-lg font-semibold mt-1'>
            Learn to Build Anything You can Imagine
          </div>
        </div>

      {/* Tabs section  */}
        <div className='hiddenflex lg:flex justify-center items-center mx-auto mt-5 w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] '> 
          {
           tabsName.map( (element , index)=>{
            return(
              <div key={index} onClick={() => setMyCard(element)}
              className={`text-center text-richblack-300 text-lg font-semibold 
              ${currenttab == element
              ? "bg-richblack-900 text-richblack-5 font-medium"
              :   "text-richblack-200"} px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5`}
              >
                {element} 
              </div>
            )
           })
          }
        </div>
        <div className="hidden lg:block lg:h-[200px]"></div>


      {/* card section */}
        <div className="lg:absolute flex flex-wrap  w-full justify-center lg:justify-between gap-10 lg:bottom-[0] lg:left-[50%] lg:translate-y-[50%] lg:translate-x-[-50%] text-black lg:mb-0 px-3 lg:px-0 ">
          {
            courses.map( (element , index) =>{
              return(
                <CourseCard
                key={index}
                cardData={element}
                currentcard={currentcard}
                setcurrentcard={setcurrentcard}
                // setcurrentcard and currentcard isliye bhej rahe h jisse shadow lag pai
                />
              )
            })

          }
        </div>
      </div>
      
    </div>
  )
}

export default ExploreMore
