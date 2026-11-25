import api from "./api";

const MOVIE_PATHS = {
    popular: "/movie/popular",
    topRated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
    nowPlaying: "/movie/now_playing",
};

const TV_PATHS = {
    popular: "/tv/popular",
    topRated: "/tv/top_rated",
    onTheAir: "/tv/on_the_air",
};

export const fetchList = async ({ media = "movie", category, page = 1 }) => {
    if (category === "mustWatch") {
        const { data } = await api.get(`/trending/${media}/week`, { params: { page } });
        return data;
    }
    const paths = media === "tv" ? TV_PATHS : MOVIE_PATHS;
    const { data } = await api.get(paths[category], { params: { page } });
    return data;
};

export const fetchDetailBundle = async ({ media = "movie", id }) => {
    const base = `/${media}/${id}`;
    const [detail, credit, images, videos, recommendations] = await Promise.all([
        api.get(base),
        api.get(`${base}/credits`),
        api.get(`${base}/images`),
        api.get(`${base}/videos`),
        api.get(`${base}/recommendations`),
    ]);
    return {
        detail: detail.data,
        credit: credit.data,
        images: images.data,
        videos: videos.data,
        recommendations: recommendations.data,
    };
};

// Hasil discover per genre, diurutkan dari rating tertinggi dengan vote minimum.
export const fetchDiscover = async ({ media = "movie", genre, page = 1 }) => {
    const { data } = await api.get(`/discover/${media}`, {
        params: {
            with_genres: genre,
            sort_by: "vote_average.desc",
            "vote_count.gte": 300,
            page,
        },
    });
    return data;
};

// Film yang sedang trending minggu ini.
export const fetchTrendingMovies = async () => {
    const { data } = await api.get("/trending/movie/week");
    return data.results;
};

export const searchMedia = async ({ media = "movie", keyword }) => {
    const { data } = await api.get(`/search/${media}`, { params: { query: keyword } });
    return data.results;
};
