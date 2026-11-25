import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import ScreenContainer from "../components/ScreenContainer";
import { requestSearchMovie, selectMovieSearch } from "../store/features/searchSlice";
import { fetchCategory, selectCategory } from "../store/features/catalogSlice";
import MovieList from "../components/MovieList";
import { colors, spacing, type } from "../theme";

const SearchScreen = () => {
    const route = useRoute();
    const { type } = route.params;
    const media = type === "tv" ? "tv" : "movie";
    const dispatch = useDispatch();
    const results = useSelector(selectMovieSearch);
    const status = useSelector((state) => state.search.status);
    const popular = useSelector(selectCategory(media, "popular"));
    const [keyword, setKeyword] = useState("");
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    // Sebelum mengetik, tampilkan film/serial populer sebagai titik mulai
    useEffect(() => {
        if (popular.status === "idle" || popular.status === "failed") {
            dispatch(fetchCategory({ media, category: "popular", page: 1 }));
        }
    }, [dispatch, media, popular.status]);

    const isTyping = keyword.trim().length > 0;

    const onChange = (text) => {
        setKeyword(text);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (text.trim()) dispatch(requestSearchMovie({ keyword: text, type }));
        }, 300);
    };

    return (
        <ScreenContainer>
            <Text style={styles.largeTitle}>Search</Text>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={18} color={colors.labelTertiary} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Movies, shows, and more"
                    placeholderTextColor={colors.labelTertiary}
                    onChangeText={onChange}
                    value={keyword}
                    returnKeyType="search"
                    autoCorrect={false}
                />
                {keyword ? (
                    <Pressable hitSlop={10} onPress={() => onChange("")}>
                        <Ionicons name="close-circle" size={18} color={colors.labelTertiary} />
                    </Pressable>
                ) : null}
            </View>
            {isTyping ? (
                status === "succeeded" && results.length === 0 ? (
                    <Text style={styles.empty}>No results for “{keyword}”</Text>
                ) : (
                    <MovieList data={results} type={type} loading={status === "loading"} />
                )
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Popular now</Text>
                    <MovieList
                        data={popular.items}
                        type={type}
                        loading={popular.status === "loading"}
                    />
                </>
            )}
        </ScreenContainer>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    largeTitle: {
        ...type.largeTitle,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        marginBottom: spacing.md,
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 12,
        marginHorizontal: spacing.lg,
        paddingHorizontal: 12,
        height: 40,
    },

    icon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: colors.label,
    },

    sectionTitle: {
        ...type.headline,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
    },

    empty: {
        textAlign: "center",
        marginTop: 48,
        color: colors.labelSecondary,
        fontSize: 15,
    },
});
