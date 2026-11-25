import React from "react";
import { Dimensions, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../theme";

const { width } = Dimensions.get("window");
const PLAYER_HEIGHT = ((width - 32) * 9) / 16;

export const pickVideos = (videoData) =>
    (videoData?.results || []).filter((v) => v.site === "YouTube");

// Tombol play; state pemutar dimiliki screen agar player bisa tampil di area hero
const TrailerPlayButton = ({ videoData, onPlay }) => {
    const videos = pickVideos(videoData);

    if (videos.length === 0) {
        return (
            <View style={[styles.playButton, styles.disabled]}>
                <Icon name="play" size={16} color={colors.black} />
                <Text style={styles.playLabel}>No Trailer</Text>
            </View>
        );
    }

    const primary = videos.find((v) => v.type === "Trailer") || videos[0];

    return (
        <Pressable
            onPress={() => onPlay(primary.key)}
            style={({ pressed }) => [styles.playButton, pressed && { opacity: 0.8 }]}
        >
            <Icon name="play" size={16} color={colors.black} />
            <Text style={styles.playLabel}>Play Trailer</Text>
        </Pressable>
    );
};

// Overlay yang menutupi area hero saat trailer diputar
export const TrailerVideo = ({ videoData, activeKey, onClose, onSelect, heroHeight }) => {
    const videos = pickVideos(videoData);
    const [failed, setFailed] = React.useState(false);

    return (
        <View style={[styles.overlay, { height: heroHeight }]}>
            {failed ? (
                <View style={styles.fallback}>
                    <Text style={styles.fallbackText}>Video can't be played here.</Text>
                    <Pressable
                        onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${activeKey}`)}
                        style={styles.fallbackButton}
                    >
                        <Text style={styles.fallbackButtonText}>Open in YouTube</Text>
                    </Pressable>
                </View>
            ) : (
                <YoutubeIframe
                    videoId={activeKey}
                    height={PLAYER_HEIGHT}
                    width={width - 32}
                    play={true}
                    onError={() => setFailed(true)}
                    webViewProps={{
                        mediaPlaybackRequiresUserAction: false,
                        allowsFullscreenVideo: true,
                        javaScriptEnabled: true,
                    }}
                />
            )}
            <Pressable
                onPress={onClose}
                style={styles.close}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Close trailer"
            >
                <Icon name="close" size={18} color={colors.label} />
            </Pressable>
            {videos.length > 1 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
                    {videos.slice(0, 7).map((v) => (
                        <Pressable
                            key={v.key}
                            onPress={() => onSelect(v.key)}
                            style={[styles.chip, activeKey === v.key && styles.chipActive]}
                        >
                            <Text
                                numberOfLines={1}
                                style={[styles.chipText, activeKey === v.key && styles.chipTextActive]}
                            >
                                {v.name}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export { TrailerPlayButton as default, TrailerPlayButton };

const styles = StyleSheet.create({
    playButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.accent,
        borderRadius: 999,
        paddingVertical: 13,
        marginTop: 16,
    },

    disabled: {
        opacity: 0.4,
    },

    playLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.black,
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5,
    },

    close: {
        position: "absolute",
        top: 52,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6,
    },

    chips: {
        position: "absolute",
        bottom: 12,
        left: 16,
        right: 0,
    },

    fallback: {
        alignItems: "center",
        gap: 12,
    },

    fallbackText: {
        fontSize: 14,
        color: colors.labelSecondary,
    },

    fallbackButton: {
        backgroundColor: colors.accent,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    fallbackButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.black,
    },

    chip: {
        backgroundColor: "rgba(28, 28, 30, 0.9)",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        maxWidth: 200,
    },

    chipActive: {
        backgroundColor: colors.accent,
    },

    chipText: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.labelSecondary,
    },

    chipTextActive: {
        color: colors.black,
    },
});
