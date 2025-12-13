import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementField = ({
    name , 
    label,
    register,
    setValue,
    errors,
    getValues,

}) => {

    const {EditCourse , Course} = useSelector( (state) => state.Course)
    const [Requirement , setRequirement] = useState("")
    const [RequirementList , setRequirementList] = useState([])

    useEffect( () => {
        if(EditCourse){
            setRequirementList(Course?.Instructions)
        }
        register( name , {required : true , validate : (value) => value.length > 0})
    } , [])

    useEffect( () => {
        setValue(name , RequirementList)
    } , [RequirementList])

    const HandleAddRequirement = () => {
        if(Requirement){
            setRequirementList([...RequirementList , Requirement])
            setRequirement("")
        }
    }

    const HandleRemoveRequirement = (index) => {
        const UpdatedRequirements = [...RequirementList]
        UpdatedRequirements.splice(index , 1 )
        setRequirementList(UpdatedRequirements)
    }

    console.log("Requirement" , RequirementList)
  return (
    <div>
        <label htmlFor={name} className='text-sm text-richblack-5'>
            {label}<sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex flex-col items-start space-y-2'>
            <input 
            type='text'
            id={name}
            value={Requirement}
            onChange={ (e) => setRequirement(e.target.value)}
            className='form-style w-full'
            />
            <button 
            type='button'
            onClick={HandleAddRequirement}
            className='font-semibold text-yellow-50'
            >
                Add
            </button>
        </div>

        {
            RequirementList.length > 0 && (
                <ul>
                    {
                        RequirementList.map( (element , index ) => (
                         <li key={index} className='mt-2 list-inside list-disc'>
                            <span className='text-richblack-100'>{element}</span>
                            <button className='ml-2 text-xs text-pure-greys-300'
                            type='button'
                            onClick={ ()=> HandleRemoveRequirement(index)}
                            >
                                Clear
                            </button>
                         </li>
                        ))
                    }
                </ul>
            )
        }

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

export default RequirementField
