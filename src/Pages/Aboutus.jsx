import React from 'react'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../Components/Core/AboutPage/Quote'


const Aboutus = () => {
  return (
    <div >

        {/* section 1  */}
        <section className='bg-richblack-700'>
            <div className='relative mx-auto flex flex-col w-11/12  justify-between max-w-maxContent text-center gap-10 text-white  '>
                <header className='mx-auto  mt-20 text-4xl font-semibold lg:w-[70%]'>
                    Driving Innovation in Online Education for a <br/><HighlightText text={"Bright Future"}/>
                <p className='mx-auto  text-center text-base  font-medium text-richblack-300 lg:w-[95%]'>Studynotion is at the forefront of driving innovation in online
                    education. We're passionate about creating a <br />brighter future by
                    offering cutting-edge courses, leveraging emerging technologies,
                    and nurturing a <br /> vibrant learning community.
                </p>
                </header>

            <div className='sm:h-[70%] lg:h-[150px] mt-10'></div>
                <div className='absolute bottom-0 left-[50%] flex w-[100%] translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5'>
                    <img src={BannerImage1} alt="" />
                    <img src={BannerImage2} alt="" />
                    <img src={BannerImage3} alt="" />
                </div>
            </div>    
        </section>

        {/* quote section  section 2 */}
        <section className='border-b border-richblack-700'>
            <div className='mx-auto text-4xl flex flex-col w-11/12 max-w-maxContent justify-between text-richblack-500'>
                <div className='h-[100px]'></div>
                <Quote/>
            </div>
            
        </section>

        {/* section 3 */}
        <section>
            <div>
                <div className='flex'>
                    <div className='flex flex-col '>
                        <h1>Our Founding Story</h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            Our e-learning platform was born out of a shared vision and
                            passion for transforming education. It all began with a group of
                            educators, technologists, and lifelong learners who recognized
                            the need for accessible, flexible, and high-quality learning
                            opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            As experienced educators ourselves, we witnessed firsthand the
                            limitations and challenges of traditional education systems. We
                            believed that education should not be confined to the walls of a
                            classroom or restricted by geographical boundaries. We
                            envisioned a platform that could bridge these gaps and empower
                            individuals from all walks of life to unlock their full
                            potential.
                        </p>

                    </div>

                    <div>
                        <img src={FoundingStory} />

                    </div>
                </div>

                   <div>
                       <h1>
                        Our Vision
                       </h1>
                       <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            With this vision in mind, we set out on a journey to create an
                            e-learning platform that would revolutionize the way people
                            learn. Our team of dedicated experts worked tirelessly to
                            develop a robust and intuitive platform that combines
                            cutting-edge technology with engaging content, fostering a
                            dynamic and interactive learning experience.
                        </p>



                   </div>

                   <div>
                        <h1>
                            Our Mission
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>

                   </div>
                   
                <div>

                </div>
            </div>

        </section>

      
    </div>
  )
}

export default Aboutus
