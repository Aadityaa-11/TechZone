import React from 'react'
import { useState } from 'react'
import Template from "../Components/Core/Auth/Template"
import loginImg from '../assets/Images/login.webp'

const Login = ({setisLoggedIn}) => {
  return (
    <Template
    title='Welcome Back'
    desc1 = "Build skills for today , tomorrow , and beyond."
    desc2 = "Education to future-proof your carrer."
    Image = {loginImg}
    formtype = "login"
    setisLoggedIn = {setisLoggedIn}
    />
  )
}

export default Login
