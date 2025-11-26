import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    TotalItem : localStorage.getItem("TotalItem") ? JSON.parse(localStorage.getItem("TotalItem")) : null
}

const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducer : {
        setTotalItem(state , value){
            state.TotalItem = value.payload
        }

    }
})

export const {setTotalItem} = cartSlice.actions
export default cartSlice.reducer