import React from "react";
import {FlatList, ScrollView, View} from "react-native";

import MoviesPosterAndInfo from "./MoviePosterAndInfo";

const MovieList = ({ data, type, onReachEnd }) => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <MoviesPosterAndInfo item={item} type={type} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ marginVertical: 8 }}
                onEndReached={onReachEnd}
                onEndReachedThreshold={0.9}
            />
        </View>
    );
};

export default MovieList;