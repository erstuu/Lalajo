import React from "react";
import { FlatList, StyleSheet } from "react-native";

import MoviePosterAndInfo, { GridSkeleton } from "./MoviePosterAndInfo";
import { spacing } from "../theme";

const MovieList = ({ data, type, onReachEnd, loading }) => {
    if (loading && (!data || data.length === 0)) {
        return <GridSkeleton />;
    }

    return (
        <FlatList
            data={data}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => <MoviePosterAndInfo item={item} type={type} />}
            keyExtractor={(item) => String(item.id)}
            style={styles.list}
            contentContainerStyle={styles.content}
            onEndReached={onReachEnd}
            onEndReachedThreshold={0.9}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default MovieList;

const styles = StyleSheet.create({
    row: {
        gap: 12,
        marginBottom: spacing.lg,
    },

    list: {
        flex: 1,
    },

    content: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xxl,
    },
});
