import React, { useState } from "react";
import {View, Text, FlatList, Modal, TouchableWithoutFeedback, Image} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { getImageUrl } from "../../service/url";
import { Styles } from "./Styles";

const MovieImages = ({ images }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [imageModalIndex, setImageModalIndex] = useState(0);

    const imageList = images.backdrops;

    const onPressImage = (index = 0) => {
        setIsShowModal(!isShowModal);
        setImageModalIndex(index);
    };

    const modalImagesUrl = () => {
        return imageList.map((item) => {
            const imageurl = getImageUrl(item.file_path, "url", "original");
            return { ...imageurl, ...{ width: item.width, height: item.height } };
        });
    };

    const modalImage = () => {
        const imagefull = modalImagesUrl();

        return (
            <Modal visible={isShowModal} transparent={true}>
                <ImageViewer imageUrls={imagefull} onCancel={onPressImage} enableSwipeDown index={imageModalIndex} />
            </Modal>
        );
    };

    const imageComponent = (data, index) => {
        const imageUrl = getImageUrl(data.file_path, "uri", "w300");
        const style = { ...Styles.movieImages, ...{ width: 100 * data.aspect_ratio } };

        return (
            <TouchableWithoutFeedback onPress={() => onPressImage(index)} style={[style, Styles.imagePlaceholder]}>
                <Image source={imageUrl} style={style} />
            </TouchableWithoutFeedback>
        );
    };

    if (!Array.isArray(imageList) || imageList.length === 0) return null;

    return (
        <View>
            <Text style={Styles.titleText}>Images</Text>
            <FlatList
                keyExtractor={(item) => item.file_path}
                data={imageList}
                renderItem={({ item, index }) => imageComponent(item, index)}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {modalImage()}
        </View>
    );
};

export default MovieImages;