import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ChangeProfilePicture = () => {

    const {User} = useSelector( (state) => state.profile)

    const[loading , setloading] = useState(false)
    const[ImageFile , setImageFile] = useState(null)
    const[PreviewSource , setPreviewSource] = useState(null)

    // const HandleClick = () =>
  return (
    <>
       <div>
            <div>
                <img
                  src={PreviewSource || User?.Image}
                  alt={`Profile-${User?.FirstName}`}
                  className='aspect-square rounded-full w-[78px] object-cover'
                />

                <div>
                    <p>Change Profile Picture</p>
                    <div>
                        <input
                          type='File'
                        />
                    </div>
                </div>


            </div>

       </div>
    </>
  )
}

export default ChangeProfilePicture
