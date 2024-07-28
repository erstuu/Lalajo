import React from "react";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getImageUrl } from "../../service/url";
import { black, transparent } from "../helper/Color";

const MovieBackdrop = ({ backdrop, children }) => {
    return (
        <View style={styles.container}>
            <Image source={getImageUrl(backdrop)} resizeMode={"cover"} style={styles.imageStyle} />
            <LinearGradient colors={[transparent, black]} locations={[0.45, 0.9]} style={styles.gradientImage} />
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, margin: 16, borderTopLeftRadius: 16 }}>
                {children}
            </View>
        </View>
    );
};

export default MovieBackdrop;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height / 2.5,
        backgroundColor: black,
    },

    imageStyle: {
        flex: 1,
        height: Dimensions.get("window").width * 1.7777,
        width: Dimensions.get("window").width,
    },

    gradientImage: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
    },
});