import { configureStore } from '@reduxjs/toolkit';
import { studReducer } from './students/studentsSlice';
let store=configureStore({
    reducer:{
        student:studReducer
    }
})

export default store;