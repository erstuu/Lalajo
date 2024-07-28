import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { black } from "../helper/Color";
import {useNavigation} from "@react-navigation/native";

const BackIcon = ({ style }) => {
    const navigation = useNavigation();

    return (
        <View style={style}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back"} size={32} color={black} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default BackIcon;

