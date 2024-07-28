import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { gray } from "./helper/Color";
import { getImageUrl } from "../service/url";
import {useNavigation} from "@react-navigation/native";

const MoviePoster = ({ item, type}) => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (type === "movie") {
                    navigation.navigate("MovieDetail", { id: item.id });
                }
            }}
        >
            <View>
                <Image
                    style={{ width: 120, height: 180, marginHorizontal: 4, borderRadius: 5 }}
                    source={getImageUrl(item.poster_path)}
                    resizeMode={"cover"}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MoviePoster;

const styles = StyleSheet.create({
    imageContainer: {
        margin: 4,
        backgroundColor: gray,
        borderRadius: 12,
        overflow: "hidden",
    },
});

