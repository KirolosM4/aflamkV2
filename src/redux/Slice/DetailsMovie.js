import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// get Details Movie 
export const getDetailsMovie = createAsyncThunk("getDetailsMovie",(detailsMovieId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${detailsMovieId}`,
            params: {language: 'en-US'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODczNjE4NS42OTEzMzQsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pxqwpI1sZnFoc6C0dJIz-QPVS9m5JhtaAZFevaiMa_o'
            }
          };
          
          const res = axios
            .request(options)
            .then(function (response) {
              return response.data;
            })
            return res;

    } catch(error) {

    }
})
// get Cast Movie 
export const getCastMovie = createAsyncThunk("getCastMovie",async(detailsMovieId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${detailsMovieId}/credits`,
            params: {language: 'en-US'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODczNjE4NS42OTEzMzQsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pxqwpI1sZnFoc6C0dJIz-QPVS9m5JhtaAZFevaiMa_o'
            }
          };
          
          const res = await axios
            .request(options)
            .then(function (response) {
              return response.data;
            })

            return res;
    }catch(error){

    }
})
// get Video Movie 

export const getVideoMovie = createAsyncThunk("getVideoMovie",async(detailsMovieId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${detailsMovieId}/videos`,
            params: {language: 'en-US'},
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODkzNTkyMC45NjE0MzIsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ov40vWkt_NE9RGkaltvODDOid-IK9mMbHs_IeTOHQTE'
            }
        };
        
        const res = await axios
            .request(options)
            .then(function (response) {
            return response.data;
            })

            return res;

            } catch(error){
                return rejectWithValue(error)
            }
})

const initialState = {
    detailsMovie : [],
    waitMovie:true,
    castMovie:[],
    videoMovie:[],
    newBackgroundVideo:false,
    showVideo:false,
}

const DetailsMovie = createSlice({
    name:"DetailsMovie",
    initialState,
    extraReducers:(builder)=>{
        // get details movie 
        builder.addCase(getDetailsMovie.pending,(state)=>{
            state.waitMovie = true;
        }),
        builder.addCase(getDetailsMovie.fulfilled,(state,{payload})=>{
            state.detailsMovie = payload;
            state.waitMovie = true
        }),
        builder.addCase(getDetailsMovie.rejected,(state)=>{
            console.log("rej")
        });
        // get cast movie 
        builder.addCase(getCastMovie.pending,(state,action)=>{
            state.waitMovie = true;
        });
        builder.addCase(getCastMovie.fulfilled,(state,{payload})=>{
            state.castMovie = payload;
            state.waitMovie = false;
        });
        builder.addCase(getCastMovie.rejected,(state,action)=>{

        });
        // get Video Movie 
        builder.addCase(getVideoMovie.pending,(state,action)=>{
            state.waitMovie = true;
            console.log("pen")
        });
        builder.addCase(getVideoMovie.fulfilled,(state,{payload})=>{
            state.videoMovie = payload;
            state.waitMovie = false;
            state.showVideo = true;
            state.newBackgroundVideo = true;
            console.log("full")
        });
        builder.addCase(getVideoMovie.rejected,(state,action)=>{

        })
    },
    reducers:{
        dontShowVideo : (state) => {
            state.waitMovie = false;
            state.newBackgroundVideo = false;
            state.showVideo = false;
        }
    }
})

export const myDetailsMovie = DetailsMovie.reducer;
export const {dontShowVideo} = DetailsMovie.actions;
