import { createSlice } from '@reduxjs/toolkit';

const questionSlice=createSlice({
  name:"question",
  initialState:[],
  reducers:{
    add(state,action){
      state.push(action.payload)
    }
  }
})       


export const {add}=questionSlice.actions;
export default questionSlice.reducer;


