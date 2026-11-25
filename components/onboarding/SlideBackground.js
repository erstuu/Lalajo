import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onboarding } from "../../theme";

const CROP_HEIGHT = "100%";

// Latar slide: foto penuh dengan fade gelap ke bawah supaya teks tetap terbaca.
const SlideBackground = ({ source, fadeHeight = "60%", children }) => (
    <View style={[StyleSheet.absoluteFill, styles.root]}>
        {source ? (
            <Image source={source} style={styles.image} resizeMode="cover" />
        ) : (
            <LinearGradient
                colors={[
                    onboarding.colors.bg,
                    onboarding.colors.bgWarm1,
                    onboarding.colors.bgWarm2,
                    onboarding.colors.bg,
                ]}
                locations={[0, 0.4, 0.62, 1]}
                style={StyleSheet.absoluteFill}
            />
        )}
        <LinearGradient
            colors={["transparent", onboarding.colors.bg]}
            style={[styles.fade, { height: fadeHeight }]}
            pointerEvents="none"
        />
        {children}
    </View>
);

export default SlideBackground;

const styles = StyleSheet.create({
    root: {
        backgroundColor: onboarding.colors.bg,
        overflow: "hidden",
    },

    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: CROP_HEIGHT,
    },

    fade: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
});
