import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDED_KEY = "lalajo:onboarded:v2";

// Gate splash → onboarding/aplikasi; key storage sengaja tetap supaya pengguna lama tidak mengulang onboarding.
export const useOnboardingGate = () => {
    const [phase, setPhase] = useState("splash");

    useEffect(() => {
        let alive = true;
        const minDelay = new Promise((resolve) => setTimeout(resolve, 1800));
        Promise.all([AsyncStorage.getItem(ONBOARDED_KEY).catch(() => null), minDelay]).then(
            ([seen]) => {
                if (alive) setPhase(seen ? "app" : "onboarding");
            }
        );
        return () => {
            alive = false;
        };
    }, []);

    const finishOnboarding = () => {
        AsyncStorage.setItem(ONBOARDED_KEY, "1").catch(() => {});
        setPhase("app");
    };

    return { phase, finishOnboarding };
};
