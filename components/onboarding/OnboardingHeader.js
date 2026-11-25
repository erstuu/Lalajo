import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoMark from "./LogoMark";
import { onboarding } from "../../theme";

// Header onboarding: logo dan nama aplikasi di kiri, tombol Skip di kanan.
const OnboardingHeader = ({ onSkip }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.row, { paddingTop: insets.top + onboarding.spacing.sm }]}>
            <View style={styles.brand}>
                <LogoMark size={22} />
                <Text style={styles.brandText}>Lalajo</Text>
            </View>
            <Pressable
                onPress={onSkip}
                accessibilityRole="button"
                accessibilityLabel="Skip onboarding"
                hitSlop={8}
                style={({ pressed }) => [styles.skip, pressed && styles.pressed]}
            >
                <Text style={styles.skipText}>Skip</Text>
            </Pressable>
        </View>
    );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
    row: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: onboarding.spacing.screenX,
        paddingBottom: onboarding.spacing.sm,
    },

    brand: {
        flexDirection: "row",
        alignItems: "center",
        gap: onboarding.spacing.xs,
    },

    brandText: {
        fontSize: 17,
        fontWeight: "800",
        color: onboarding.colors.textPrimary,
        letterSpacing: -0.3,
    },

    skip: {
        minWidth: 44,
        minHeight: 44,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    pressed: {
        opacity: 0.6,
    },

    skipText: {
        fontSize: 15,
        fontWeight: "600",
        color: onboarding.colors.textSecondary,
    },
});
