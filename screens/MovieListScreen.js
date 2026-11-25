import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import BackIcon from "../components/ui/BackIcon";
import {useDispatch, useSelector} from "react-redux";
import ScreenContainer from "../components/ScreenContainer";
import {fetchCategory, selectCategory} from "../store/features/catalogSlice";
import MovieList from "../components/MovieList";
import { colors, spacing } from "../theme";

const MovieListScreen = () => {
    const route = useRoute();
    const type = route.params.type;
    const id = route.params.id;
    const title = route.params.title;
    const media = type === "tv" ? "tv" : "movie";
    const dispatch = useDispatch()

    const category = useSelector(selectCategory(media, id));
    const [page, setPage] = useState(1);

    const onReachEnd = () => {
        if (category.status !== "loading" && category.status !== "loadingMore") {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const needMore = page > category.page;
        if (category.status === "idle" || (category.status === "succeeded" && needMore)) {
            dispatch(fetchCategory({ media, category: id, page }));
        }
    }, [dispatch, id, media, page, category.status, category.page]);

    const headerTitle = `${title} ${type === "tv" ? "TV Show" : "Movies"}`;

    return (
        <ScreenContainer>
            <View style={styles.header}>
                <BackIcon />
                <Text style={styles.headerTitle}>{headerTitle}</Text>
                <View style={styles.spacer} />
            </View>
            <MovieList
                data={category.items}
                type={type}
                onReachEnd={onReachEnd}
                loading={category.status === "loading"}
            />
        </ScreenContainer>
    );
};

export default MovieListScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },

    headerTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: "600",
        color: colors.label,
        textAlign: "center",
    },

    spacer: {
        width: 36,
    },
});
