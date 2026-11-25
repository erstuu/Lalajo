import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { genres } from "../constants/genres";
import { routes } from "../navigation/routes";
import MovieRating from "./movieDetail/MovieRating";
import Skeleton from "./ui/Skeleton";
import { getImageUrl } from "../service/url";
import { colors, radius, spacing, type } from "../theme";

const CARD_GAP = 12;
const CARD_WIDTH = (Dimensions.get("window").width - spacing.lg * 2 - CARD_GAP) / 2;

const genreText = (ids = []) =>
    ids.map((id) => genres[id]?.name).filter(Boolean).slice(0, 2).join(" • ");

export const GridSkeleton = () => (
    <View style={styles.skeletonGrid}>
        {[0, 1, 2, 3].map((i) => (
            <View key={i} style={{ width: CARD_WIDTH }}>
                <Skeleton style={styles.skeletonPoster} />
                <Skeleton style={styles.skeletonLine} />
            </View>
        ))}
    </View>
);

const MoviePosterAndInfo = ({ item, type }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigation.navigate(type === "tv" ? routes.tvDetail : routes.movieDetail, { id: item.id });
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, width: CARD_WIDTH }]}
        >
            <Image
                source={getImageUrl(item.poster_path)}
                style={styles.poster}
                resizeMode={"cover"}
            />
            <Text style={styles.title} numberOfLines={1}>{item.title || item.name}</Text>
            <View style={styles.metaRow}>
                <MovieRating rating={item.vote_average} />
                <Text style={styles.meta}>
                    {(item.release_date || item.first_air_date || "").slice(0, 4)}
                </Text>
            </View>
            <Text style={styles.genres} numberOfLines={1}>{genreText(item.genre_ids)}</Text>
        </Pressable>
    );
};

export default MoviePosterAndInfo;

const styles = StyleSheet.create({
    poster: {
        width: "100%",
        aspectRatio: 2 / 3,
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },

    title: {
        ...type.headline,
        marginTop: spacing.sm,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 2,
    },

    meta: {
        fontSize: 13,
        color: colors.labelSecondary,
    },

    genres: {
        fontSize: 12,
        color: colors.labelTertiary,
        marginTop: 2,
    },

    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: CARD_GAP,
        padding: spacing.lg,
    },

    skeletonPoster: {
        width: "100%",
        aspectRatio: 2 / 3,
    },

    skeletonLine: {
        height: 14,
        marginTop: spacing.sm,
    },
});
