import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topic : '',
};

export const topicSlice = createSlice({
    name : "CurrTopic",
    initialState : initialState,
    reducers : {
        setCurrTopic : (state,action)=>{
            state.topic = action.payload;
        },
        removeCurrTopic : (state)=>{
            state.topic = '';
        },
    }
});

export const {setCurrTopic,removeCurrTopic} = topicSlice.actions;
export default topicSlice.reducer;