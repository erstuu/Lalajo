import { useEffect, useId, useRef } from "react";
import {
    AccessibilityInfo,
    Animated,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Defs, LinearGradient as SvgGradient, Path, Stop } from "react-native-svg";
import LogoMark from "../components/onboarding/LogoMark";
import Wordmark from "../components/onboarding/Wordmark";
import { onboarding } from "../theme";

// Splash animasi singkat; App yang memutuskan layar berikutnya.
const SplashScreen = () => {
    const { width, height } = useWindowDimensions();
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.9)).current;
    const curvesOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let alive = true;
        AccessibilityInfo.isReduceMotionEnabled()
            .catch(() => false)
            .then((reduce) => {
                if (!alive) return;
                if (reduce) {
                    logoOpacity.setValue(1);
                    logoScale.setValue(1);
                    curvesOpacity.setValue(1);
                    taglineOpacity.setValue(1);
                    return;
                }
                Animated.parallel([
                    Animated.timing(curvesOpacity, {
                        toValue: 1,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(logoOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.spring(logoScale, {
                            toValue: 1,
                            speed: 8,
                            bounciness: 4,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.delay(300),
                        Animated.timing(taglineOpacity, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                ]).start();
            });
        return () => {
            alive = false;
        };
    }, [curvesOpacity, logoOpacity, logoScale, taglineOpacity]);

    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: curvesOpacity }]}>
                <LightCurves width={width} height={height} />
            </Animated.View>

            <Animated.View
                style={{
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                    alignItems: "center",
                }}
            >
                <View style={styles.logoRow}>
                    <LogoMark size={40} />
                    <Wordmark size={40} />
                </View>
                <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
                    Find your next story
                </Animated.Text>
            </Animated.View>
        </View>
    );
};

export default SplashScreen;

// Dua garis cahaya oranye, satu dari kiri atas dan satu dari kanan bawah.
const LightCurves = ({ width, height }) => {
    const id = `splash-glow-${useId().replace(/[:]/g, "")}`;

    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Defs>
                <SvgGradient id={id} x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={onboarding.colors.gradientStart} stopOpacity="0.9" />
                    <Stop offset="1" stopColor={onboarding.colors.gradientEnd} stopOpacity="0" />
                </SvgGradient>
            </Defs>
            <Path
                d={`M -${width * 0.1} ${height * 0.08} Q ${width * 0.42} ${height * 0.02} ${width * 0.2} ${height * 0.42}`}
                stroke={`url(#${id})`}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
            />
            <Path
                d={`M ${width * 1.08} ${height * 0.92} Q ${width * 0.6} ${height * 1.02} ${width * 0.82} ${height * 0.6}`}
                stroke={`url(#${id})`}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
            />
        </Svg>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: onboarding.colors.bg,
        alignItems: "center",
        justifyContent: "center",
    },

    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: onboarding.spacing.sm,
    },

    tagline: {
        ...onboarding.type.tagline,
        marginTop: onboarding.spacing.md,
        color: onboarding.colors.textSecondary,
        textAlign: "center",
    },
});
