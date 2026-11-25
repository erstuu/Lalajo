import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { onboarding } from "../../theme";

const DOT = 10;
const ACTIVE_WIDTH = 44;

// Indikator halaman: titik aktif memanjang jadi pil oranye.
const PaginationDots = ({ count, index }) => {
    const values = useRef(
        Array.from({ length: count }, (_, i) => new Animated.Value(i === index ? 1 : 0))
    ).current;

    useEffect(() => {
        values.forEach((v, i) =>
            Animated.timing(v, {
                toValue: i === index ? 1 : 0,
                duration: 250,
                useNativeDriver: false,
            }).start()
        );
    }, [index, values]);

    return (
        <View
            style={styles.row}
            accessible
            accessibilityRole="adjustable"
            accessibilityLabel={`Slide ${index + 1} of ${count}`}
        >
            {values.map((v, i) => (
                <Animated.View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            width: v.interpolate({ inputRange: [0, 1], outputRange: [DOT, ACTIVE_WIDTH] }),
                            backgroundColor: v.interpolate({
                                inputRange: [0, 1],
                                outputRange: [onboarding.colors.dotInactive, onboarding.colors.primary],
                            }),
                        },
                    ]}
                />
            ))}
        </View>
    );
};

export default PaginationDots;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: onboarding.spacing.xs,
    },

    dot: {
        height: DOT,
        borderRadius: DOT / 2,
    },
});
