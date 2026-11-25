import { useId, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, LinearGradient as SvgGradient, Path, Stop } from "react-native-svg";
import { useTrendingMovies } from "../../hooks/useTrendingMovies";
import { colors, onboarding } from "../../theme";

const FALLBACK_POSTERS = [
    { id: "a", title: "Nightfall", kind: "SERIES", uri: null },
    { id: "b", title: "Orbit", kind: "MOVIE", uri: null },
    { id: "c", title: "Ember", kind: "MOVIE", uri: null },
    { id: "d", title: "Drift", kind: "MOVIE", uri: null },
    { id: "e", title: "Haven", kind: "SERIES", uri: null },
];

const POSTER_COUNT = 5;
const CARD_WIDTH = 104;
const CARD_HEIGHT = 156;

// Lima poster film trending dari TMDB, disusun melengkung dengan poster tengah paling besar.
const PosterCarousel = () => {
    const id = `poster-glow-${useId().replace(/[:]/g, "")}`;
    const trending = useTrendingMovies();
    const [failed, setFailed] = useState({});
    const posters = trending.length
        ? trending.slice(0, POSTER_COUNT).map((poster) => ({ ...poster, kind: "MOVIE" }))
        : FALLBACK_POSTERS;

    const center = (posters.length - 1) / 2;

    return (
        <View style={styles.root}>
            <View style={styles.stage}>
                {posters.map((poster, i) => {
                    const side = i - center;
                    const distance = Math.abs(side);
                    const showImage = poster.uri && !failed[poster.id];

                    return (
                        <View
                            key={poster.id}
                            style={[
                                styles.cardWrap,
                                {
                                    zIndex: 10 - distance,
                                    transform: [
                                        { perspective: 900 },
                                        { translateX: side * CARD_WIDTH * 0.62 },
                                        { rotateY: `${side * 18}deg` },
                                        { scale: distance === 0 ? 1 : 0.84 - (distance - 1) * 0.06 },
                                        { translateY: distance * 12 },
                                    ],
                                },
                            ]}
                        >
                            {showImage ? (
                                <Image
                                    source={{ uri: poster.uri }}
                                    style={styles.card}
                                    resizeMode="cover"
                                    onError={() =>
                                        setFailed((prev) => ({ ...prev, [poster.id]: true }))
                                    }
                                />
                            ) : (
                                <LinearGradient
                                    colors={[
                                        colors.card,
                                        onboarding.colors.bgElevated,
                                        onboarding.colors.bg,
                                    ]}
                                    style={[styles.card, styles.placeholder]}
                                >
                                    <Text style={styles.kind}>{poster.kind}</Text>
                                    <Text style={styles.title} numberOfLines={2}>
                                        {poster.title}
                                    </Text>
                                </LinearGradient>
                            )}
                        </View>
                    );
                })}
            </View>

            <Svg width={260} height={40} viewBox="0 0 260 40" style={styles.glowLine}>
                <Defs>
                    <SvgGradient id={id} x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor={onboarding.colors.gradientStart} stopOpacity="0" />
                        <Stop offset="0.5" stopColor={onboarding.colors.gradientStart} stopOpacity="0.9" />
                        <Stop offset="1" stopColor={onboarding.colors.gradientEnd} stopOpacity="0" />
                    </SvgGradient>
                </Defs>
                <Path
                    d="M4 6 Q130 44 256 6"
                    stroke={`url(#${id})`}
                    strokeWidth={3}
                    fill="none"
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
};

export default PosterCarousel;

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },

    stage: {
        height: CARD_HEIGHT + 36,
        width: CARD_WIDTH * 3.4,
        alignItems: "center",
        justifyContent: "center",
    },

    cardWrap: {
        position: "absolute",
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

    kind: {
        ...onboarding.type.eyebrow,
        fontSize: 9,
        letterSpacing: 1.5,
        color: onboarding.colors.textSecondary,
    },

    title: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: "700",
        color: onboarding.colors.textPrimary,
    },

    glowLine: {
        marginTop: -12,
    },
});
