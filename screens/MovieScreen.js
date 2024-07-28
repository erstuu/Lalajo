import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchMustWatchMovies,
    fetchUpcomingMovies
} from "../store/features/movieSlice";
import { MovieTypes } from "../components/helper/Types";

import HomeComponent from "../components/home/HomeComponent";

export default function MovieScreen() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.movies);

    useEffect(() => {
        if (data.status === "idle") {
            dispatch(fetchPopularMovies());
            dispatch(fetchTopRatedMovies());
            dispatch(fetchMustWatchMovies());
            dispatch(fetchUpcomingMovies());
        }
    }, [data.status, dispatch]);

    return (
        <HomeComponent data={data} subTitle={MovieTypes} type={"movies"} />
    );
}