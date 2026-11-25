// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './features/catalogSlice';
import MovieDetailReducer from './features/movieDetailSlice';
import searchReducer from './features/searchSlice';
import discoverReducer from './features/discoverSlice';

const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        movieDetail: MovieDetailReducer,
        search: searchReducer,
        discover: discoverReducer,
    },
});

export default store;
