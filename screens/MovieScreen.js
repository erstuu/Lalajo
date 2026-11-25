import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/features/catalogSlice";

import HomeComponent from "../components/home/HomeComponent";
import { CATEGORIES } from "../constants/categories";

export default function MovieScreen() {
    const dispatch = useDispatch();
    const catalog = useSelector((state) => state.catalog);
    const { categories, subtitles } = CATEGORIES.movie;

    useEffect(() => {
        categories.filter((category) => category !== "mustWatch").forEach((category) => {
            const cat = catalog.categories[`movie:${category}`];
            if (!cat || cat.status === "idle" || cat.status === "failed") {
                dispatch(fetchCategory({ media: "movie", category, page: 1 }));
            }
        });
    }, [catalog.categories, dispatch]);

    // Must Watch menyusul setelah Top Rated selesai, supaya judul gandanya bisa disaring.
    useEffect(() => {
        const topRated = catalog.categories["movie:topRated"];
        const settled = topRated && topRated.status !== "idle" && topRated.status !== "loading";
        if (!settled) return;

        const mustWatch = catalog.categories["movie:mustWatch"];
        if (!mustWatch || mustWatch.status === "idle" || mustWatch.status === "failed") {
            dispatch(fetchCategory({ media: "movie", category: "mustWatch", page: 1 }));
        }
    }, [catalog.categories, dispatch]);

    const data = Object.fromEntries(
        categories.map((c) => [c, catalog.categories[`movie:${c}`]?.items || []])
    );

    return <HomeComponent data={data} subTitle={subtitles} type={"movie"} title={"Lalajo"} />;
}
