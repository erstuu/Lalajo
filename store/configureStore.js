// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import movieReducer from './features/movieSlice';
import MovieDetailReducer from './features/movieDetailSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        movies: movieReducer,
        movieDetail: MovieDetailReducer,
    },
});

export default store;