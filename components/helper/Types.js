import {
    getPopularMoviesUrl,
    getTopRatedMoviesUrl,
    getMustWatchMoviesUrl,
    getUpcomingMoviesUrl,
    getPopularTVShowUrl,
    getTopRatedTVShowUrl,
    getMustWatchTVShowUrl,
    getOnTheAirTVShowUrl,
} from "../../service/url";
import axios from "axios";
import * as url from "../../service/url";

export const MovieTypes = ["Popular", "Top Rated", "Must Watch", "Upcoming"];
export const TVShowTypes = ["Popular", "Top Rated", "Must Watch", "On The Air"];

export const movieGet = (title) => {
    switch (title) {
        case "Popular":
            return (page) => axios.get(url.getPopularMoviesUrl(page));
        case "Top Rated":
            return (page) => axios.get(url.getTopRatedMoviesUrl(page));
        case "Must Watch":
            return (page) => axios.get(url.getMustWatchMoviesUrl(page));
        case "Upcoming":
            return (page) => axios.get(url.getUpcomingMoviesUrl(page));
        default:
            throw new Error("Invalid title");
    }
};

export const tvGet = (title) => {
    switch (title) {
        case "Popular":
            return (page) => axios.get(url.getPopularTVShowUrl(page));
        case "Top Rated":
            return (page) => axios.get(url.getTopRatedTVShowUrl(page));
        case "Must Watch":
            return (page) => axios.get(url.getMustWatchTVShowUrl(page));
        case "On The Air":
            return (page) => axios.get(url.getOnTheAirTVShowUrl(page));
    }
};