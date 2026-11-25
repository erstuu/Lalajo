import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from "./store/configureStore";
import AppNavigator from "./navigation/AppNavigator";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { useOnboardingGate } from "./hooks/useOnboardingGate";

// Root aplikasi: tampilkan gerbang splash/onboarding, lalu navigator utama.
export default function App() {
    const { phase, finishOnboarding } = useOnboardingGate();

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                {phase === "app" ? (
                    <AppNavigator />
                ) : phase === "splash" ? (
                    <SplashScreen />
                ) : (
                    <OnboardingScreen onDone={finishOnboarding} />
                )}
            </SafeAreaProvider>
        </Provider>
    );
}
