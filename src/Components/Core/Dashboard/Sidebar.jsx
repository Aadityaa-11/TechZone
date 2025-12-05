import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import Sidebarlinks from './Sidebarlinks'
import { VscSignOut } from 'react-icons/vsc'
import { Logout } from '../../../Services/Operations/authAPI'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../Common/ConfirmationModal'

const Sidebar = () => {
    const {User , loading : profileloading} = useSelector( (state) => state.profile)
    const {loading : authloading} = useSelector( (state) => state.profile)

    // to keep tractk of confirmation modal 
    const[confirmationModal , setconfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(profileloading || authloading){
        return(
            <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <>
       <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
           <div className='flex flex-col '>
            {
                sidebarLinks.map( (link) => {
                    if(link.type && User?.AccountType !== link.type) return null
                    return(
                        <Sidebarlinks key={link.id} link={link} iconName={link.icon} />
                    )
                })
            }
           </div>

           <div className=' mt-6 h-[1px] w-10/12 bg-richblack-700'>
               <div className='flex flex-col'>
                    <Sidebarlinks
                    link={ {name: "Settings" , path: "/dashboard/settings"}}
                    iconName="VscSettingsGear"
                     />

                     <button 
                     onClick={()=>
                        setconfirmationModal({
                            text1 : "Are you Sure?",
                            text2 : "You will be logged out of your account",
                            btn1Text : "Logout",
                            btn2Text : "Cancel",
                            btn1Handler : () => dispatch(Logout(navigate)),
                            btn2Handler : () => setconfirmationModal(null)
                        })
                     }
                     className='px-8 py-2 text-sm font-medium text-richblack-300 '
                     >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>
                     </button>
               </div>
           </div>
       </div>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default Sidebar
