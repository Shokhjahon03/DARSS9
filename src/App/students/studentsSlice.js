import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from 'axios';
let   initialState={
    loading: false,
        student:[],
        error: null,
        edit:[]
}

export let fetchStudents=createAsyncThunk('stud/fetchStudents',()=>{
    return axios.get('http://localhost:3000/students').then((res) => res.data).catch((err) => err.message);
})
export let daleti=createAsyncThunk('stud/daleti',(id)=>{
    return axios.delete(`http://localhost:3000/students/${id}`).then((res) => res.data).catch((err) => err.message)
})
export let addStud=createAsyncThunk('stud/addStud',(newstudent)=>{
    return axios.post('http://localhost:3000/students',newstudent,{ headers: {
        'Content-Type': 'application/json',
      }}).then((res) => res.data).catch((err) => err.message);
})
export let editt=createAsyncThunk('stud/editt',(val)=>{
  return axios.get(`http://localhost:3000/students/${val}`).then((res) => res.data).catch((err) => err.message)
})
export let save=createAsyncThunk('stud/save',(id,newstud)=>{
  return axios.put(`http://localhost:3000/students/${id}`,newstud).then((res) => res.data).catch((err) => err.message)
})
let studentsSlise=createSlice({
    name:'stud',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchStudents.pending, (state) => {
            state.loading = true;
          });
        builder.addCase(fetchStudents.fulfilled,(state,action)=>{
            state.loading = false;
            state.student=action.payload;
            state.error = null;
        })
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.payload;
          });
          builder.addCase(daleti.pending, (state) => {
            state.loading = true;
          });
        builder.addCase(daleti.fulfilled,(state,action)=>{
            state.loading = false;
            state.student=action.payload;
            state.error = null;
        })
        builder.addCase(daleti.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.payload;
          });
          builder.addCase(addStud.pending, (state) => {
            state.loading = true;
          });
        builder.addCase(addStud.fulfilled,(state,action)=>{
            state.loading = false;
            state.student=action.payload;
            state.error = null;
        })
        builder.addCase(addStud .rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.payload;
          });
          // builder.addCase(search.pending, (state) => {
          //   state.loading = true;
          // });
        builder.addCase(editt.fulfilled,(state,action)=>{
            state.loading = false;
            // state.student=action.payload;
            state.error = null;
            state.edit=action.payload
        })
        // builder.addCase(editt.rejected, (state, action) => {
        //     state.loading = false;
        //     state.users = [];
        //     state.error = action.payload;
        //   });
        builder.addCase(save.pending, (state) => {
          state.loading = true;
        });
      builder.addCase(save.fulfilled,(state,action)=>{
          state.loading = false;
          state.student=action.payload;
          state.error = null;
      })
      builder.addCase(save .rejected, (state, action) => {
          state.loading = false;
          state.users = [];
          state.error = action.payload;
        });
    }
})

export const studReducer = studentsSlise.reducer;