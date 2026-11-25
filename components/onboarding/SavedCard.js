import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchTrendingMovies } from "../../service/tmdb";
import { getImageUrl } from "../../service/url";
import { colors, onboarding } from "../../theme";

const CARD_WIDTH = 132;
const CARD_HEIGHT = 198;

// Poster yang sudah disimpan: kartu bertumpuk dengan badge bookmark dan penanda watchlist.
const SavedCard = () => {
    const [poster, setPoster] = useState({ title: "Orbit", uri: null });
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let alive = true;
        fetchTrendingMovies()
            .then((results) => {
                const movie = results.find((item) => item.poster_path);
                if (alive && movie) {
                    setPoster({
                        title: movie.title,
                        uri: getImageUrl(movie.poster_path, "uri", "w342").uri,
                    });
                }
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);

    const showImage = poster.uri && !failed;

    return (
        <View style={styles.root}>
            <View style={styles.stage}>
                <View style={styles.backCard} />
                <View style={styles.cardWrap}>
                    {showImage ? (
                        <Image
                            source={{ uri: poster.uri }}
                            style={styles.card}
                            resizeMode="cover"
                            onError={() => setFailed(true)}
                        />
                    ) : (
                        <LinearGradient
                            colors={[colors.card, onboarding.colors.bgElevated, onboarding.colors.bg]}
                            style={[styles.card, styles.placeholder]}
                        >
                            <Text style={styles.placeholderTitle}>{poster.title}</Text>
                        </LinearGradient>
                    )}
                    <LinearGradient
                        colors={[onboarding.colors.gradientStart, onboarding.colors.gradientEnd]}
                        style={styles.badge}
                    >
                        <Ionicons name="bookmark" size={15} color="#FFFFFF" />
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.pill}>
                <Ionicons name="checkmark-circle" size={14} color={onboarding.colors.primary} />
                <Text style={styles.pillText}>Added to watchlist</Text>
            </View>
        </View>
    );
};

export default SavedCard;

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },

    stage: {
        width: CARD_WIDTH + 28,
        height: CARD_HEIGHT + 16,
        alignItems: "center",
        justifyContent: "center",
    },

    backCard: {
        position: "absolute",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 12,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: onboarding.colors.glassBorder,
        transform: [{ rotate: "7deg" }, { translateX: 12 }],
    },

    cardWrap: {
        zIndex: 1,
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: onboarding.colors.glassBorder,
        backgroundColor: onboarding.colors.bgElevated,
        overflow: "hidden",
    },

    placeholder: {
        padding: onboarding.spacing.sm,
        justifyContent: "flex-end",
    },

    placeholderTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: onboarding.colors.textPrimary,
    },

    badge: {
        position: "absolute",
        top: onboarding.spacing.sm,
        right: onboarding.spacing.sm,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    pill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: onboarding.spacing.lg,
        paddingHorizontal: onboarding.spacing.md,
        paddingVertical: onboarding.spacing.xs,
        borderRadius: onboarding.radius.chip,
        backgroundColor: onboarding.colors.chipFill,
        borderWidth: 1,
        borderColor: onboarding.colors.glassBorder,
    },

    pillText: {
        fontSize: 13,
        fontWeight: "500",
        color: onboarding.colors.textPrimary,
    },
});
