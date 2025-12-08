import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CourseSectionData : [],
    CourseEntireData : [],
    CompletedLecture : [] , 
    TotalNoOfLecture : 0
}

const ViewCourseSlice = createSlice({
    name: "ViewCourse",
    initialState , 
    reducers : {
        setCourseSectionData : (state , action) => {
            state.CourseSectionData = action.payload
        },
        setEntireCourseData : (state , action) =>{
            state.CourseEntireData = action.payload
        },
        setTotalNoOfLecture : (state , action) =>{
            state.TotalNoOfLecture = action.payload
        },
        setCompletedLecture : (state , action) =>{
            state.CompletedLecture = action.payload
        },
        UpdateCompletedLecture : (state , action) =>{
            state.CompletedLecture = [...state.CompletedLecture , action.payload]
        }
    }
})
 
export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLecture,
    setCompletedLecture,
    UpdateCompletedLecture
} = ViewCourseSlice.actions

export default ViewCourseSlice.reducer