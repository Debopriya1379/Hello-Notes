import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subject : '',
};

export const subjectSlice = createSlice({
    name : "CurrSubject",
    initialState : initialState,
    reducers : {
        setCurrSubject : (state,action)=>{
            state.subject = action.payload;
        },
        removeCurrSubject : (state)=>{
            state.subject = '';
        },
    }
});

export const {setCurrSubject,removeCurrSubject} = subjectSlice.actions;
export default subjectSlice.reducer;