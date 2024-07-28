import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchMovieAPI = createAsyncThunk(
//     'movies/fetchMovieAPI',
//     async (movieId) => {
//         const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=en-US");
//         return await response.json();
//     }
// );

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    incrementByAmount
} = counterSlice.actions

export default counterSlice.reducer