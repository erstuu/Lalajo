import React from "react";
import { WebView as Webview } from "react-native-webview";
import Screen from "../components/Screen";

const WebViewScreen = ({ route }) => {
    const { id } = route.params;
    const url = `https://www.youtube.com/watch?v=${id}`;
    return (
        <Screen>
            <Webview source={{ uri: url }} />
        </Screen>
    );
};

export default WebViewScreen;

