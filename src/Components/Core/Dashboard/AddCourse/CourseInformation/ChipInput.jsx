import React, { useEffect, useState } from 'react'
import {MdClose} from "react-icons/md"
import { useSelector } from 'react-redux'

const ChipInput = ({label , name , placeholder , register , errors , setValue , getValues}) => {
   
    const {EditCourse , Course} = useSelector( (state) => state.Course)

    // setting up state for managing chips array
    const[chips , setChips] = useState([])

    useEffect( () => {
        if(EditCourse){
            setChips(Course?.Tag)
        }
        register( name , 
            {
                required : true,
                validate : (value) => value.length > 0,
            }
        )
    } , [])


    useEffect( () => {
        setValue(name , chips)
    } , [chips])

    // function to handle user inpur when chip are added 
    const HandleKeyDown = (event) => {
        // check if user presses "Enter" or ","
        if(event.key === "Enter" || event.key === ","){
            // Prevent the default behavior of the event 
            event.preventDefault()
            // get the inpur value and remove any leading /trailing spaces 
            const ChipValue = event.target.value.trim()
            // check if the input value exits and is not already in the chips array
            if( ChipValue && !chips.includes(ChipValue)){
                // add the chip to the array and clear the input
                const newChips = [...chips , ChipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    // Function to handle deletion of a chip 
    const HandleDeleteChip = (chipIndex) => {
        // filter the chips array to remove the chip with the given index
        const newchips = chips.filter( ( _ , index) => index !== chipIndex)
        setChips(newchips)
    }


    return (
    <div className='flex flex-col space-y-2'>

        {/* Render the label for the input  */}
        <label htmlFor={name} className='text-sm text-richblack-5'>
         {name}
        </label>

        {/* Render the chips and input  */}
        <div className='flex w-full flex-wrap gap-y-2'>
            {/* Map over the chips array and render each chip  */}

            {
                chips.map( (chip , index) => (
                    <div key={index} 
                    className='m-1 flex items-center rounded-full bg-yellow-400 p-2 py-1 tex-sm text-richblack-5'
                    >
                        {/* Render the chip value  */}
                        {chip}
                        <button 
                           type='button'
                           className='ml-2 focus:outline-none'
                           onClick={ () => HandleDeleteChip(index)}
                        >
                           <MdClose className='text-sm' />
                        </button>
                    </div>
                ))
            }

            <input 
              id={name}
              name = {name}
              type='text'
              placeholder= {placeholder}
              onKeyDown={HandleKeyDown}
              className='form-style w-full'
            />
        </div>

        {/* Render an error message if the inpur is required and not filled  */}
        {
            errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    {label} is required
                </span>
            )
        }
     
    </div>
  )
}

export default ChipInput
