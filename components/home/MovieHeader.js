import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import MenuIcon from "../../assets/open-menu.png";
import {black} from "../helper/Color";

const Header = () => {
    return(
        <TouchableWithoutFeedback>
            <Image source={MenuIcon} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
    );
}

const SearchIcon = ({type}) => {
    const navigation = useNavigation();
    return(
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Search", { type: type })}
        >
            <Ionicons name="search-outline" size={25} color={black} />
        </TouchableWithoutFeedback>
    );
}

const MovieHeader = ({type}) => {
    return(
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <Header />
            <SearchIcon type={type}/>
        </View>
    );
}

export default MovieHeader;


