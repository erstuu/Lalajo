import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { colors } from "../theme";
import { routes } from "./routes";
import MainTabs from "./MainTabs";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import TvDetailScreen from "../screens/TvDetailScreen";

const Stack = createStackNavigator();

// Stack rute aplikasi; tab utama adalah layar awal.
const AppNavigator = () => (
    <NavigationContainer
        theme={{
            dark: true,
            colors: {
                background: colors.surface,
                card: colors.surface,
                text: colors.label,
                border: colors.separator,
                primary: colors.accent,
                notification: colors.accent,
            },
        }}
    >
        <Stack.Navigator
            initialRouteName={routes.tabs}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: colors.surface },
            }}
        >
            <Stack.Screen
                name={routes.search}
                component={SearchScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    gestureDirection: "vertical",
                }}
            />
            <Stack.Screen name={routes.tabs} component={MainTabs} />
            <Stack.Screen name={routes.movies} component={MovieScreen} />
            <Stack.Screen name={routes.movieList} component={MovieListScreen} />
            <Stack.Screen name={routes.movieDetail} component={MovieDetailScreen} />
            <Stack.Screen name={routes.tvDetail} component={TvDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
