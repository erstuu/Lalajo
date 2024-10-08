import React from "react";
import { View, Text } from "react-native";
import { white } from "../helper/Color";

const MovieTitle = ({ title }) => {
    return (
        <View>
            <Text style={{ fontSize: 24, color: white }}>{title}</Text>
            <View style={{ width: 30, height: 5, backgroundColor: white, marginTop: 4, marginBottom: 8 }} />
        </View>
    );
};

export default MovieTitle;
