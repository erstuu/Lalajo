import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './store/configureStore';

// screen
import SearchScreen from './screens/SearchScreen';
import MovieScreen from './screens/MovieScreen';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailScreen from "./screens/MovieDetailScreen";
import TvScreen from './screens/TvScreen';
import WebViewScreen from "./screens/WebViewScreen";

// Screen Name
const movies = 'Movies';
const movieList = 'MovieList';
const movieDetail = 'MovieDetail';
const webview = 'Webview';
const tvShows = 'TVShows';
const tabStack = "bottomTab"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName={movies}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === movies) {
                        iconName = focused ? 'laptop' : 'laptop-outline';
                    } else if (route.name === tvShows) {
                        iconName = focused ? 'tv' : 'tv-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10
                },
                tabBarStyle: {
                    padding: 10,
                    height: 60
                },
                headerShown: false
            })}
        >
            <Tab.Screen name={movies} component={MovieScreen} />
            <Tab.Screen name={tvShows} component={TvScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={tabStack}
                    screenOptions={{
                        headerShown: false
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
                    <Stack.Screen name={webview} component={WebViewScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}