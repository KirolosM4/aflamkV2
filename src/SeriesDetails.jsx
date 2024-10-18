import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { dontShowVideo, getCastSeries, getDetailsSeries, getVideoSeries } from "./redux/Slice/DetailsSeries";
import WaitingDetails from "./WaitingDetails";
import { FaHandPointRight,FaHandPointLeft,FaRegStar } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { FaCirclePlay } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { ImCancelCircle } from "react-icons/im";
const SeriesDetails = () => {
    const {seriesId} = useParams();
    const {detailsSeries} = useSelector(state => state.myDetailsSeries);
    const {waitSeries} = useSelector(state => state.myDetailsSeries);
    const {castSeries} = useSelector(state => state.myDetailsSeries)
    const {videoSeries} = useSelector(state => state.myDetailsSeries);
    const {showVideo} = useSelector(state => state.myDetailsSeries)
    const {newBackgroundVideo} = useSelector(state => state.myDetailsSeries)
    const navigation = useNavigate()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsSeries(seriesId));
        dispatch(getCastSeries(seriesId));
    },[])
    return(
        <div>
            {waitSeries ? 
                <div className="h-screen bg-black flex items-center justify-center"><WaitingDetails/></div> 
                :
                <div className={`h-fit bg-no-repeat bg-cover bg-center relative before:content-[''] ${newBackgroundVideo ? "before:bg-black before:opacity-75 before:z-10" : "before:bg-gradient-to-b from-black via-transparent to-black"} before:absolute before:w-full before:h-full`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsSeries.backdrop_path})`}}>
                    {showVideo 
                        &&
                        <div className="absolute z-20 top-20 flex items-center flex-col gap-5 w-full" >
                            <iframe className="w-full lg:w-1/2" height="315" src={`https://www.youtube.com/embed/${videoSeries?.results[0].key}?si=QVPTHawPaII-sR60 z-20`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe>
                            <ImCancelCircle color="white" className="text-2xl cursor-pointer" onClick={()=>dispatch(dontShowVideo())}/>
                        </div>
                    }
                    <div className="relative h-full w-full">
                        <p className="text-center styleHeaderCyn p-11">Series - Details</p>
                        <div className="grid miniScreen:gird-cols-1 lg:grid-cols-12">
                            <div className="lg:col-start-2 lg:col-span-3 w-full flex justify-center">
                                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsSeries.poster_path}`} className="w-1/2 lg:w-full" alt="" />
                            </div>
                            <div className="lg:col-start-6 lg:col-span-6 text-white flex flex-col gap-2">
                                <p className="text-4xl text-center lg:text-left p-2">{detailsSeries.title}</p>
                                <p className="flex flex-col items-center lg:flex-row">{detailsSeries.release_date} ({detailsSeries.original_language.toUpperCase()}) <span className="px-2"><FaHandPointRight color="yellow" className="inline"/> {detailsSeries.genres[0] ? detailsSeries.genres[0].name : ""} , {detailsSeries.genres[1] ? detailsSeries.genres[1].name : ""} <FaHandPointLeft color="yellow" className="inline"/></span> Episode Run Time {detailsSeries.episode_run_time} </p>
                                <p className="leading-8 text-center text-sm px-3 lg:text-xl lg:px-0 lg:text-left"><span className="styleHeaderCyn">OverView : </span>{detailsSeries.overview}</p>
                                <p className="styleHeaderCyn text-center lg:text-left">Casting : </p>
                                <div className="flex flex-col items-center lg:justify-around lg:flex-row ">
                                    <p className="flex flex-col items-center"><span>{castSeries.cast[0] ? castSeries.cast[0].name : ""}</span> <span className="text-yellow-500">{castSeries.cast[0] ? castSeries.cast[0].known_for_department : "Acting"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castSeries.cast[1] ? castSeries.cast[1].name : ""}</span> <span className="text-yellow-500">{castSeries.cast[1] ? castSeries.cast[1].known_for_department : "Acting"}</span></p>
                                </div>
                                <div className="flex flex-col items-center lg:flex-row lg:justify-around">
                                    <p className="flex flex-col items-center"><span>{castSeries.crew[0] ? castSeries.crew[0].name : ""}</span> <span className="text-yellow-500">{castSeries.crew[0] ? castSeries.crew[0].known_for_department : "Production"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castSeries.crew[1] ? castSeries.crew[1].name : ""}</span> <span className="text-yellow-500">{castSeries.crew[1] ? castSeries.crew[1].known_for_department : "Direction"}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castSeries.crew[2] ? castSeries.crew[2].name : ""}</span> <span className="text-yellow-500">{castSeries.crew[2] ? castSeries.crew[2].known_for_department : "Production"}</span></p>
                                </div>
                                <div className="flex justify-around flex-wrap">
                                    <p className="flex flex-col items-center cursor-pointer"><AiFillFileAdd color="green" className="text-2xl" /><span>AddTo WatchList</span></p>
                                    <p className="flex flex-col items-center cursor-pointer"><FaRegStar color="yellow" className="text-2xl"/><span>Rate Movie</span></p>
                                    <p className="flex flex-col items-center cursor-pointer "><FaCirclePlay color="red" className="text-2xl" onClick={()=>dispatch(getVideoSeries(seriesId))}/><span>Play Trailer</span></p>
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

export default SeriesDetails;
