import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isSaved, toggleSaved } from "../../service/watchlist";
import { colors } from "../../theme";

// Tombol bookmark di detail film dan serial untuk menyimpan judul ke watchlist.
const SaveButton = ({ item, style }) => {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        let alive = true;
        isSaved(item)
            .then((value) => {
                if (alive) setSaved(value);
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, [item.media, item.id]);

    const onToggle = () => {
        toggleSaved(item)
            .then(setSaved)
            .catch(() => {});
    };

    return (
        <Pressable
            onPress={onToggle}
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
