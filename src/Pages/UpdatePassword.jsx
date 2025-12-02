import React from 'react'
import { useSelector } from 'react-redux'

const UpdatePassword = () => {
    const{loading} = useSelector( (state) => state.auth)
  return (
    <div>
        {
            loading ? ( <div>Loading....</div>)
            : (
                <div>
                    <h1>Enter New Password</h1>
                    <p>Almost done . Enter Your new Password and you are all set </p>

                    <form action="">

                        <label htmlFor="">
                            <h2>New Password<sup>*</sup></h2>
                            <input
                            />
                        </label>

                        <label>
                            <h2>Confirm Password<sup>*</sup></h2>
                        </label>
                    </form>
                </div>
            )
        }

      
    </div>
  )
}

export default UpdatePassword
