import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";

const MovieGenres = ({ genre }) => {
    if (!Array.isArray(genre)) return null;

    return (
        <View style={styles.container}>
            {genre.map((item, index) => (
                <View key={index} style={styles.chip}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default MovieGenres;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        gap: 8,
    },

    chip: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        backgroundColor: colors.card,
    },

    text: {
        color: colors.labelSecondary,
        fontSize: 12,
        fontWeight: "500",
    },
});
