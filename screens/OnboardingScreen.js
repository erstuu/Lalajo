import { useEffect, useRef, useState } from "react";
import {
    AccessibilityInfo,
    Animated,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import OnboardingHeader from "../components/onboarding/OnboardingHeader";
import PaginationDots from "../components/onboarding/PaginationDots";
import GradientText from "../components/onboarding/GradientText";
import SlideBackground from "../components/onboarding/SlideBackground";
import PosterCarousel from "../components/onboarding/PosterCarousel";
import RatingCard from "../components/onboarding/RatingCard";
import GenreChips from "../components/ui/GenreChips";
import SavedCard from "../components/onboarding/SavedCard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { SLIDES } from "../constants/onboardingSlides";
import { onboarding } from "../theme";

// Tiga slide yang bisa digeser; Skip dan Get Started menutup onboarding.
const OnboardingScreen = ({ onDone }) => {
    const insets = useSafeAreaInsets();
    const [index, setIndex] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        AccessibilityInfo.isReduceMotionEnabled()
            .then(setReduceMotion)
            .catch(() => {});
    }, []);

    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <PagerView
                style={styles.pager}
                initialPage={0}
                onPageSelected={(e) => setIndex(e.nativeEvent.position)}
            >
                {SLIDES.map((slide, i) => (
                    <View key={slide.id} style={styles.slidePage}>
                        <Slide
                            slide={slide}
                            index={i}
                            count={SLIDES.length}
                            active={i === index}
                            headerInset={insets.top}
                            bottomInset={insets.bottom}
                            reduceMotion={reduceMotion}
                            onDone={onDone}
                        />
                    </View>
                ))}
            </PagerView>
            <OnboardingHeader onSkip={onDone} />
        </View>
    );
};

export default OnboardingScreen;

// Satu halaman onboarding: visual di atas, indikator dan teks di bawah.
const Slide = ({
    slide,
    index,
    count,
    active,
    headerInset,
    bottomInset,
    reduceMotion,
    onDone,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(12)).current;

    useEffect(() => {
        if (!active) {
            opacity.setValue(0);
            translateY.setValue(12);
            return;
        }
        if (reduceMotion) {
            opacity.setValue(1);
            translateY.setValue(0);
            return;
        }
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 350, useNativeDriver: true }),
        ]).start();
    }, [active, reduceMotion, opacity, translateY]);

    return (
        <View style={styles.slide}>
            <SlideBackground source={slide.background} fadeHeight={slide.fadeHeight}>
                <View style={[styles.visual, { paddingTop: headerInset + 64 }]}>
                    <Visual visual={slide.visual} />
                </View>
                <View
                    style={[
                        styles.bottom,
                        { paddingBottom: Math.max(bottomInset, onboarding.spacing.md) + onboarding.spacing.lg },
                    ]}
                >
                    <PaginationDots count={count} index={index} />
                    {index < count - 1 ? (
                        <Text style={styles.swipeHint}>Swipe to continue</Text>
                    ) : null}
                    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
                        {slide.eyebrow ? (
                            <View style={styles.eyebrowRow}>
                                <View style={styles.eyebrowLine} />
                                <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
                            </View>
                        ) : (
                            <View style={styles.accentLine} />
                        )}
                        <Text style={styles.title}>{slide.title}</Text>
                        <GradientText style={styles.title}>{slide.titleAccent}</GradientText>
                        <Text style={styles.body}>{slide.body}</Text>
                        {slide.primaryLabel ? (
                            <View style={styles.buttonWrap}>
                                <PrimaryButton label={slide.primaryLabel} onPress={onDone} />
                            </View>
                        ) : null}
                    </Animated.View>
                </View>
            </SlideBackground>
        </View>
    );
};

// Isi visual tiap slide.
const Visual = ({ visual }) => {
    const { height } = useWindowDimensions();

    if (visual === "carousel") {
        return (
            <View style={styles.visualCenter}>
                <PosterCarousel />
            </View>
        );
    }

    if (visual === "favorites") {
        return (
            <View style={styles.visualCenter}>
                <SavedCard />
            </View>
        );
    }

    if (visual === "details") {
        return (
            <>
                <View style={[styles.ratingWrap, { top: height * 0.22 }]}>
                    <RatingCard />
                </View>
                <View style={styles.chipsWrap}>
                    <GenreChips />
                </View>
            </>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: onboarding.colors.bg,
    },

    pager: {
        flex: 1,
    },

    slidePage: {
        flex: 1,
    },

    slide: {
        flex: 1,
    },

    visual: {
        flex: 1,
        paddingHorizontal: onboarding.spacing.screenX,
    },

    visualCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    ratingWrap: {
        position: "absolute",
        left: onboarding.spacing.screenX,
    },

    chipsWrap: {
        position: "absolute",
        left: onboarding.spacing.screenX,
        right: onboarding.spacing.screenX,
        bottom: onboarding.spacing.lg,
    },

    bottom: {
        paddingHorizontal: onboarding.spacing.screenX,
        gap: onboarding.spacing.md,
    },

    accentLine: {
        width: 50,
        height: 3,
        borderRadius: 2,
        marginBottom: onboarding.spacing.md,
        backgroundColor: onboarding.colors.primary,
    },

    eyebrowRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: onboarding.spacing.sm,
        marginBottom: onboarding.spacing.sm,
    },

    eyebrowLine: {
        width: 28,
        height: 2,
        borderRadius: 1,
        backgroundColor: onboarding.colors.primary,
    },

    eyebrow: {
        ...onboarding.type.eyebrow,
        color: onboarding.colors.primary,
        textTransform: "uppercase",
    },

    title: {
        ...onboarding.type.title,
        color: onboarding.colors.textPrimary,
    },

    body: {
        ...onboarding.type.body,
        maxWidth: "85%",
        marginTop: onboarding.spacing.md,
        color: onboarding.colors.textSecondary,
    },

    swipeHint: {
        ...onboarding.type.eyebrow,
        color: onboarding.colors.textSecondary,
    },

    buttonWrap: {
        marginTop: onboarding.spacing.sm,
    },
});
