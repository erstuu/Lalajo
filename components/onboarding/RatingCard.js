import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import { onboarding } from "../../theme";

// Kartu kaca berisi rating dan jumlah penonton, melayang di slide 2.
const RatingCard = ({ rating = "8.7", watched = "1.2M watched" }) => (
    <BlurView
        intensity={30}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={styles.card}
    >
        <View style={styles.row}>
            <Ionicons name="star" size={16} color={onboarding.colors.primary} />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.outOf}>/10</Text>
        </View>
        <View style={styles.row}>
            <Ionicons name="people" size={13} color={onboarding.colors.textSecondary} />
            <Text style={styles.watched}>{watched}</Text>
        </View>
    </BlurView>
);

export default RatingCard;

const styles = StyleSheet.create({
    card: {
        alignSelf: "flex-start",
        borderRadius: onboarding.radius.card,
        borderWidth: 1,
        borderColor: onboarding.colors.glassBorder,
        backgroundColor: onboarding.colors.glassFill,
        paddingVertical: onboarding.spacing.sm,
        paddingHorizontal: onboarding.spacing.md,
        overflow: "hidden",
        gap: 2,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    rating: {
        fontSize: 22,
        fontWeight: "800",
        color: onboarding.colors.textPrimary,
    },

    outOf: {
        fontSize: 12,
        color: onboarding.colors.textSecondary,
    },

    watched: {
        fontSize: 12,
        color: onboarding.colors.textSecondary,
    },
});
