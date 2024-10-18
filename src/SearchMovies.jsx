import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Rating,
    Button,
  } from "@material-tailwind/react";
  import { Link, useParams } from 'react-router-dom';
import axios from "axios";
const SearchMovies = () => {
    const {wordSearch} = useParams()
    const [searchMovie,setSearchMovie] = useState([]);
    const getSearchM = () => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {query: wordSearch, include_adult: 'false', language: 'en-US', page: '1'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODkzNTkyMC45NjE0MzIsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ov40vWkt_NE9RGkaltvODDOid-IK9mMbHs_IeTOHQTE'
            }
          };
          
        axios
            .request(options)
            .then(function (response) {
              setSearchMovie(response.data.results)
              console.log(response.data.results)
            })
            .catch(function (error) {
              console.error(error);
            });
    }
    useEffect(()=>{
        getSearchM()
    },[wordSearch])
    return(
        <div className="bg-black">
            <div className="text-center p-11">
                <p className="styleHeaderCyn">Search Movies</p>
            </div>
            
            <div className="md:px-14 flex flex-col items-center justify-center w-screen">
                <div className='container grid grid-cols-1 px-8 w-[80%] md:w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center my-7 p-7 w-full gap-11'>
                    {searchMovie.map(({poster_path,title,vote_average,id}, index) => (
                        <Card className="w-full h-[32em] overflow-hidden  bg-[#212529]" key={index}>
                            <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none h-[70%]"
                            >
                            <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
                                alt="ui/ux review check"
                                className='w-full h-full'
                            />
                            </CardHeader>
                            <CardBody className='h-[35%] pt-5 py-5 flex flex-col pb-0 justify-center'>
                            <Typography variant="p" className='text-white text-center md:text-left lg:text-2xl'>
                                TITLE : {title}
                            </Typography>
                            <Typography variant="lead" color="gray" className="mt-3 font-normal flex flex-col justify-between lg:flex-row  items-center ">
                                <p className='text-cyan-400 text-xl md:text-xl'>Rate : {vote_average}</p>
                                <Rating value={Math.round(vote_average * 0.5)} />
                            </Typography>
                            </CardBody>
                            <CardFooter className="flex justify-center mb-5  items-center h-[10%] w-full">
                            <Button variant='outlined' color='cyan'>
                                <Link to={`/movie/${id}/title/${title}`}>DETAILS</Link>
                            </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchMovies;