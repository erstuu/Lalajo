import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getImageUrl } from "../../service/url";
import { colors } from "../../theme";

const { width } = Dimensions.get("window");
export const HERO_HEIGHT = width * 1.1;

const MovieBackdrop = ({ backdrop, children }) => {
    return (
        <View style={[styles.container, { height: HERO_HEIGHT }]}>
            <Image
                source={getImageUrl(backdrop, "uri", "w780")}
                resizeMode={"cover"}
                style={StyleSheet.absoluteFill}
            />
            <LinearGradient
                colors={["rgba(0,0,0,0.15)", colors.surface]}
                locations={[0.35, 1]}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

export default MovieBackdrop;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
    },

    content: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
    },
});
