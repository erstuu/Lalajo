import React from "react";
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";

const BackIcon = ({ style, color = colors.label, size = 22 }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.button, style]}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
        >
            <Ionicons name="chevron-back" size={size} color={color} />
        </Pressable>
    );
};

export default BackIcon;

const styles = {
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
};
