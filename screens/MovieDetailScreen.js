import React, { useEffect } from "react";
import {View, StatusBar, ScrollView, StyleSheet, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {fetchMovieDetail} from "../store/features/movieDetailSlice";
import MovieBackdrop from "../components/movieDetail/MovieBackdrop";
import MovieRating from "../components/movieDetail/MovieRating";
import MovieTitle from "../components/movieDetail/MovieTitle";
import BackIcon from "../components/utils/BackIcon";

import MovieGenres from "../components/movieDetail/MovieGenres";
import MoviePlayButton from "../components/movieDetail/MoviePlayButton";
import MovieOverview from "../components/movieDetail/MovieOverview";
import MovieCast from "../components/movieDetail/MovieCast";
import MovieImages from "../components/movieDetail/MovieImages";
import MovieRecommendations from "../components/movieDetail/MovieRecommendations";
import {white, black} from "../components/helper/Color";


const MovieInfoGeneral = ({data}) => {
    return(
        <MovieBackdrop backdrop={data.backdrop_path}>
                <View>
                    <MovieTitle title={data.title} />
                    <MovieRating rating={data.vote_average} />
                </View>
        </MovieBackdrop>
    );
};

const MovieInfoDetail = ({data, navigation}) => {
    return (
        <View style={Styles.movieDetailWrapper}>
            <View style={Styles.movieDetail}>
                <View>
                    <MovieGenres genre={data.detail.genres} />
                    <MovieOverview overview={data.detail.overview} />
                    <MovieCast credit={data.credit} />
                    <MovieImages images={data.images} />
                    <MovieRecommendations recommendations={data.recommendations} navigation={navigation} />
                </View>
            </View>
            <MoviePlayButton videoData={data.videos} navigation={navigation} />
        </View>
    );
};

const MovieDetailScreen = ({route, navigation}) => {
    const {id} = route.params;
    // Redux
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movieDetail);
    // console.log(movie);

    useEffect(() => {
        dispatch(fetchMovieDetail({id}));
    }, [dispatch, id]);

    return (
        <View style={{ flex: 1, backgroundColor: white }}>
            <ScrollView style={Styles.scrollview} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <StatusBar translucent backgroundColor={"transparent"} />
                <MovieInfoGeneral data={movie.detail} />
                <MovieInfoDetail data={movie} navigation={navigation} />
            </ScrollView>
            <BackIcon navigation={navigation} style={{ marginLeft: 5, position: "absolute", top: 40 }} color={white} />
        </View>
    );
};

export default MovieDetailScreen;

const Styles = StyleSheet.create({
    scrollview: {
        backgroundColor: white,
        flexGrow: 1,
    },

    movieDetailWrapper: {
        flex: 1,
        backgroundColor: black,
    },

    movieDetail: {
        flex: 1,
        padding: 16,
        paddingTop: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: white,
    },
});