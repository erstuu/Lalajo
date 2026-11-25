import React, { useEffect, useRef, useState } from 'react';
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import PagerView from "react-native-pager-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from './store/configureStore';

import { colors } from "./theme";
import FloatingTabBar from "./components/ui/FloatingTabBar";

// screen
import SearchScreen from './screens/SearchScreen';
import MovieScreen from './screens/MovieScreen';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailScreen from "./screens/MovieDetailScreen";
import TvDetailScreen from "./screens/TvDetailScreen";
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { PAGES } from "./navigation/tabs";

const ONBOARDED_KEY = "lalajo:onboarded:v2";

// Screen Name
const movies = 'Movies';
const movieList = 'MovieList';
const movieDetail = 'MovieDetail';
const tabStack = "bottomTab"

const Stack = createStackNavigator();

// Pager utama: Movies, TV, Watchlist, Discover; floating bar duduk di atasnya.
function BottomTab() {
    const navigation = useNavigation();
    const pager = useRef(null);
    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <PagerView
                ref={pager}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
                onPageSelected={(e) => setIndex(e.nativeEvent.position)}
            >
                {PAGES.map(({ label, component: Page }) => (
                    <View key={label} style={{ flex: 1 }}>
                        <Page />
                    </View>
                ))}
            </PagerView>
            <FloatingTabBar
                index={index}
                onSelect={(i) => pager.current?.setPage(i)}
                onSearch={() =>
                    navigation.navigate("Search", { type: PAGES[index]?.type || "movie" })
                }
            />
        </View>
    );
}

export default function App() {
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

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                {phase === "app" ? (
                    <NavigationContainer theme={{
                    dark: true,
                    colors: {
                        background: colors.surface,
                        card: colors.surface,
                        text: colors.label,
                        border: colors.separator,
                        primary: colors.accent,
                        notification: colors.accent,
                    },
                }}>
                    <Stack.Navigator
                        initialRouteName={tabStack}
                        screenOptions={{
                            headerShown: false,
                            cardStyle: { backgroundColor: colors.surface },
                        }}>
                        <Stack.Screen
                            name="Search"
                            component={SearchScreen}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                                gestureDirection: "vertical",
                            }} />
                        <Stack.Screen name={tabStack} component={BottomTab} />
                        <Stack.Screen name={movies} component={MovieScreen} />
                        <Stack.Screen name={movieList} component={MovieListScreen} />
                        <Stack.Screen name={movieDetail} component={MovieDetailScreen} />
                        <Stack.Screen name="TvDetail" component={TvDetailScreen} />
                    </Stack.Navigator>
                    </NavigationContainer>
                ) : phase === "splash" ? (
                    <SplashScreen />
                ) : (
                    <OnboardingScreen onDone={finishOnboarding} />
                )}
            </SafeAreaProvider>
        </Provider>
    );
}
