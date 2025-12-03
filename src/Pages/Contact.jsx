import React from 'react'
import ContactusForm from '../Components/ContactPage/ContactusForm'
import ContactDetails from '../Components/ContactPage/ContactDetails'
import Footer from '../Components/Common/Footer'
import ContactForm from '../Components/ContactPage/ContactForm'

const Contact = () => {
  return (
    <div>
        <div className='w-11/12 mx-auto flex  mt-20 max-w-maxContent flex-col lg:flex-row justify-between gap-10 text-richblack-200'>
            <div className='lg:w-[40%]'>
                <ContactDetails/>
            </div>

            <div className='lg:w-[60%]'>
                <ContactForm/>
            </div>
        </div>

        <Footer/>
      
    </div>
  )
}

export default Contact
