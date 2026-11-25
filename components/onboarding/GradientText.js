import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { onboarding } from "../../theme";

// Teks bergradien oranye, dibuat dengan teks itu sendiri sebagai mask.
const GradientText = ({ children, style }) => (
    <MaskedView
        maskElement={<Text style={style}>{children}</Text>}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
    >
        <LinearGradient
            colors={[onboarding.colors.gradientStart, onboarding.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
        >
            <Text style={[style, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>
    </MaskedView>
);

export default GradientText;
