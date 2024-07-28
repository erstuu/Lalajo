import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Api Helper
import * as url from '../../service/url';

export const fetchFunctionList = createAsyncThunk(
    'movies/fetchFunctionList', async ({type, title, page}) => {
        try {
            if(type === "movie") {
                let response;
                let requestUrl;
                switch (title) {
                    case "Popular":
                        requestUrl = url.getPopularMoviesUrl(page);
                        response = await axios.get(requestUrl);
                        break;
                    case "Top Rated":
                        requestUrl = url.getTopRatedMoviesUrl(page);
                        response = await axios.get(requestUrl);
                        break;
                    case "Must Watch":
                        requestUrl = url.getMustWatchMoviesUrl(page);
                        response = await axios.get(requestUrl);
                        break;
                    case "Upcoming":
                        requestUrl = url.getUpcomingMoviesUrl(page);
                        response = await axios.get(requestUrl);
                        break;
                    default:
                        throw new Error("Invalid title");
                }
                return {title, data: response.data};
            }
        } catch (error) {
            console.error(`Error fetching data from ${requestUrl}:`, error.response?.status, error.message);
            throw error;
        }
    }
);

export const fetchPopularMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const responses = await axios.get(url.getPopularMoviesUrl());
    return responses.data;
});

export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', async () => {
    const responses = await axios.get(url.getTopRatedMoviesUrl());
    return responses.data;
});

export const fetchMustWatchMovies = createAsyncThunk('movies/fetchMustWatchMovies', async () => {
    const responses = await axios.get(url.getMustWatchMoviesUrl());
    return responses.data;
});

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async () => {
    const responses = await axios.get(url.getUpcomingMoviesUrl());
    return responses.data;
});

const handlePending = (state) => {
    state.status = 'loading';
};

const handleFulfilled = (state, action, key) => {
    state.status = 'succeeded';
    state[key] = action.payload.results;
};

const handleRejected = (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
};

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        popular: [],
        topRated: [],
        mustWatch: [],
        upcoming: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.pending, handlePending)
            .addCase(fetchPopularMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'popular'))
            .addCase(fetchPopularMovies.rejected, handleRejected)

            .addCase(fetchTopRatedMovies.pending, handlePending)
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'topRated'))
            .addCase(fetchTopRatedMovies.rejected, handleRejected)

            .addCase(fetchMustWatchMovies.pending, handlePending)
            .addCase(fetchMustWatchMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'mustWatch'))
            .addCase(fetchMustWatchMovies.rejected, handleRejected)

            .addCase(fetchUpcomingMovies.pending, handlePending)
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'upcoming'))
            .addCase(fetchUpcomingMovies.rejected, handleRejected)

            .addCase(fetchFunctionList.pending, handlePending)
            .addCase(fetchFunctionList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state[action.payload.title] = action.payload.data;
            })
            .addCase(fetchFunctionList.rejected, handleRejected)


    },
});

export default movieSlice.reducer;

export const selectAllMovies = (state) => state.movies;