import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/ProfileSlice"
import cartReducer from "../slices/cartSlice"
import CourseReducer from "../slices/CourseSlice"
const rootReducer = combineReducers({
    
    auth : authReducer,
    cart : cartReducer,
    profile : profileReducer,
    Course : CourseReducer
    
})

export default rootReducer