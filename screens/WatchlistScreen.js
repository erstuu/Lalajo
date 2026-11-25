import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreenContainer from "../components/ScreenContainer";
import { getImageUrl } from "../service/url";
import { getWatchlist } from "../service/watchlist";
import { colors, radius, spacing, type as typeScale } from "../theme";

// Daftar judul yang disimpan; dimuat ulang tiap layar kembali difokuskan.
const WatchlistScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [items, setItems] = useState([]);

    useFocusEffect(
        useCallback(() => {
            let alive = true;
            getWatchlist().then((list) => {
                if (alive) setItems(list);
            });
            return () => {
                alive = false;
            };
        }, [])
    );

    return (
        <ScreenContainer>
            <View style={styles.header}>
                <Text style={styles.largeTitle}>Watchlist</Text>
            </View>
            {items.length === 0 ? (
                <View style={styles.empty}>
                    <Ionicons name="bookmark-outline" size={40} color={colors.labelTertiary} />
                    <Text style={styles.emptyTitle}>Belum ada yang disimpan</Text>
                    <Text style={styles.emptyBody}>
                        Ketuk ikon bookmark di film atau serial untuk menyimpannya di sini.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => `${item.media}:${item.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.list,
                        { paddingBottom: insets.bottom + 100 },
                    ]}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate(
                                    item.media === "tv" ? "TVDetail" : "MovieDetail",
                                    { id: item.id }
                                )
                            }
                            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                            accessibilityRole="button"
                            accessibilityLabel={item.title}
                        >
                            <Image
                                source={
                                    item.poster_path
                                        ? getImageUrl(item.poster_path, "uri", "w200")
                                        : null
                                }
                                style={styles.poster}
                                resizeMode="cover"
                            />
                            <View style={styles.info}>
                                <Text style={styles.media}>
                                    {item.media === "tv" ? "SERIES" : "MOVIE"}
                                </Text>
                                <Text style={styles.title} numberOfLines={2}>
                                    {item.title}
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={colors.labelTertiary}
                            />
                        </Pressable>
                    )}
                />
            )}
        </ScreenContainer>
    );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },

    largeTitle: {
        ...typeScale.largeTitle,
    },

    list: {
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    rowPressed: {
        opacity: 0.7,
    },

    poster: {
        width: 62,
        height: 92,
        borderRadius: radius.sm,
        backgroundColor: colors.card,
    },

    info: {
        flex: 1,
    },

    media: {
        fontSize: 10,
        fontWeight: "600",
        letterSpacing: 1.5,
        color: colors.labelSecondary,
    },

    title: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "600",
        color: colors.label,
    },

    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xxl,
        paddingBottom: 80,
    },

    emptyTitle: {
        marginTop: spacing.md,
        fontSize: 17,
        fontWeight: "600",
        color: colors.label,
    },

    emptyBody: {
        marginTop: spacing.sm,
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        color: colors.labelSecondary,
    },
});
