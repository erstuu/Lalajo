import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getImageUrl } from "../service/url";
import { routes } from "../navigation/routes";
import { colors, radius } from "../theme";

const MoviePoster = ({ item, type }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() =>
                navigation.navigate(type === "tv" ? routes.tvDetail : routes.movieDetail, {
                    id: item.id,
                })
            }
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
            <Image
                style={styles.poster}
                source={getImageUrl(item.poster_path)}
                resizeMode={"cover"}
            />
        </Pressable>
    );
};

export default MoviePoster;

const styles = StyleSheet.create({
    poster: {
        width: 132,
        height: 198,
        marginHorizontal: 6,
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },
});
