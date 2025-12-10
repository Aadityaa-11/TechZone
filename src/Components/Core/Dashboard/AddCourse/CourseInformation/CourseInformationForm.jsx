import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FetchCourseCategories } from "../../../../../Services/Operations/CourseDetailsAPI"
import ChipInput from "./ChipInput"
import Upload from "../Upload"

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
    const {Token} = useSelector( (state) => state.auth)
    const {Course , EditCourse} = useSelector( (state) => state.Course)
    const [loading , setloading] = useState(false)
    const [CourseCategory , setCourseCategory] = useState([])


    // useEffect( () => {
    //     const GetCategories = async() => {
    //         setloading(true)
    //         const Categories = await FetchCourseCategories()
    //         if(Categories.length > 0 ){
    //             setCourseCategory(Categories)
    //         }
    //         setloading(false)
    //     }

    //     // IF FORM IS IN EDIT MODE 
    //     if(EditCourse){
    //         setValue("CourseTitle" , Course.CourseName)
    //         setValue("CourseShortDesc" , Course.CourseDescription)
            
    //     }
    // })

    return(
        <form
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
                    <option>
                        Choose a Category
                    </option>
                    {
                        !loading && 
                        CourseCategory?.map
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
               EditData = {EditCourse ? Course?.Thumbnail : null}
             />


             {/* Benefits of the Course  */}
             <div>
                <label>
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





        </form>
    )
}