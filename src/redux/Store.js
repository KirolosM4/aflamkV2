import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myMovies } from "./Slice/MoviesCarousalSlice";
import { mySeries } from "./Slice/SeriesCarousalSlice";
import { myTopMovies } from "./Slice/TopMoviesSlice";
import { myTopSeries } from "./Slice/TopSeriesSlice";
import { myAllMovies } from "./Slice/allMoviesSlice";
import { myAllSeries } from "./Slice/AllSeriesSlice";
import { myDetailsMovie } from "./Slice/DetailsMovie";
import { myDetailsSeries } from "./Slice/DetailsSeries";
import { mySearch } from "./Slice/SearchSlice";
const AllRed = combineReducers({
    myMovies,
    mySeries,
    myTopMovies,
    myTopSeries,
    myAllMovies,
    myAllSeries,
    myDetailsMovie,
    myDetailsSeries,
    mySearch,
})

const Store = configureStore({
    reducer:AllRed
})

export default Store;