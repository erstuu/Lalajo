import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";

const ScreenContainer = ({ children }) => {
    return (
        <View style={styles.root}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
                {children}
            </SafeAreaView>
        </View>
    );
};

export default ScreenContainer;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.surface,
    },

    safe: {
        flex: 1,
    },
});
