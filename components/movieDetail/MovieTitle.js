import React from "react";
import { Text } from "react-native";
import { colors } from "../../theme";

const MovieTitle = ({ title }) => {
    return (
        <Text style={{ fontSize: 30, fontWeight: "700", color: colors.label }} numberOfLines={2}>
            {title}
        </Text>
    );
};

export default MovieTitle;
