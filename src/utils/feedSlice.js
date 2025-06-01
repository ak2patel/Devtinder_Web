import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const feedSlice =  createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed : (state,action) => action.payload,
        removeFeed:(state,action) => null,
    },
})
export const {addFeed} = feedSlice.actions;
export default feedSlice.reducer;