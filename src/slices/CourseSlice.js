import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    Step : 1 ,
    Course : null ,
    EditCourse : false,
    PaymentLoading : false
}

const CourseSlice = createSlice({
    name : "Course",
    initialState ,
    reducers : {
        setStep : (state , action) => {
            state.Step = action.payload 
        },
        setCourse : (state , action) =>{
            state.Course = action.payload
        },
        setEditCourse : (state , action) =>{
            state.EditCourse = action.payload
        },
        setPaymentLoading : (state , action) => {
            state.PaymentLoading = action.payload
        },
        ResetCourseState : (state) =>{
            state.Step = 1 
            state.Course  = null
            state.EditCourse = false
        },
    },
})

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    ResetCourseState,
} = CourseSlice.actions


export default CourseSlice.reducer
