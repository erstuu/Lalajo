import { Pressable, StyleSheet, Text, View } from "react-native";
import { onboarding } from "../../theme";
import { ONBOARDING_GENRES } from "../../constants/genres";

// Deretan chip genre; berubah jadi filter saat onSelect diberikan.
const GenreChips = ({ genres = ONBOARDING_GENRES, activeIndex = 0, onSelect }) => (
    <View style={styles.row}>
        {genres.map((genre, i) => {
            const label = Array.isArray(genre) ? genre[0] : genre;
            const active = i === activeIndex;
            const chipStyle = [styles.chip, active && styles.chipActive];
            const content = (
                <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            );

            if (!onSelect) {
                return (
                    <View key={label} style={chipStyle}>
                        {content}
                    </View>
                );
            }

            return (
                <Pressable
                    key={label}
                    onPress={() => onSelect(i)}
                    style={chipStyle}
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    accessibilityState={{ selected: active }}
                >
                    {content}
                </Pressable>
            );
        })}
    </View>
);

export default GenreChips;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: onboarding.spacing.xs,
    },

    chip: {
        paddingHorizontal: onboarding.spacing.md,
        paddingVertical: onboarding.spacing.xs,
        borderRadius: onboarding.radius.chip,
        backgroundColor: onboarding.colors.chipFill,
        borderWidth: 1,
        borderColor: onboarding.colors.glassBorder,
    },

    chipActive: {
        borderColor: onboarding.colors.primary,
        shadowColor: onboarding.colors.glow,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },

    label: {
        fontSize: 13,
        fontWeight: "500",
        color: onboarding.colors.textSecondary,
    },

    labelActive: {
        color: onboarding.colors.textPrimary,
        fontWeight: "600",
    },
});
