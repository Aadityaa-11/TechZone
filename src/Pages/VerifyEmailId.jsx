import react, { useState } from 'react'

import React from 'react'
import OTPInput from 'react-otp-input'
import { useSelector } from 'react-redux'

const VerifyEmailId = () => {

    const [otp , Setotp] = useState("")
    const { signupData , loading} = useSelector( (state) => state.auth);

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
            FirstName, 
            LastName , 
            EmailId , 
            Password , 
            ConfirmPassword,
            AccountType,
        } = signupData

        dispatch( sig)
    }
  return (
    <div className='text-white min-h-[calc(100vh-3.5rem)] flex justify-center items-center h-full flex-col'>
        <h1>Verify Email</h1>

        <p>A Verification Code has been Send to you . Enter the code below </p>

        <form>
            <OTPInput 
            // value={otp}
            onChange={Setotp}
            numInputs={4}
            renderSeparator={<span>=</span>}
            renderInput={ (props) => (<input {...props} />)}
            />

            <button/>
        </form>
      
    </div>
  )
}

export default VerifyEmailId
