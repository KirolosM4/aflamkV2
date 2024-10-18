import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

// get Search Movies
export const getSearchMovies = createAsyncThunk("getSearchMovies",async(querySearch,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {query: querySearch, include_adult: 'false', language: 'en-US', page: '1'},
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
            return res
    } catch(error) {
        return rejectWithValue(error)
    }
})
// get Search Series 
export const getSearchSeries = createAsyncThunk("getSearchSeries",async(querySearch,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/tv',
            params: {query: querySearch, include_adult: 'false', language: 'en-US', page: '1'},
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
    } catch(error) {
        return rejectWithValue(error)
    }
})





const initialState = {
    searchMovies : [],
    searchSeries : [],
}

const SerachSlice = createSlice({
    name:"SearchSlice",
    initialState,
    extraReducers:(builder) => {
        // get Search Movie 
        builder.addCase(getSearchMovies.pending,(state,aciton)=>{
            console.log("pen")
        });
        builder.addCase(getSearchMovies.fulfilled,(state,{payload:{results}})=>{
            state.searchMovies = results;
            console.log(results)
        });
        builder.addCase(getSearchMovies.rejected,(state,action)=>{
            console.log("rej")
        });
        // get Search Series
        builder.addCase(getSearchSeries.pending,(state,aciton)=>{
            console.log("pen")
        });
        builder.addCase(getSearchSeries.fulfilled,(state,{payload:{results}})=>{
            state.searchSeries = results;
        });
        builder.addCase(getSearchSeries.rejected,(state,action)=>{

        }); 
    }

})

export const mySearch = SerachSlice.reducer;
