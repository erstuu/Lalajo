import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MoviePoster from "../MoviePoster";
import Skeleton from "../ui/Skeleton";
import { colors, spacing } from "../../theme";

const MoviesRow = ({ id, title, type, data }) => {
    const navigation = useNavigation();
    const loading = !data || data.length === 0;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <Pressable
                    onPress={() => navigation.navigate("MovieList", { id, title, type })}
                    hitSlop={12}
                >
                    <Text style={styles.more}>See All</Text>
                </Pressable>
            </View>
            {loading ? (
                <View style={styles.skeletonRow}>
                    {[0, 1, 2].map((i) => (
                        <Skeleton key={i} style={styles.skeletonPoster} />
                    ))}
                </View>
            ) : (
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({ item }) => <MoviePoster item={item} type={type} />}
                    keyExtractor={(item) => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default MoviesRow;

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.xl,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: spacing.md,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.label,
        marginBottom: 10,
    },

    more: {
        fontSize: 13,
        fontWeight: "500",
        color: colors.accent,
        marginBottom: 10,
    },

    skeletonRow: {
        flexDirection: "row",
        paddingHorizontal: spacing.sm,
    },

    skeletonPoster: {
        width: 132,
        height: 198,
        marginHorizontal: 6,
    },
});
