import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import BackIcon from "../components/utils/BackIcon";
import { orange } from "../components/helper/Color";
import {useDispatch, useSelector} from "react-redux";
import Screen from "../components/Screen";
import {fetchFunctionList, selectAllMovies} from "../store/features/movieSlice";
import MovieList from "../components/MovieList";

const RenderTitle = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { title, type } = route.params;

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 24 }}>
                <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
                <Text style={_styles.headerTitle}>{`${title} ${type === "tv" ? "TV Show" : "Movies"}`}</Text>
                <View style={{ flex: 1, paddingRight: 12 }}></View>
            </View>
            <View style={_styles.titleBar} />
        </View>
    );
};

const MovieListScreen = () => {
    const route = useRoute();
    const { title, type, id } = route.params;
    const dispatch = useDispatch()

    // Store
    const movies =  useSelector(selectAllMovies);
    const [page, setPage] = useState(1);

    const onReachEnd = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        dispatch(fetchFunctionList({type, title, page}));
    }, [dispatch, type, title, page]);

    return (
        <Screen>
            <RenderTitle />
             <MovieList data={movies[id]} type={type} id={id} onReachEnd={onReachEnd}/>
        </Screen>
    );
};

export default MovieListScreen;

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
});