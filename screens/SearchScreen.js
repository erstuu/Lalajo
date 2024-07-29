import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import { requestSearchMovie } from "../store/features/searchSlice";
import { orange, lightGray } from "../components/helper/Color";
import MovieList from "../components/MovieList";
import {selectMovieSearch} from "../store/features/searchSlice";

import Icon from "react-native-vector-icons/Ionicons";
import BackIcon from "../components/utils/BackIcon";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const RenderHeaderTitle = ({type}) => {
    const navigation = useNavigation();

    const title = type === "tv" ? "Lajo TV" : "Lalajo";

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 24 }}>
                <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
                <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
                <View style={{ flex: 1, paddingRight: 12 }}></View>
            </View>
            <View style={_styles.titleBar} />
            <Text style={_styles.subTitle}>
                {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
            </Text>
        </View>
    );
}

const RenderSearchText = () => {
    const dispatch = useDispatch();

    return (
        <View style={_styles.searchContainer}>
            <Icon name={"search"} size={20} style={{ margin: 12 }} />
            <View style={{ alignSelf: "center", flex: 1 }}>
                <TextInput
                    style={_styles.searchInput}
                    placeholder={"Avengers: End Game"}
                    onChangeText={(keyword) => dispatch(requestSearchMovie({keyword}))}
                    returnKeyType={"search"}
                    autoCorrect={false}
                />
            </View>
        </View>
    );
};

const RenderListMovies = ({type}) => {
    const state =  useSelector(selectMovieSearch);

    return <MovieList data={state} type={type} />;
};

const renderMovies = () => {
    return state
};

const SearchScreen = () => {
    const route = useRoute();
    const { type } = route.params;

    return(
        <Screen>
            <RenderHeaderTitle />
            <RenderSearchText />
            <RenderListMovies type={type}/>
        </Screen>
    );
};

export default SearchScreen;

const _styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        flex: 8,
        textAlign: "center",
        alignSelf: "center",
    },

    titleBar: {
        width: 40,
        height: 5,
        backgroundColor: orange,
        marginTop: 4,
        marginBottom: 12,
        alignSelf: "center",
    },

    subTitle: {
        margin: 16,
        marginTop: 5,
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        width: "70%",
    },

    searchContainer: {
        marginHorizontal: 16,
        backgroundColor: lightGray,
        borderRadius: 24,
        flexDirection: "row",
    },

    searchInput: {
        fontSize: 14,
        flex: 1,
        marginRight: 12,
    },
});