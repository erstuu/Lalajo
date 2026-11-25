import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { onboarding } from "../../theme";

// Tulisan "Lalajo"; huruf o terakhir jadi ring oranye berisi ikon play.
const Wordmark = ({ size = 28, color = onboarding.colors.textPrimary }) => {
    const ring = size * 0.92;
    const triangle = size * 0.34;

    return (
        <View style={styles.row}>
            <Text style={[styles.text, { fontSize: size, color }]}>Lalaj</Text>
            <View
                style={[
                    styles.ring,
                    {
                        width: ring,
                        height: ring,
                        borderRadius: ring / 2,
                        borderWidth: Math.max(2, size * 0.09),
                    },
                ]}
            >
                <Svg width={triangle} height={triangle} viewBox="0 0 10 10">
                    <Path
                        d="M3 1.5 L8 5 L3 8.5 Z"
                        fill={onboarding.colors.primary}
                        stroke={onboarding.colors.primary}
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                    />
                </Svg>
            </View>
        </View>
    );
};

export default Wordmark;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    text: {
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    ring: {
        borderColor: onboarding.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 1,
        marginTop: 2,
    },
});
