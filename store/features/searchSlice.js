import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchMovieUrl } from "../../service/url";

const requestSearchMovie = createAsyncThunk(
    'search/requestSearchMovie', async ({keyword}) => {

    }
)

const searchSlice = createSlice( {
    name: 'search',
    initialState: {
        popular: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {}
})