import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDetailBundle } from '../../service/tmdb';

export const fetchMovieDetail = createAsyncThunk(
    "movieDetail/fetchMovieDetail", async ({media = "movie", id}) =>
    fetchDetailBundle({ media, id })
);

const initialState = {
    detail: {},
    credit: {},
    images: { backdrops: [] },
    videos: { results: [] },
    recommendations: { results: [] },
    status: 'idle',
    isLoaded: false,
    error: null,
};

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetail.pending, () => ({ ...initialState, status: 'loading' }))
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