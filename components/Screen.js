import React from "react";
import {StatusBar, View, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import { white } from "./helper/Color";

const Container = ({ children }) => {
    return (
        <SafeAreaView style={_styles.container}>
            {children}
        </SafeAreaView>
    );
};

const Screen = ({ children }) => {
    return (
        <View style={{ flex: 1, backgroundColor: white }}>
            <StatusBar barStyle="dark-content" />
            <Container>
                {children}
            </Container>
        </View>
    );
};

export default Screen;

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        marginTop: StatusBar.currentHeight,
    },
});