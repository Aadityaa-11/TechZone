import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    User : localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null ,
    loading:false,
}

const profileSlice = createSlice({
    name: "profile" , 
    initialState : initialState,
    reducers:{
        setUser(state , value){
            state.User = value.payload
        },
        setLoading(state , value){
            state.loading = value.payload
        }

    }
})

export const {setUser , setLoading} = profileSlice.actions
export default profileSlice.reducer