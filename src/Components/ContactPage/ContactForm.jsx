import React from 'react'
import ContactusForm from './ContactusForm'

const ContactForm = () => {
  return (
    <div className='border border-richblack-600 text-richblack-300 rounded-xl lg:p-14 flex flex-col gap-3'>
        <h1 className='text-4xl  leading-10 font-semibold text-richblack-5'>
             Got a Idea? We&apos;ve got the skills. Let&apos;s team up
        </h1>
        <p>Tell us more about yourself and what you&apos;re got in mind.</p>
        <div className='mt-7'>
            <ContactusForm/>
        </div> 
    </div>
  )
}

export default ContactForm
