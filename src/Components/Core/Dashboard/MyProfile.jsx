import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {

    const{User} = useSelector( (state) => state.profile)
    const navigate = useNavigate()
  return (
    <>
       <h1>My Profile</h1>

       <div>
            <div>
                <img/>

                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
       </div>
    </>
  )
}

export default MyProfile
