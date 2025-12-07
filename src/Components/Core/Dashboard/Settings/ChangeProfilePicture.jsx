import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../../slices/authSlice'
import IconBtn from '../../../Common/IconBtn'
import { UpdateDisplayPicture } from '../../../../Services/Operations/SettingsAPI'
import {FiUpload} from "react-icons/fi"
const ChangeProfilePicture = () => {

    const {User} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) => state.auth)
    const dispatch = useDispatch()

    const[loading , setloading] = useState(false)
    const[ImageFile , setImageFile] = useState(null)
    const[PreviewSource , setPreviewSource] = useState(null)

    const FileInputRef = useRef(null)

    const HandleClick = () => {
        FileInputRef.current.click();
    }

    function HandleFileChange(e){
        const File = e.target.files[0]
        console.log(File)
        if(File){
            setImageFile(File)
            PreviewFile(File)
        }
    }

    const PreviewFile = (File) => {
        const Reader = new FileReader()
        Reader.readAsDataURL(File)
        Reader.onloadend = () => {
            setPreviewSource(Reader.result)
        }
    }

    const HandleFileUpload = () =>{
        try{
            console.log("Uploading......")
            setLoading(true)
            const formData = new FormData()
            formData.append("DisplayPicture" , ImageFile)
            console.log("FormData" , formData)
            dispatch(UpdateDisplayPicture(token , formData)).then( () => {
                setLoading(false)
            })

        }catch(error){
            console.log("ERROR MESSAGE " , error.message)
        }
    }

    useEffect( () =>{
        if(ImageFile){
            PreviewFile(ImageFile)
        }
    } , [ImageFile])

    
  return (
    <>
       <div className='flex text-richblack-5 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 '>
            <div className='flex items-center gap-x-4'>
                <img
                  src={PreviewSource || User?.Image}
                  alt={`Profile-${User?.FirstName}`}
                  className='aspect-square rounded-full w-[78px] object-cover'
                />

                <div className='space-y-2'>
                    <p className='text-xl '>Change Profile Picture</p>
                    <div className='flex flex-row gap-3'>
                        <input 
                          type='File'
                          ref={FileInputRef}
                          onChange={HandleFileChange}
                          className='hidden'
                        />
                        <button
                         onClick={HandleClick}
                         disabled={loading}
                         className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                        >
                            select
                        </button>

                        <IconBtn  
                           text={loading ? "Uploading....." : "Upload"}
                           onClick={HandleFileUpload}
                           >
                            {
                                !loading && (
                                    <FiUpload className='text-lg text-richblack-900'/>
                                )
                            }
                        </IconBtn>
                    </div>
                </div>

         


            </div>

       </div>
    </>
  )
}

export default ChangeProfilePicture
