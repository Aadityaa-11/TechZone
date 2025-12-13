import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AddCourse, EditCourseDetails, FetchCourseCategories } from "../../../../../Services/Operations/CourseDetailsAPI"
import ChipInput from "./ChipInput"
import { setCourse , setStep } from "../../../../../slices/CourseSlice"
import Upload from "../Upload"
import toast from "react-hot-toast"
import RequirementField from "./RequirementField"
import { MdNavigateNext, MdNavigation } from "react-icons/md"
import IconBtn from "../../../../Common/IconBtn"
import { COURSE_STATUS } from "../../../../../Utils/Constants"

export default function CourseInformation(){

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors},
    } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useSelector( (state) => state.auth)
    console.log("TOken ;;;" , token)
    const {Course , EditCourse} = useSelector( (state) => state.Course)
    const [loading , setloading] = useState(false)
    const [CourseCategory , setCourseCategory] = useState([])


    useEffect( () => {
        const GetCategories = async() => {
            setloading(true)
            const Categories = await FetchCourseCategories()
            // console.log("Categories" , Categories)
            if(Categories.length > 0 ){
                setCourseCategory(Categories)
            }
            setloading(false)
        }

        // IF FORM IS IN EDIT MODE 
        if(EditCourse){
            setValue("CourseTitle" , Course.CourseName)
            setValue("CourseShortDesc" , Course.CourseDescription)
            setValue("CoursePrice" , Course.Price)
            setValue("CourseTags" , Course.Tags)
            setValue("CourseBenefits" , Course.WhatYouWillLearn)
            setValue("CourseCategory" , Course.Category)
            setValue("CourseRequirements" , Course.Instructions)
            setValue("CourseImage" , Course.ThumbNail)
            
        }
        GetCategories()
    } , [])

    const isFormUpdated = () => {
        const CurrentValues = getValues()
        console.log("Changes after editing form Values : " , CurrentValues)
        if(
            CurrentValues.CourseTitle !== Course.CourseName ||
            CurrentValues.CourseShortDesc !== Course.CourseDescription ||
            CurrentValues.CoursePrice !== Course.CoursePrice ||
            CurrentValues.CourseTags.toString() !== Course.Tags.toString() ||
            CurrentValues.CourseBenefits !== Course.WhatYouWillLearn ||
            CurrentValues.CourseCategory._id  !== Course.Category._id ||
            CurrentValues.CourseRequirements.toString() !== Course.Instructions.toString() ||
            CurrentValues.CourseImage !== Course.ThumbNail
            ){
                return true
            }
            return false
    }

// console.log("FOrmData : " , data)
    const onSubmit = async(data) => {
        console.log("TOken in courseinfo  1 " , token)
      console.log("FOrmData : " , data)
      
        if(EditCourse){

            if(isFormUpdated()){
            const CurrentValue = getValues()
            const formData = new FormData()

            formData.append( "CourseId" , Course._id)
            if(CurrentValue.CourseTitle !== Course.CourseName){
                formData.append("CourseName" , data.CourseTitle)
                }
            if(CurrentValue.CourseShortDesc !== Course.CourseDescription){
                formData.append("CourseDescription" , data.CourseShortDesc)
                }
            if(CurrentValue.CoursePrice !== Course.Price){
                formData.append("Price" , data.CoursePrice)
                }
            if(CurrentValue.CourseTags.tostring() !== Course.Tags.tostring()){
                formData.append("Tags" , JSON.stringify(data.CourseTags))
                }
            if(CurrentValue.CourseBenefits !== Course.WhatYouWillLearn){
                formData.append("WhatYouWillLearn" , data.CourseBenefits)
            }
            if(CurrentValue.CourseCategory._id !== Course.Category._id){
                formData.append("Category" , data.CourseCategory)
                }
            if(CurrentValue.CourseRequirements.toString() !== Course.Instructions.toString()){
                formData.append("Instructions" , JSON.stringify(data.CourseRequirements))
                }
            if(CurrentValue.CourseImage !== Course.ThumbNail){
                formData.append("ThumbNail" , data.CourseImage)
                }
            setloading(true)
            const Result = await EditCourseDetails(formData , token)
            setloading(false)
            if(Result){
                dispatch(setStep(2))
                dispatch(setCourse(Result))
                }
            else{
                toast.error("N0 Change Made to the form")
                }
            
            }
        }
        

        const formData = new FormData()
        formData.append("CourseName" , data.CourseTitle)
        formData.append("CourseDescription" , data.CourseShortDesc)
        formData.append("Price" , data.CoursePrice)
        formData.append("Tags" , JSON.stringify(data.CourseTags))
        formData.append("WhatYouWillLearn" , data.CourseBenefits)
        formData.append("category" , data.CourseCategory)
        formData.append("Status" , COURSE_STATUS.DRAFT)
        formData.append("Instructions" , JSON.stringify(data.CourseRequirements ))
        formData.append("ThumbNailImage" , data.CourseImage)
        for (let pair of formData.entries()) {
  console.log(pair[0] + ":", pair[1]);
}
        setloading(true)
        const Result = await AddCourse(formData , token)
        if(Result){
            dispatch(setStep(2))
            dispatch(setCourse(Result))
        }
        setloading(false)
    }

    

    return(
        <form  onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 text-black"
        >

             {/* Course Title  */}
             <div>
                <label htmlFor="CourseTitle" className="text-sm text-richblack-5">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>

                <input 
                   type="text"
                   name="CourseTitle"
                   id="CourseTitle"
                   placeholder="Enter Course Title"
                   {...register("CourseTitle" , {required : true})}
                   className="form-style w-full"
                />
                {
                    errors.CourseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Title is required
                        </span>
                    )
                }
                
             </div>

             {/* Course short Description  */}
             <div className="flex flex-col space-y-2">
                <label htmlFor="CourseShortDesc" className="text-sm text-richblack-5">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea 
                   id="CourseShotrtDesc"
                   placeholder="Enter Course Short Description"
                   className="form-style resize-x-none min-h-[130px] w-full"
                  {...register("CourseShortDesc" , {required: true})}
                />
                {
                    errors.CourseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Description is Required
                        </span>
                    )
                }
             </div>

             {/* Course Price  */}
             <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="CoursePrice">
                    Course Price <sup>*</sup>
                </label>
                <div className="relative">
                    <input 
                    id="CoursePrice"
                    placeholder="Enter Course Price"
                    {...register("CoursePrice" , 
                        {
                            required: true,
                            ValueAsNumber : true,
                            pattern : {
                                value : /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                        }
                    )}
                    className="form-style w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="absolute text-richblack-400 left-3 top-1/2 inline-block -translate-y-1/2 text-2xl "/>
                </div>
                {
                    errors.CoursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Price is Required
                        </span>
                    )
                }

             </div>

            {/* Course Category  */}

             <div className="flex flex-col space-y-2">
                <label htmlFor="CourseCategory" className="text-sm text-richblack-5">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                 {...register("CourseCategory" , {required:true})}
                 defaultValue=""
                 id="CourseCategory"
                 className="form-style w-full"
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {
                        !loading && 
                        CourseCategory?.map( (Category , index) => (
                            <option key={index} value={Category?._id} className="text-richblack-5">
                                {Category?.Name}
                            </option>
                        ))
                    }
                </select>

             </div>

            {/*   Course Tag   */}
             <ChipInput 
                label = "Tags"
                name = "CourseTags"
                placeholder = "Enter Tags and press Enter"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
             />

             {/* Course Thumbnail Image  */}
             <Upload 
               name="CourseImage"
               label="Course Thumbnail"
               register = {register}
               setValue = {setValue}
               errors = {errors}
               EditData = {EditCourse ? Course?.ThumbNail : null}
             />


             {/* Benefits of the Course  */}
             <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="CourseBenefits">
                    Benefits of the Course <sup className="text-pink-200">*</sup>
                </label>
                <textarea 
                   id="CourseBenefits"
                   placeholder="Enter benefits of the Course"
                   {...register("CourseBenefits" , {required: true})}
                   className="form-style resize-x-none min-h-[130px] w-full" 
                />
                {
                    errors.CourseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Benefits of the Course is required
                        </span>
                    )
                }
             </div>

             {/* Requirements/Instructions  */}
             <RequirementField 
               name="CourseRequirements"
               label="Requirement/Instructions"
               register = {register}
               setValue={setValue}
               getValues={getValues}
               errors={errors}
             />

             {/* Next Buttons  */}
             <div className="flex justify-end gap-x-2">
                {
                    EditCourse && (
                        <button
                          onClick={ () => dispatch(setStep(2))}
                          disabled = {loading}
                          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-100`}
                        >
                            Continue without Saving
                        </button>
                    )
                }

                <IconBtn 
                disabled={loading}
                text={!EditCourse ? "Next" : "Save Changes"}>
                    <MdNavigateNext/>
                </IconBtn>
             </div>





        </form>
    )
}