import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchMovieDetail } from "../store/features/movieDetailSlice";
import MovieBackdrop, { HERO_HEIGHT } from "../components/movieDetail/MovieBackdrop";
import { TrailerPlayButton, TrailerVideo } from "../components/movieDetail/MoviePlayButton";
import MovieTitle from "../components/movieDetail/MovieTitle";
import MovieRating from "../components/movieDetail/MovieRating";
import MovieGenres from "../components/movieDetail/MovieGenres";
import MovieOverview from "../components/movieDetail/MovieOverview";
import MovieCast from "../components/movieDetail/MovieCast";
import MovieImages from "../components/movieDetail/MovieImages";
import MovieRecommendations from "../components/movieDetail/MovieRecommendations";
import BackIcon from "../components/ui/BackIcon";
import SaveButton from "../components/movieDetail/SaveButton";
import Skeleton from "../components/ui/Skeleton";
import { getImageUrl } from "../service/url";
import { colors, radius, spacing } from "../theme";

const Seasons = ({ seasons }) => {
    const list = (seasons || []).filter((s) => s.season_number > 0);
    if (list.length === 0) return null;

    return (
        <View>
            <Text style={styles.sectionTitle}>Seasons</Text>
            <FlatList
                horizontal
                data={list}
                keyExtractor={(item) => String(item.id)}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.seasonCard}>
                        <Image
                            source={getImageUrl(item.poster_path)}
                            style={styles.seasonPoster}
                            resizeMode="cover"
                        />
                        <Text style={styles.seasonName} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text style={styles.seasonMeta}>
                            {item.episode_count} episodes
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const TVDetailScreen = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const show = useSelector((state) => state.movieDetail);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        setTrailerKey(null);
        dispatch(fetchMovieDetail({ media: "tv", id }));
    }, [dispatch, id]);

    const { detail } = show;
    const meta = [
        detail.first_air_date ? detail.first_air_date.slice(0, 4) : null,
        detail.episode_run_time?.[0] ? `${detail.episode_run_time[0]} min` : null,
        detail.number_of_seasons ? `${detail.number_of_seasons} seasons` : null,
    ].filter(Boolean).join("  •  ");

    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {show.isLoaded ? (
                    <>
                        <MovieBackdrop backdrop={detail.backdrop_path}>
                            <MovieTitle title={detail.name} />
                            <View style={styles.metaRow}>
                                <MovieRating rating={detail.vote_average} />
                                {meta ? <Text style={styles.meta}>{meta}</Text> : null}
                            </View>
                        </MovieBackdrop>
                        <View style={styles.body}>
                            <TrailerPlayButton videoData={show.videos} onPlay={setTrailerKey} />
                            <MovieGenres genre={detail.genres} />
                            <Seasons seasons={detail.seasons} />
                            <MovieOverview overview={detail.overview} />
                            <MovieCast credit={show.credit} />
                            <MovieImages images={show.images} />
                            <MovieRecommendations
                                recommendations={show.recommendations}
                                navigation={navigation}
                            />
                        </View>
                    </>
                ) : (
                    <View>
                        <Skeleton style={styles.skeletonHero} />
                        <View style={styles.body}>
                            <Skeleton style={{ height: 48, borderRadius: 999 }} />
                            <Skeleton style={{ height: 16, width: "60%", marginTop: 24 }} />
                            <Skeleton style={{ height: 14, marginTop: 12 }} />
                        </View>
                    </View>
                )}
            </ScrollView>
            {trailerKey ? (
                <TrailerVideo
                    videoData={show.videos}
                    activeKey={trailerKey}
                    onClose={() => setTrailerKey(null)}
                    onSelect={setTrailerKey}
                    heroHeight={HERO_HEIGHT}
                />
            ) : null}
            {show.isLoaded ? (
                <SaveButton
                    item={{
                        media: "tv",
                        id,
                        title: detail.name,
                        poster_path: detail.poster_path,
                    }}
                    style={styles.save}
                />
            ) : null}
            <BackIcon style={styles.back} color={colors.label} />
        </View>
    );
};

export default TVDetailScreen;

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

    sectionTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: colors.label,
        marginBottom: 8,
        marginTop: 24,
    },

    seasonCard: {
        width: 110,
        marginRight: 12,
    },

    seasonPoster: {
        width: 110,
        height: 165,
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },

    seasonName: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.label,
        marginTop: 6,
    },

    seasonMeta: {
        fontSize: 12,
        color: colors.labelSecondary,
    },

    skeletonHero: {
        height: 380,
        borderRadius: 0,
    },
});
