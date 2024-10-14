import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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

export const getCastMovie = createAsyncThunk("getCastMovie",(detailsMovieId,thunkAPI)=>{
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
          
          const res = axios
            .request(options)
            .then(function (response) {
              return response.data;
            })

            return res;
    }catch(error){

    }
})

const initialState = {
    detailsMovie : [],
    waitMovie:true,
    castMovie:[],
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

        })
    },
})

export const myDetailsMovie = DetailsMovie.reducer;
