import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Component
import MoviePoster from "../MoviePoster";

// Helper
import { orange } from "../helper/Color";
import { normalize } from "../helper/FontSize";

const MoviesRow = ({ id, title, type, data }) => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={Styles.text}>{title}</Text>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("MovieList", { id, title, type })}
                >
                    <Text style={Styles.textMore}>More</Text>
                </TouchableWithoutFeedback>
            </View>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => <MoviePoster item={item} type={type} />}
                style={{ margin: 8, marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default MoviesRow;

const Styles = StyleSheet.create({
    text: {
        fontSize: normalize(18),
        fontWeight: "bold",
        margin: 16,
        marginBottom: 0,
    },

    textMore: {
        fontSize: normalize(13),
        margin: 16,
        marginBottom: 0,
        alignSelf: "flex-end",
        color: orange,
    },
});