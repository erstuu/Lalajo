import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, StyleSheet, TouchableWithoutFeedback, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { orange, white } from "../helper/Color";

const MoviePlayButton = ({ videoData, navigation }) => {
    const [isModalShown, setIsModalShown] = useState(false);

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const RenderPlayButton = () => {
        return (
            <TouchableWithoutFeedback onPress={toggleModal}>
                <View style={_styles.wrapper}>
                    <Icon name={"play"} size={30} color={white} style={_styles.icon} />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const onPressPlay = (key) => {
        toggleModal();
        navigation.navigate("Webview", { id: key });
    };

    const videoItem = () => {
        const results = videoData.results.slice(0, 7);
        return results.map((item) => (
            <View key={item.key} style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "80%" }}>
                    <Text style={{ fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ fontSize: 12 }}>{item.type}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => onPressPlay(item.key)}>
                    <View style={{ alignSelf: "flex-start", borderRadius: 6, overflow: "hidden" }}>
                        <Text style={_styles.playText}>Play</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        ));
    };

    const RenderModal = () => {
        const { results = [] } = videoData;

        if (isModalShown && results.length !== 0) {
            return (
                <Modal
                    isVisible={isModalShown}
                    style={{ justifyContent: "flex-end", margin: 0 }}
                    swipeDirection={"down"}
                    onBackButtonPress={toggleModal}
                    onBackdropPress={toggleModal}
                    onSwipeComplete={toggleModal}
                    deviceWidth={Dimensions.get('window').width}
                    deviceHeight={Dimensions.get('window').height}
                    scrollOffsetMax={400}
                    supportedOrientations={['portrait', 'landscape']}
                    onModalHide={() => console.log('Modal has been hidden.')}
                    backdropOpacity={0.7}
                    propagateSwipe={true}
                    avoidKeyboard={true}
                    panResponderThreshold={10}
                    animationOut="slideOutDown"
                    swipeThreshold={100}
                    onModalShow={() => console.log('Modal is shown.')}
                    hasBackdrop={true}
                    animationIn="slideInUp"
                    useNativeDriver={true}
                    scrollOffset={0}
                    onModalWillShow={() => console.log('Modal will show.')}
                    onModalWillHide={() => console.log('Modal will hide.')}
                >
                    <View style={_styles.modalStyle}>
                        <View style={_styles.bar} />
                        <Text style={_styles.videoText}>Videos</Text>
                        {videoItem()}
                    </View>
                </Modal>
            );
        }
    };

    return (
        <View>
            <RenderPlayButton />
            <RenderModal />
        </View>
    );
};

export default MoviePlayButton;

const _styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        right: 0,
        top: -790,
        marginRight: 15,
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: orange,
        justifyContent: "center",
    },

    icon: {
        alignSelf: "center",
    },

    modalStyle: {
        backgroundColor: white,
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 48,
        minHeight: "40%",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },

    bar: {
        width: 40,
        height: 5,
        backgroundColor: orange,
        marginBottom: 24,
        borderRadius: 2,
        alignSelf: "center",
        marginTop: 8,
    },

    playText: {
        textAlign: "right",
        backgroundColor: orange,
        color: white,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    videoText: {
        fontSize: 18,
        paddingBottom: 12,
    },
});