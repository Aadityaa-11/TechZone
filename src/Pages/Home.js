import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../Components/Core/HomePage/HighlightText';
import CTAButton from '../Components/Core/HomePage/Buttons'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks';
import Footer from '../Components/Common/Footer';
import frame from "../assets/Images/bghome.svg"
import TimelinesSection from '../Components/Core/HomePage/TimelinesSection';
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection';
import InstructionSection from '../Components/Core/HomePage/InstructionSection';
import ReviewSlider from '../Components/Core/HomePage/ReviewSlider';
import ExploreMore from '../Components/Core/HomePage/ExploreMore';

const Home = () => {
  return (
    <div>

        {/* Section 1  */}
     <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>

        {/* Become a Instuctor button  */}
        <Link to={"/SignUp"}>
            <div className='group max-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                <div className='flex flex-row items-center justify-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become a Instuctor</p>
                <FaArrowRight/>
                </div>
            </div>
        </Link>

        {/* Heading */}
        <div className='text-center font-semibold text-4xl'>
            Empower Your Future With
            <HighlightText text={"Coding Skills"}/>
        </div>

        {/* Sub Heading  */}
        <div className='w-[90%] mt-3 text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/*CTA Buttons  */}
        <div className='flex mt-8 gap-7'>
            <CTAButton active={true} linkto={"/SignUp"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div> 

        {/* video  */}
        <div className='relative'>
          {/* <div className='absolute mx-3 my-7 w-full h-[100vh] bg-white text-black'>aditya ydada</div> */}
          <div className='relative mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
              <video
              className='shadow-[20px_20px] shadow-white'
              muted
              autoPlay
              loop
              >
              <source src={Banner} />
              </video>
          </div>

        </div>

        {/* code section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock your
                <HighlightText text={"Coding Potential"} />
                 With our Online Courses.
              </div>
            }
            subheading={ 
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
               }
            ctabtn1={{
              btnText:"Try it Yourself",
              link:"/SignUp",
              active:true
            }}

            ctabtn2={{
              btnText:"Learn More",
              link:"/login",
              active:false
            }}

            codecolor={"text-yellow-25"}
            CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="CodeBlock1 absolute"></div>}
            />
        
        </div>


        {/* code section 2  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                Start
                <HighlightText text={"Coding in Seconds"} />.
                
              </div>
            }
            subheading={ 
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
               }
            ctabtn1={{
              btnText:"Continue Lesson",
              link:"/SignUp",
              active:true
            }}

            ctabtn2={{
              btnText:"Learn More",
              link:"/login",
              active:false
            }}

            codecolor={"text-yellow-25"}
            CodeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="CodeBlock2 absolute"></div>}
            />

            
        
        </div>
        {/* explore more section  */}
              <ExploreMore/>
      </div>


      {/* Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
           <div className='homepage_bg h-[320px]'>
               
               <div className='flex flex-col w-11/12 max-w-maxContent mx-auto justify-center items-center gap-8'>
                  <div className='lg:h-[150px]'></div>
                  <div className='flex gap-7 text-white lg:mt-8'>
                    <CTAButton active={true} linkto={"/SignUp"}>
                        <div className='flex items-center gap-2'>
                          Explore Full Catalog
                         <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"login"}>
                        Learn More
                    </CTAButton>
                  </div>
               </div>
           </div>
           {/* job that is in demena -section 1 */}
           <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8'>

                  <div className='flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0 mb-10 mt-[-100px]'>
                      <div className='text-4xl font-semibold lg:w-[45%]'>
                          Get the Skills You need for a 
                          <HighlightText text={"job that is in demand"}/>
                      </div>

                      <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                         <div className='text-[16px] '>
                          The modern StudyNotion is the dictates its own terms. Today, to
                          be a competitive specialist requires more than professional
                          skills.
                         </div>
                         <CTAButton active={true} linkto={"/SignUp"}>
                             Learn More
                         </CTAButton>
                      </div>
                  </div>

                  
                  
                  {/* timeline section  */}
                  <TimelinesSection/>

                  {/* learning language section  */}
                  <LearningLanguageSection/>
                 

           </div>
      </div>
      


      {/* Section 3  */}
      <div className='w-11/12 mx-auto my-20 max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
          {/* Become a instructor section  */}
          <InstructionSection/>

          {/* Reviews from other learner  */}
          <h1 className='text-center text-4xl font-semibold mt-8'>
            Reviews from other learners
          </h1>
          <ReviewSlider/>
      </div>


      {/* Section 4  */}
      <Footer/>
    </div>
  )
}

export default Home
