import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMedia } from "../../service/tmdb";

export const requestSearchMovie = createAsyncThunk(
    "search/requestSearchMovie",
    async ({ keyword, type }) => searchMedia({ media: type === "tv" ? "tv" : "movie", keyword })
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestSearchMovie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(requestSearchMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload;
            })
            .addCase(requestSearchMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default searchSlice.reducer;

export const selectMovieSearch = (state) => state.search.results;
