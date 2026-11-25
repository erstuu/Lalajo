import { Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../theme";

// Tombol bookmark presentasional; status dan aksinya datang dari useWatchlist.
const SaveButton = ({ saved, onPress, style }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, style]}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={saved ? "Remove from watchlist" : "Save to watchlist"}
            accessibilityState={{ selected: saved }}
        >
            <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={20}
                color={saved ? colors.accent : colors.label}
            />
        </Pressable>
    );
};

export default SaveButton;

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
});
