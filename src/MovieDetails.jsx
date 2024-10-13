import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getCastMovie, getDetailsMovie } from "./redux/Slice/DetailsMovie";
import WaitingDetails from "./WaitingDetails";
import { FaHandPointRight,FaHandPointLeft,FaRegStar } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
const MovieDetails = () => {
    const {moveId} = useParams();
    const {detailsMovie} = useSelector(state => state.myDetailsMovie);
    const {waitMovie} = useSelector(state => state.myDetailsMovie);
    const {castMovie} = useSelector(state => state.myDetailsMovie)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsMovie(moveId))
        dispatch(getCastMovie(moveId))
    },[])
    useEffect(()=>{
        console.log(castMovie)
        console.log(detailsMovie)
    })
    return(
        <div>
            {waitMovie ? 
                <div className="h-screen bg-black flex items-center justify-center"><WaitingDetails/></div> 
                :
                <div className="h-fit bg-no-repeat bg-cover bg-center relative before:content-[''] before:bg-gradient-to-b from-black via-transparent to-black before:absolute before:w-full before:h-full" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsMovie?.backdrop_path})`}}>
                   <div className="relative h-full w-full">
                        <p className="text-center styleHeaderCyn p-11">Movies - Details</p>
                        <div className="grid miniScreen:gird-cols-1 lg:grid-cols-12">
                            <div className="lg:col-start-2 lg:col-span-3 w-full h-full">
                                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsMovie.poster_path}`} className="w-full" alt="" />
                            </div>
                            <div className="lg:col-start-6 lg:col-span-6 text-white flex flex-col gap-2">
                                <p className="text-4xl">{detailsMovie?.title}</p>
                                <p>{detailsMovie?.release_date} <span className="px-2"><FaHandPointRight color="yellow" className="inline"/></span> {detailsMovie?.genres[0].name} , {detailsMovie?.genres[1].name} <span className="px-2"><FaHandPointLeft color="yellow" className="inline"/></span> {Math.floor(detailsMovie?.runtime / 60)} h {detailsMovie?.runtime % 60} min </p>
                                <p className="leading-8"><span className="styleHeaderCyn">OverView : </span>{detailsMovie?.overview}</p>
                                <p className="styleHeaderCyn">Casting : </p>
                                <div className="flex justify-around">
                                    <p className="flex flex-col items-center"><span>{castMovie?.cast[0].name}</span> <span className="text-yellow-500">{castMovie?.cast[0].known_for_department}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie?.cast[1].name}</span> <span className="text-yellow-500">{castMovie?.cast[1].known_for_department}</span></p>
                                </div>
                                <div className="flex justify-around">
                                    <p className="flex flex-col items-center"><span>{castMovie?.crew[0].name}</span> <span className="text-yellow-500">{castMovie?.crew[0].known_for_department}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie?.crew[4].name}</span> <span className="text-yellow-500">{castMovie?.crew[4].known_for_department}</span></p>
                                    <p>||</p>
                                    <p className="flex flex-col items-center"><span>{castMovie?.crew[2].name}</span> <span className="text-yellow-500">{castMovie?.crew[2].known_for_department}</span></p>
                                </div>
                                <div className="flex justify-around">
                                    <Link className="flex flex-col items-center"><AiFillFileAdd color="green" className="text-2xl" /><span>AddTo WatchList</span></Link>
                                    <Link className="flex flex-col items-center"><FaRegStar color="yellow" className="text-2xl"/><span>Rate Movie</span></Link>
                                    <Link className="flex flex-col items-center"><FaCirclePlay color="red" className="text-2xl"/><span className="text-yellow-500">Play Trailer</span></Link>
                                </div>
                                <div className="flex justify-center p-11">
                                    <Button variant="outlined" color="cyan">Back To Step</Button>
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


// poster_path
// style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${detailsMovie.backdrop_path})`}}