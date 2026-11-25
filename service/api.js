import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000,
    params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_KEY,
        language: "en-US",
    },
});

export default api;
