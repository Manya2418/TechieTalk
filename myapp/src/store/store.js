import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import questionReducer from './QuestionSlice'

const store=configureStore({
    reducer:{
        user:userReducer,
        question:questionReducer
    }
}) 

export default store

