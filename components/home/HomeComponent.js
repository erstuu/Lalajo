import React, { useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, RefreshControl } from "react-native";
import { StatusBar } from 'expo-status-bar';

// Components
import Screen from "../Screen";
import MoviesRow from "./MoviesRow";
import MovieHeader from "./MovieHeader";

// Helper
import { normalize } from "../helper/FontSize";
import { orange } from "../helper/Color";

const Title = ({type}) => {

    const title = type === "tv" ? "Lajo TV" : "Lalajo";
    return (
        <View>
            <Text style={Styles.screenTitle}>{title}</Text>
            <View style={Styles.titleBar} />
        </View>
    );
};

const Container = ({data, subTitle, type}) => {
    const movieTypesData = [
        { id: "popular", title: subTitle[0], data: data.popular },
        { id: "topRated", title: subTitle[1], data: data.topRated },
        { id: "mustWatch", title: subTitle[2], data: data.mustWatch },
        { id: "upcoming", title: subTitle[3], data: data.upcoming },
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Title type={type} />
            {movieTypesData.map(({ id, title, data }, index) => (
                <MoviesRow key={index} id={id} title={title} type={"movie"} data={data} />
            ))}
        </ScrollView>
    );
};

const HomeComponent = ({data, subTitle, type}) => {
    return(
        <Screen>
            <StatusBar style="dark-content" />
            <MovieHeader type={type} />
            <Container data={data} subTitle={subTitle} type={type}/>
        </Screen>
    );
};

export default HomeComponent;

const Styles = StyleSheet.create({
    screenTitle: {
        fontSize: normalize(30),
        fontWeight: "bold",
        margin: 16,
        marginBottom: 0,
    },

    titleBar: {
        width: 30,
        height: 5,
        backgroundColor: orange,
        marginTop: 2,
        marginBottom: 12,
        marginLeft: 16,
    },
});