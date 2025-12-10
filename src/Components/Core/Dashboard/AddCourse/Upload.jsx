import React, { useRef, useState } from 'react'
import {useDropzone} from "react-dropzone"
import {FiUploadCloud} from "react-icons/fi"
import { useSelector } from 'react-redux'
import {Player} from "video-react"


const Upload = ({
    label , 
    name ,
    register , 
    setValue , 
    errors , 
    video = false,
    ViewData = null ,
    EditData = null

    }) => {

    const {Course} = useSelector( (state) => state.Course)
    const[ SelectedFile , setSelectedFile ] = useState(null)
    cosnt [PreviewSource , setPreviewSource] = useState(
        ViewData ? ViewData : EditData ? EditData : ""
    )

    const inputRef = useRef(null)
  return (
    <div className='flex flex-col space-y-2'>
        <label htmlFor={name} className='text-sm text-richblack-5'>{label}</label>

        <div>
            {
                PreviewSource ? (
                    <div>
                        {
                            !video ? (
                                <img 
                                  src={PreviewSource}
                                  alt='preview'
                                  className='h-full w-full rounded-md object-cover'
                                />
                            ) : (
                                <Player aspectRatio='16:9' playsInline src={PreviewSource} />
                            )
                        }

                        {
                            !ViewData && (
                                <button
                                  type='button'
                                  onClick={ () => {
                                    setPreviewSource("")
                                    setSelectedFile(null)
                                    setValue(name , null)
                                  }}
                                  className='mt-3 text-richblack-400 underline'
                                >
                                    Cancel
                                </button>
                            ) 
                        }
                    </div>
                ) : (
                    <div   className='flex w-full flex-col items-center p-6'
                    {...getRootProps()}
                    >

                        <input {...getInputProps()} ref={inputRef}/>
                        <div>
                            <FiUploadCloud className='text-2xl text-yellow-50' />
                        </div>
                        <p>
                            Drag and drop an {!video ? "image" : "video"} , or click to {" "}
                            <span>Browse</span> a file
                        </p>
                        <ul>
                            <li>Aspect ratio 16 : 9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>

                    </div>

                )
            }
        </div>
        {
            errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>{label}</span>
            )
        }
    </div>
  )
}

export default Upload
