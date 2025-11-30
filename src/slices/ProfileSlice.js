import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    User : localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null 
}

const profileSlice = createSlice({
    name: "profile" , 
    initialState : initialState,
    reducers:{
        setUser(state , value){
            state.User = value.payload
        }

    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer