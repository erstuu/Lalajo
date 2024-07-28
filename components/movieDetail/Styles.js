import { StyleSheet } from "react-native";
import { gray } from "../helper/Color";

export const Styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        marginBottom: 4,
        marginTop: 24,
    },

    bottomText: {
        width: 75,
        fontSize: 14,
        marginTop: 4,
    },

    castImageContainer: {
        overflow: "hidden",
        height: 85,
        width: 75,
        borderRadius: 10,
        marginRight: 8,
        backgroundColor: gray,
    },

    imagePlaceholder: {
        backgroundColor: gray,
    },

    castImage: {
        width: 75,
        height: 110,
    },

    movieImages: {
        height: 100,
        marginRight: 8,
        borderRadius: 10,
    },

    movieRecommImages: {
        height: 150,
        width: 100,
        marginRight: 8,
        borderRadius: 10,
    },
});
