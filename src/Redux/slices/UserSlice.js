import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:'UserSlice',
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUserData:(state,action)=>{
            state.user = null
        }
    }
})

export const{setUser,clearUserData} =UserSlice.actions;
export default UserSlice.reducer