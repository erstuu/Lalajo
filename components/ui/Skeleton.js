import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { colors, radius } from "../../theme";

const Skeleton = ({ style }) => {
    const opacity = useRef(new Animated.Value(0.35)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [opacity]);

    return (
        <Animated.View
            style={[{ backgroundColor: colors.card, borderRadius: radius.md, opacity }, style]}
        />
    );
};

export default Skeleton;
