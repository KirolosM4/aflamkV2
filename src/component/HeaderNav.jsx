import React, { useEffect,useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Input,
    Collapse,
    List,
    ListItem, 
    Card,
    Avatar

} from "@material-tailwind/react";
import { FaListUl } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSearchMovies, getSearchSeries } from "../redux/Slice/SearchSlice";
const HeaderNav = () => {
    const [statusInput,setStatusInput] = useState(true);
    const [statusButton,setStatusButton] = useState("series")
    const {searchMovies} = useSelector(state => state.mySearch);
    const {searchSeries} = useSelector(state => state.mySearch)
    const navigate = useNavigate();
    const [wordSearch,setWordSearch] = useState("")
    const dispatch = useDispatch()
    const NavList = () => {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/"
                >
                    Home
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/Movies"
                >
                    Movies
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/Series"
                >
                    Series
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/ContactUs"
                >
                    Contact Us
                </Typography>
            </ul>
        );
    }
    const [openNav, setOpenNav] = useState(false);
    const handleWindowResize = () =>{
        window.innerWidth >= 960 && setOpenNav(false);
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
        window.removeEventListener("resize", handleWindowResize);
        };
    }, [])};
    return (
        <Navbar className="max-w-screen-3xl bg-[#212529] rounded-none border-none  px-11 py-3 relative">
            <div className="flex items-center justify-between gap-8">
                <Typography
                as="a"
                href="#"
                variant="h6"
                className="mr-4 cursor-pointer py-1.5"
                >
                Redux Movies
                </Typography>
                <div className="lg:flex hidden grow justify-between">
                    <NavList />
                    <div className="flex gap-2 relative z-30">
                        <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white">Login</Button>
                        {
                            statusButton == "series" 
                            ?
                            <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white w-full" onClick={()=>{setStatusButton("movies")}}>Serach Series</Button>
                            :
                            <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white w-full" onClick={()=>{setStatusButton("series")}}>Serach Movies</Button>
                        }
                        <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white" disabled={statusInput} onClick={()=>{statusButton == "movies" ?  navigate(`searchwith/${wordSearch}/in/movie`) :  navigate(`searchwith/${wordSearch}/in/series`)}}>Search</Button>
                        <Input label="search"  className="bg-white" onChange={e=>{e.target.value ? setStatusInput(false) : setStatusInput(true); dispatch(getSearchMovies(e.target.value));dispatch(getSearchSeries(e.target.value)); setWordSearch(e.target.value) }}/>

                    </div>
                </div>
                <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                >
                {openNav ? (
                    <FaListUl className="h-6 w-6" strokeWidth={2} />
                ) : (
                    <FaListUl className="h-6 w-6" strokeWidth={2} />
                )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList/>
                <div className="flex flex-wrap gap-2 relative">
                <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white">Login</Button>
                        {
                            statusButton == "series" 
                            ?
                            <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white w-full" onClick={()=>{setStatusButton("movies")}}>Serach Series</Button>
                            :
                            <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white w-full" onClick={()=>{setStatusButton("series")}}>Serach Movies</Button>
                        }
                        <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white" disabled={statusInput} onClick={()=>{statusButton == "movies" ?  navigate(`searchwith/${wordSearch}/in/movie`) :  navigate(`searchwith/${wordSearch}/in/series`)}}>Search</Button>
                        <Input label="search"  className="bg-white" onChange={e=>{e.target.value ? setStatusInput(false) : setStatusInput(true); dispatch(getSearchMovies(e.target.value));dispatch(getSearchSeries(e.target.value)); setWordSearch(e.target.value) }}/>

                </div>
            </Collapse>
            <Card className={`bg-[#212529] absolute top-full w-full md:w-[40%] right-0 h-[30vh] z-30 rounded-none ${searchSeries.length == 0 ? "hidden" : "overflow-x-auto"}`}>
                    <List>
                        {
                            statusButton == "series"
                            ?
                            searchSeries.map(({original_name,poster_path,id},index)=>(
                                <Link to={`/series/${id}/title/${original_name}`} key={index}>
                                    <ListItem  className="flex justify-between border-y-2 rounded-none border-cyan-300 text-white hover:bg-[#777FD4] hover:text-white">
                                        {original_name}
                                        <Avatar variant="circular" alt="emma" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} />
                                    </ListItem>
                                </Link>
                            ))
                            :
                            searchMovies.map(({original_title,poster_path,id},index)=>(
                                <Link to={`/movie/${id}/title/${original_title}`}>
                                    <ListItem className="flex justify-between border-y-2 border-cyan-300 rounded-none text-white hover:bg-[#777FD4] hover:text-white">
                                    {original_title}
                                    <Avatar variant="circular" alt="emma" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} />
                                    </ListItem>
                                </Link>
                            ))
                        }

                    </List>
                </Card>
        </Navbar>
    );
}
export default HeaderNav;
