import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import * as url from '../../service/url';

export const fetchMovieDetail = createAsyncThunk(
    "movieDetail/fetchMovieDetail", async ({id}) => {
    try {
        const resDetail = axios.get(url.getMovieDetailUrl(id));
        const resCredit = axios.get(url.getMovieCreditUrl(id));
        const resImages = axios.get(url.getMovieImageUrl(id));
        const resVideos = axios.get(url.getMovieVideoUrl(id));
        const resRecommendations = axios.get(url.getMovieRecommendationsUrl(id));

        const detail = await resDetail;
        const credit = await resCredit;
        const images = await resImages;
        const videos = await resVideos;
        const recommendations = await resRecommendations;

        return {
            detail: detail.data,
            credit: credit.data,
            images: images.data,
            videos: videos.data,
            recommendations: recommendations.data };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState: {
        detail: [],
        credit: [],
        images: [],
        videos: [],
        recommendations: [],
        status: 'idle',
        isLoaded: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detail = action.payload.detail;
                state.credit = action.payload.credit;
                state.images = action.payload.images;
                state.videos = action.payload.videos;
                state.recommendations = action.payload.recommendations;
                state.isLoaded = true
            })
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default movieDetailSlice.reducer;

export const selectMovieDetail = (state) => state.movieDetail;