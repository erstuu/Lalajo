import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Styles } from "./Styles";

const MovieOverview = ({ overview }) => {
    const [textShown, setTextShown] = useState(false);

    if (!overview) return null;

    return (
        <View>
            <Text style={Styles.titleText}>Overview</Text>
            <Pressable onPress={() => setTextShown(!textShown)}>
                <Text numberOfLines={textShown ? 0 : 3} style={Styles.textOverview}>
                    {overview}
                </Text>
            </Pressable>
        </View>
    );
};

export default MovieOverview;
