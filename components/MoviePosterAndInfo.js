import React from "react";
import { genres } from "./helper/Genres";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import MoviePoster from "./MoviePoster";
import MovieRating from "./movieDetail/MovieRating";
import { black } from "./helper/Color";
import {useNavigation} from "@react-navigation/native";

const Genre = (genreId = []) => {
    const text = genreId.map((item) => genres[item.toString()].name);
    return text.join(", ");
};

const MoviesPosterAndInfo = ({ item, type }) => {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    if (type === "tv") {
                        navigation.navigate("TVDetail", { id: item.id });
                    } else {
                        navigation.navigate("MovieDetail", { id: item.id });
                    }
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <MoviePoster item={item} type={type} />
                    <View style={{ margin: 16, justifyContent: "center", marginBottom: 24, flex: 1 }}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }} numberOfLines={2}>
                            {item.name}
                            {item.title}
                        </Text>
                        <MovieRating rating={item.vote_average} textColor={black} />
                        <Text style={{ fontSize: 12, marginTop: 10, width: "75%" }}>
                            {Genre(item.genre_ids)}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default MoviesPosterAndInfo;