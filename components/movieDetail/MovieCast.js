import React from "react";
import { FlatList, View, Text, Image } from "react-native";

import { getImageUrl } from "../../service/url";
import { Styles } from "./Styles";

const MovieCast = ({ credit }) => {
    if (!credit || !Array.isArray(credit.cast)) {
        return null;
    }

    let cast = [...credit.cast].sort((a, b) => (a.order > b.order ? 1 : -1));
    cast = cast.slice(0, 10);

    if (cast.length === 0) return null;

    return (
        <View>
            <Text style={Styles.titleText}>Cast</Text>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={cast}
                renderItem={({ item }) => Cast(item)}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const Cast = (cast) => {
    return (
        <View>
            <View style={Styles.castImageContainer}>
                <Image source={getImageUrl(cast.profile_path)} style={Styles.castImage} resizeMode={"cover"} />
            </View>
            <Text style={Styles.bottomText} numberOfLines={2}>
                {cast.name}
            </Text>
        </View>
    );
};

export default MovieCast;
