import React from "react";
import {Routes,Route} from "react-router-dom"
import Home from "./Home";
import HeaderNav from "./component/HeaderNav";
import Footer from "./component/Footer";
import AllMovies from "./AllMovies";
import AllSeries from "./AllSeries";
import ContactUs from "./ContactUse";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
const App = () => {

  return (
    <div>
      <HeaderNav/>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/Movies" element={<AllMovies/>}/>
        <Route path="/Series" element={<AllSeries/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
        <Route path="/movie/:moveId/title/:moveTitle" element={<MovieDetails/>}/>
        <Route path="/series/:seriesId/title/:seriesTitle" element={<SeriesDetails/>}/>
      </Routes>
      <Footer/>
    </div>

  )
}

export default App
