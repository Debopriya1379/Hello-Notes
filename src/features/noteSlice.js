import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    note : '',
};

export const noteSlice = createSlice({
    name : "CurrNote",
    initialState : initialState,
    reducers : {
        setCurrNote : (state,action)=>{
            state.note = action.payload;
        },
        removeCurrNote : (state)=>{
            state.topic = '';
        },
    }
});

export const {setCurrNote,removeCurrNote} = noteSlice.actions;
export default noteSlice.reducer;