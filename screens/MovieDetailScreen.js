import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchMovieDetail } from "../store/features/movieDetailSlice";
import MovieBackdrop, { HERO_HEIGHT } from "../components/movieDetail/MovieBackdrop";
import { TrailerPlayButton, TrailerVideo } from "../components/movieDetail/MoviePlayButton";
import MovieTitle from "../components/movieDetail/MovieTitle";
import MovieRating from "../components/movieDetail/MovieRating";
import BackIcon from "../components/ui/BackIcon";
import SaveButton from "../components/movieDetail/SaveButton";
import Skeleton from "../components/ui/Skeleton";

import MovieGenres from "../components/movieDetail/MovieGenres";
import MovieOverview from "../components/movieDetail/MovieOverview";
import MovieCast from "../components/movieDetail/MovieCast";
import MovieImages from "../components/movieDetail/MovieImages";
import MovieRecommendations from "../components/movieDetail/MovieRecommendations";
import { colors, spacing } from "../theme";

const MovieDetailScreen = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movieDetail);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        setTrailerKey(null);
        dispatch(fetchMovieDetail({ media: "movie", id }));
    }, [dispatch, id]);

    const { detail } = movie;
    const meta = [
        detail.release_date ? detail.release_date.slice(0, 4) : null,
        detail.runtime ? `${detail.runtime} min` : null,
    ].filter(Boolean).join("  •  ");

    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {movie.isLoaded ? (
                    <>
                        <MovieBackdrop backdrop={detail.backdrop_path}>
                            <MovieTitle title={detail.title} />
                            <View style={styles.metaRow}>
                                <MovieRating rating={detail.vote_average} />
                                {meta ? <Text style={styles.meta}>{meta}</Text> : null}
                            </View>
                        </MovieBackdrop>
                        <View style={styles.body}>
                            <TrailerPlayButton
                                videoData={movie.videos}
                                onPlay={setTrailerKey}
                            />
                            <MovieGenres genre={detail.genres} />
                            <MovieOverview overview={detail.overview} />
                            <MovieCast credit={movie.credit} />
                            <MovieImages images={movie.images} />
                            <MovieRecommendations
                                recommendations={movie.recommendations}
                                navigation={navigation}
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.skeletonWrapper}>
                        <Skeleton style={styles.skeletonHero} />
                        <View style={styles.body}>
                            <Skeleton style={{ height: 48, borderRadius: 999 }} />
                            <Skeleton style={{ height: 16, width: "60%", marginTop: 24 }} />
                            <Skeleton style={{ height: 14, marginTop: 12 }} />
                            <Skeleton style={{ height: 14, width: "80%", marginTop: 8 }} />
                            <Skeleton style={{ height: 14, width: "40%", marginTop: 8 }} />
                        </View>
                    </View>
                )}
            </ScrollView>
            {trailerKey ? (
                <TrailerVideo
                    videoData={movie.videos}
                    activeKey={trailerKey}
                    onClose={() => setTrailerKey(null)}
                    onSelect={setTrailerKey}
                    heroHeight={HERO_HEIGHT}
                />
            ) : null}
            {movie.isLoaded ? (
                <SaveButton
                    item={{
                        media: "movie",
                        id,
                        title: detail.title,
                        poster_path: detail.poster_path,
                    }}
                    style={styles.save}
                />
            ) : null}
            <BackIcon style={styles.back} color={colors.label} />
        </View>
    );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.surface,
    },

    back: {
        position: "absolute",
        top: 48,
        left: 16,
    },

    save: {
        position: "absolute",
        top: 48,
        right: 16,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 8,
    },

    meta: {
        fontSize: 13,
        color: colors.labelSecondary,
    },

    body: {
        padding: spacing.lg,
        paddingTop: spacing.sm,
    },

    skeletonWrapper: {
        flex: 1,
    },

    skeletonHero: {
        height: 380,
        borderRadius: 0,
    },
});
