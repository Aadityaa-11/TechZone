import React from 'react'
import { useState } from 'react'
import Template from '../Components/Core/Auth/Template'
import SignupImg from '../assets/Images/signup.webp'

const Signup = ({setisLoggedIn}) => {
  return (
    <Template
    title='Join the millions learning to code with StudyNotion for free'
    desc1 = "Build skills for today , tomorrow , and beyond."
    desc2 = "Education to future-proof your carrer."
    Image = {SignupImg}
    formtype = "Signup"
    setisLoggedIn = {setisLoggedIn}
    />
  )
}

export default Signup
