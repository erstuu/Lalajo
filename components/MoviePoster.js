import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getImageUrl } from "../service/url";
import { colors, radius } from "../theme";

const MoviePoster = ({ item, type }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                if (type === "tv") {
                    navigation.navigate("TVDetail", { id: item.id });
                } else {
                    navigation.navigate("MovieDetail", { id: item.id });
                }
            }}
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
