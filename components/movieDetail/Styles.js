import { StyleSheet } from "react-native";
import { colors, radius } from "../../theme";

export const Styles = StyleSheet.create({
    titleText: {
        fontSize: 17,
        fontWeight: "600",
        color: colors.label,
        marginBottom: 8,
        marginTop: 24,
    },

    textOverview: {
        fontSize: 15,
        lineHeight: 21,
        color: colors.labelSecondary,
    },

    bottomText: {
        width: 64,
        fontSize: 12,
        color: colors.labelSecondary,
        marginTop: 6,
    },

    castImageContainer: {
        overflow: "hidden",
        height: 64,
        width: 64,
        borderRadius: 32,
        marginRight: 12,
        backgroundColor: colors.card,
    },

    imagePlaceholder: {
        backgroundColor: colors.card,
    },

    castImage: {
        width: 64,
        height: 64,
    },

    movieImages: {
        height: 100,
        marginRight: 8,
        borderRadius: radius.md,
    },

    movieRecommImages: {
        height: 165,
        width: 110,
        marginRight: 8,
        borderRadius: radius.md,
    },
});
