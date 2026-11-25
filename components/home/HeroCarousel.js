import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { getImageUrl } from "../../service/url";
import { colors, radius, spacing } from "../../theme";
import Skeleton from "../ui/Skeleton";
import { routes } from "../../navigation/routes";
import MovieRating from "../movieDetail/MovieRating";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_GAP = 12;
const CARD_HEIGHT = CARD_WIDTH * 0.75;
const SNAP = CARD_WIDTH + CARD_GAP;
const AUTO_ADVANCE_MS = 5000;

const HeroCarousel = ({ items, type }) => {
    const navigation = useNavigation();
    const listRef = useRef(null);
    const progress = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = (items || []).slice(0, 8);

    const goTo = (index) => {
        listRef.current?.scrollToOffset({ offset: Math.max(0, index) * SNAP, animated: true });
        setActiveIndex(index);
    };

    // Auto-advance: progress bar terisi sampai penuh, lalu pindah slide berikutnya
    useEffect(() => {
        if (slides.length < 2) return;

        progress.setValue(0);
        const anim = Animated.timing(progress, {
            toValue: 1,
            duration: AUTO_ADVANCE_MS,
            useNativeDriver: false,
        });
        anim.start(({ finished }) => {
            if (finished) goTo((activeIndex + 1) % slides.length);
        });

        return () => anim.stop();
    }, [activeIndex, slides.length]);

    const onMomentumEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SNAP);
        if (index !== activeIndex) setActiveIndex(index);
    };

    if (slides.length === 0) {
        return <Skeleton style={styles.skeleton} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                horizontal
                data={slides}
                keyExtractor={(item) => String(item.id)}
                showsHorizontalScrollIndicator={false}
                snapToInterval={SNAP}
                decelerationRate="fast"
                onMomentumScrollEnd={onMomentumEnd}
                onScrollBeginDrag={() => progress.stopAnimation()}
                contentContainerStyle={styles.listContent}
                style={{ marginTop: spacing.lg }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.push(type === "tv" ? routes.tvDetail : routes.movieDetail, { id: item.id })}
                        style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
                    >
                        <Image
                            source={getImageUrl(item.backdrop_path, "uri", "w780")}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={["rgba(0,0,0,0)", colors.surface]}
                            style={styles.gradient}
                        />
                        <View style={styles.caption}>
                            <Text style={styles.title} numberOfLines={1}>
                                {item.title || item.name}
                            </Text>
                            <View style={styles.metaRow}>
                                <MovieRating rating={item.vote_average} />
                                <Text style={styles.meta}>
                                    {(item.release_date || item.first_air_date || "").slice(0, 4)}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
            {slides.length > 1 && (
                <View style={styles.indicators}>
                    {slides.map((item, index) => (
                        <View key={item.id} style={styles.segment}>
                            {index < activeIndex ? (
                                <View style={styles.segmentFill} />
                            ) : index === activeIndex ? (
                                <Animated.View
                                    style={[
                                        styles.segmentFill,
                                        {
                                            width: progress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ["0%", "100%"],
                                            }),
                                        },
                                    ]}
                                />
                            ) : null}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default HeroCarousel;

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.lg,
    },

    listContent: {
        paddingHorizontal: (width - CARD_WIDTH) / 2,
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginHorizontal: CARD_GAP / 2,
        borderRadius: radius.lg,
        overflow: "hidden",
        backgroundColor: colors.card,
        justifyContent: "flex-end",
    },

    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: CARD_HEIGHT * 0.6,
    },

    caption: {
        padding: spacing.md,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.label,
        marginBottom: 4,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    meta: {
        fontSize: 13,
        color: colors.labelSecondary,
    },

    indicators: {
        flexDirection: "row",
        gap: 4,
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
    },

    segment: {
        flex: 1,
        height: 3,
        borderRadius: 2,
        backgroundColor: colors.cardLight,
        overflow: "hidden",
    },

    segmentFill: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.label,
        borderRadius: 2,
    },

    skeleton: {
        height: CARD_HEIGHT,
        borderRadius: radius.lg,
        marginHorizontal: (width - CARD_WIDTH) / 2,
        marginTop: spacing.lg,
    },
});
