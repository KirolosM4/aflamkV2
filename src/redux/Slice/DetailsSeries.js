import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// get Details Series 
export const getDetailsSeries = createAsyncThunk("getDetailsSeries",(detailsSeriesId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${detailsSeriesId}`,
            params: {language: 'en-US'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODkzNTkyMC45NjE0MzIsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ov40vWkt_NE9RGkaltvODDOid-IK9mMbHs_IeTOHQTE'
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
// get Cast Series 
export const getCastSeries = createAsyncThunk("getCastSeries",async(detailsSeriesId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${detailsSeriesId}/credits`,
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
    }catch(error){

    }
})
// get Video Series 

export const getVideoSeries = createAsyncThunk("getVideoSeries",async(detailsSeriesId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${detailsSeriesId}/videos`,
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
    detailsSeries : [],
    waitSeries:true,
    castSeries:[],
    videoSeries:[],
    newBackgroundVideo:false,
    showVideo:false,
}

const DetailsSeries = createSlice({
    name:"DetailsSeries",
    initialState,
    extraReducers:(builder)=>{
        // get details Series 
        builder.addCase(getDetailsSeries.pending,(state)=>{
            state.waitSeries = true;
        }),
        builder.addCase(getDetailsSeries.fulfilled,(state,{payload})=>{
            state.detailsSeries = payload;
            state.waitSeries = true
        }),
        builder.addCase(getDetailsSeries.rejected,(state)=>{
            console.log("rej")
        });
        // get cast Series 
        builder.addCase(getCastSeries.pending,(state,action)=>{
            state.waitSeries = true;
        });
        builder.addCase(getCastSeries.fulfilled,(state,{payload})=>{
            state.castSeries = payload;
            state.waitSeries = false;
        });
        builder.addCase(getCastSeries.rejected,(state,action)=>{

        });
        // get Video Series 
        builder.addCase(getVideoSeries.pending,(state,action)=>{
            state.waitSeries = true;
        });
        builder.addCase(getVideoSeries.fulfilled,(state,{payload})=>{
            state.videoSeries = payload;
            state.waitSeries = false;
            state.showVideo = true;
            state.newBackgroundVideo = true;
        });
        builder.addCase(getVideoSeries.rejected,(state,action)=>{

        })
    },
    reducers:{
        dontShowVideo : (state) => {
            state.waitSeries = false;
            state.newBackgroundVideo = false;
            state.showVideo = false;
        }
    }
})

export const myDetailsSeries = DetailsSeries.reducer;
export const {dontShowVideo} = DetailsSeries.actions;
