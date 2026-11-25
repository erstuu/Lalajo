import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme";

const MovieRating = ({ rating, style, textColor = colors.labelSecondary }) => {
    if (!rating) return null;

    return (
        <View style={[styles.container, style]}>
            <Icon name="star" size={12} color={colors.star} />
            <Text style={[styles.text, { color: textColor }]}>{rating.toFixed(1)}</Text>
        </View>
    );
};

export default MovieRating;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    text: {
        fontSize: 13,
        fontWeight: "600",
    },
});
