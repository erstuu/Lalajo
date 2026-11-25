import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../service/tmdb";
import { getImageUrl } from "../service/url";

// Poster film trending minggu ini: [{ id, title, uri }], kosong sampai data tiba atau saat gagal.
export const useTrendingMovies = () => {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        let alive = true;
        fetchTrendingMovies()
            .then((results) => {
                if (!alive) return;
                setPosters(
                    results
                        .filter((movie) => movie.poster_path)
                        .map((movie) => ({
                            id: String(movie.id),
                            title: movie.title,
                            uri: getImageUrl(movie.poster_path, "uri", "w342").uri,
                        }))
                );
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);

    return posters;
};
