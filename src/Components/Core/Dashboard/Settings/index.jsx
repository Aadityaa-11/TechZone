import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const index = () => {
  return (
    <>
       <h1>
        Edit Profile
       </h1>

       {/* change profile picture  */}
       <ChangeProfilePicture/>

       {/* Profile  */}
       <EditProfile/>

       {/* update Password  */}
       <UpdatePassword/>

       {/* Delete Account  */}
       <DeleteAccount/>
    </>
  )
}

export default index
