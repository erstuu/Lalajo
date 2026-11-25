import { useId } from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { onboarding } from "../../theme";

// Logo dua segitiga play bertumpuk dengan gradien oranye.
const LogoMark = ({ size = 28, opacity = 1 }) => {
    const id = `lalajo-mark-${useId().replace(/[:]/g, "")}`;

    return (
        <Svg
            width={(size * 27) / 28}
            height={size}
            viewBox="0 0 27 28"
            style={{ opacity }}
        >
            <Defs>
                <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={onboarding.colors.gradientStart} />
                    <Stop offset="1" stopColor={onboarding.colors.gradientEnd} />
                </LinearGradient>
            </Defs>
            <Path
                d="M3 3 L13 14 L3 25 Z"
                fill={`url(#${id})`}
                stroke={`url(#${id})`}
                strokeWidth={4}
                strokeLinejoin="round"
                opacity={0.55}
            />
            <Path
                d="M14 3 L24 14 L14 25 Z"
                fill={`url(#${id})`}
                stroke={`url(#${id})`}
                strokeWidth={4}
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default LogoMark;
