import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { dontShowVideo, getCastMovie, getDetailsMovie, getVideoMovie } from "./redux/Slice/DetailsMovie";
import WaitingDetails from "./WaitingDetails";
import { FaHandPointRight,FaHandPointLeft,FaRegStar } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { FaCirclePlay } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { ImCancelCircle } from "react-icons/im";
const MovieDetails = () => {
    const {moveId} = useParams();
    const {detailsMovie} = useSelector(state => state.myDetailsMovie);
    const {waitMovie} = useSelector(state => state.myDetailsMovie);
    const {castMovie} = useSelector(state => state.myDetailsMovie)
    const {videoMovie} = useSelector(state => state.myDetailsMovie);
    const {showVideo} = useSelector(state => state.myDetailsMovie)
    const {newBackgroundVideo} = useSelector(state => state.myDetailsMovie)
    const navigation = useNavigate()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsMovie(moveId));
        dispatch(getCastMovie(moveId));
    },[])


    return(
        <div>
            {waitMovie ? 
                <div className="h-screen bg-black flex items-center justify-center"><WaitingDetails/></div> 
                :
                <div className={`h-fit bg-no-repeat bg-cover bg-center relative before:content-[''] ${newBackgroundVideo ? "before:bg-black before:opacity-75 " : "before:bg-gradient-to-b from-black via-transparent to-black"} before:absolute before:w-full before:h-full before:z-0`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsMovie.backdrop_path})`}}>
                    {showVideo 
                        &&
                        <div className="absolute z-20 top-20 flex items-center flex-col gap-5 w-full" >
                            <iframe className="w-full lg:w-1/2" height="315" src={`https://www.youtube.com/embed/${videoMovie?.results[0] && videoMovie?.results[0].key}?si=QVPTHawPaII-sR60 z-20`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe>
                            <ImCancelCircle color="white" className="text-2xl cursor-pointer" onClick={()=>dispatch(dontShowVideo())}/>
                        </div>
                    }
                    <div className="relative h-full w-full">
                        <p className="text-center styleHeaderCyn p-11">Movies - Details</p>
                        <div className="grid miniScreen:gird-cols-1 lg:grid-cols-12">
                            <div className="lg:col-start-2 lg:col-span-3 w-full flex justify-center">
                                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsMovie.poster_path}`} className="w-1/2 lg:w-full" alt="" />
                            </div>
                            <div className="lg:col-start-6 lg:col-span-6 text-white flex flex-col gap-2">
                                <p className="text-4xl text-center lg:text-left p-2">{detailsMovie.title}</p>
                                <p className="flex flex-col items-center lg:flex-row">{detailsMovie.release_date} ({detailsMovie.original_language.toUpperCase()}) <span className="px-2"><FaHandPointRight color="yellow" className="inline"/> {detailsMovie.genres[0] ? detailsMovie.genres[0].name : ""} , {detailsMovie.genres[1] ? detailsMovie.genres[1].name : ""} <FaHandPointLeft color="yellow" className="inline"/></span> {Math.floor(detailsMovie.runtime / 60)} h {detailsMovie.runtime % 60} min </p>
                                <p className="leading-8 text-center text-sm px-3 lg:text-xl lg:px-0 lg:text-left"><span className="styleHeaderCyn">OverView : </span>{detailsMovie.overview}</p>
                                <p className="styleHeaderCyn text-center lg:text-left">Casting : </p>
                                <div className="flex flex-col items-center lg:justify-around lg:flex-row ">
                                    <p className="flex flex-col items-center"><span>{castMovie.cast[0] ? castMovie.cast[0].name : ""}</span> <span className="text-yellow-500">{castMovie.cast[0] ? castMovie.cast[0].known_for_department : "Acting"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie.cast[1] ? castMovie.cast[1].name : ""}</span> <span className="text-yellow-500">{castMovie.cast[1] ? castMovie.cast[1].known_for_department : "Acting"}</span></p>
                                </div>
                                <div className="flex flex-col items-center lg:flex-row lg:justify-around">
                                    <p className="flex flex-col items-center"><span>{castMovie.crew[0] ? castMovie.crew[0].name : ""}</span> <span className="text-yellow-500">{castMovie.crew[0] ? castMovie.crew[0].known_for_department : "Production"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie.crew[1] ? castMovie.crew[1].name : ""}</span> <span className="text-yellow-500">{castMovie.crew[1] ? castMovie.crew[1].known_for_department : "Direction"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie.crew[2] ? castMovie.crew[2].name : ""}</span> <span className="text-yellow-500">{castMovie.crew[2] ? castMovie.crew[2].known_for_department : "Production"}</span></p>
                                </div>
                                <div className="flex justify-around flex-wrap">
                                    <p className="flex flex-col items-center cursor-pointer"><AiFillFileAdd color="green" className="text-2xl" /><span>AddTo WatchList</span></p>
                                    <p className="flex flex-col items-center cursor-pointer"><FaRegStar color="yellow" className="text-2xl"/><span>Rate Movie</span></p>
                                    <p className="flex flex-col items-center cursor-pointer "><FaCirclePlay color="red" className="text-2xl" onClick={()=>dispatch(getVideoMovie(moveId))}/><span className="text-yellow-500">Play Trailer</span></p>
                                </div>
                                <div className="flex justify-center p-11">
                                    <Button variant="outlined" color="cyan" onClick={() => navigation(-1)}>Back To Step</Button>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            }
        </div>
    )
}

export default MovieDetails;
