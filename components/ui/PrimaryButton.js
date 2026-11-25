import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onboarding } from "../../theme";

// Tombol pil lebar penuh dengan gradien oranye.
const PrimaryButton = ({ label, onPress }) => (
    <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
        <LinearGradient
            colors={[onboarding.colors.gradientStart, onboarding.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fill}
        >
            <Text style={styles.label}>{label}</Text>
        </LinearGradient>
    </Pressable>
);

export default PrimaryButton;

const styles = StyleSheet.create({
    pressable: {
        borderRadius: onboarding.radius.chip,
        overflow: "hidden",
    },

    pressed: {
        opacity: 0.85,
    },

    fill: {
        minHeight: 54,
        borderRadius: onboarding.radius.chip,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: onboarding.spacing.lg,
    },

    label: {
        fontSize: 16,
        fontWeight: "700",
        color: onboarding.colors.textPrimary,
    },
});
