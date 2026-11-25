import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreenContainer from "../components/ScreenContainer";
import GenreChips from "../components/ui/GenreChips";
import { fetchDiscoverPage, setFilter } from "../store/features/discoverSlice";
import { DISCOVER_GENRES } from "../constants/genres";
import { getImageUrl } from "../service/url";
import { colors, radius, spacing, type as typeScale } from "../theme";

// Jelajah poster per genre dengan filter Movies/TV dan scroll bertahap.
const DiscoverScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { media, genreIndex, items, page, status, loadingMore } = useSelector(
        (state) => state.discover
    );

    const genres = DISCOVER_GENRES[media];
    const genre = genres[genreIndex][1];

    useEffect(() => {
        dispatch(fetchDiscoverPage({ media, genreIndex, genreId: genre, page: 1 }));
    }, [dispatch, media, genreIndex, genre]);

    const loadMore = () => {
        dispatch(fetchDiscoverPage({ media, genreIndex, genreId: genre, page: page + 1 }));
    };

    const openDetail = (item) => {
        navigation.navigate(media === "tv" ? "TvDetail" : "MovieDetail", { id: item.id });
    };

    const renderItem = ({ item }) => (
        <Pressable
            onPress={() => openDetail(item)}
            style={styles.card}
            accessibilityRole="button"
            accessibilityLabel={item.title || item.name}
        >
            <Image
                source={item.poster_path ? getImageUrl(item.poster_path, "uri", "w342") : null}
                style={styles.poster}
                resizeMode="cover"
            />
            <Text style={styles.title} numberOfLines={1}>
                {item.title || item.name}
            </Text>
            <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color={colors.star} />
                <Text style={styles.rating}>
                    {Number(item.vote_average || 0).toFixed(1)}
                </Text>
            </View>
        </Pressable>
    );

    return (
        <ScreenContainer>
            <View style={styles.header}>
                <Text style={styles.largeTitle}>Discover</Text>
            </View>
            <View style={styles.toggle}>
                {["movie", "tv"].map((option) => {
                    const selected = media === option;
                    return (
                        <Pressable
                            key={option}
                            onPress={() => dispatch(setFilter({ media: option, genreIndex: 0 }))}
                            style={[styles.toggleItem, selected && styles.toggleItemActive]}
                            accessibilityRole="button"
                            accessibilityState={{ selected }}
                        >
                            <Text style={[styles.toggleLabel, selected && styles.toggleLabelActive]}>
                                {option === "movie" ? "Movies" : "TV"}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            <View style={styles.chips}>
                <GenreChips
                    genres={genres}
                    activeIndex={genreIndex}
                    onSelect={(i) => dispatch(setFilter({ media, genreIndex: i }))}
                />
            </View>

            {status === "idle" || status === "loading" ? (
                <View style={styles.center}>
                    <ActivityIndicator color={colors.accent} />
                </View>
            ) : status === "failed" ? (
                <View style={styles.center}>
                    <Ionicons name="cloud-offline-outline" size={34} color={colors.labelTertiary} />
                    <Text style={styles.stateTitle}>Gagal memuat data</Text>
                    <Pressable
                        onPress={() =>
                            dispatch(
                                fetchDiscoverPage({ media, genreIndex, genreId: genre, page: 1 })
                            )
                        }
                        style={styles.retry}
                        accessibilityRole="button"
                    >
                        <Text style={styles.retryLabel}>Coba lagi</Text>
                    </Pressable>
                </View>
            ) : items.length === 0 ? (
                <View style={styles.center}>
                    <Ionicons name="film-outline" size={34} color={colors.labelTertiary} />
                    <Text style={styles.stateTitle}>Tidak ada hasil untuk genre ini</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    numColumns={2}
                    keyExtractor={(item) => String(item.id)}
                    columnWrapperStyle={styles.columns}
                    contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 100 }]}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    renderItem={renderItem}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator style={styles.more} color={colors.accent} />
                        ) : null
                    }
                />
            )}
        </ScreenContainer>
    );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },

    largeTitle: {
        ...typeScale.largeTitle,
    },

    toggle: {
        flexDirection: "row",
        alignSelf: "center",
        gap: spacing.xs,
        marginTop: spacing.lg,
        padding: 4,
        borderRadius: radius.xl,
        backgroundColor: colors.card,
    },

    toggleItem: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: radius.xl,
    },

    toggleItemActive: {
        backgroundColor: colors.accent,
    },

    toggleLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.labelSecondary,
    },

    toggleLabelActive: {
        color: colors.black,
    },

    chips: {
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
    },

    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xxl,
        paddingBottom: 80,
    },

    stateTitle: {
        marginTop: spacing.md,
        fontSize: 15,
        fontWeight: "600",
        color: colors.labelSecondary,
        textAlign: "center",
    },

    retry: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: radius.xl,
        backgroundColor: colors.accent,
    },

    retryLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.black,
    },

    list: {
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        gap: spacing.lg,
    },

    columns: {
        gap: spacing.md,
    },

    card: {
        flex: 1,
    },

    poster: {
        width: "100%",
        aspectRatio: 2 / 3,
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },

    title: {
        marginTop: spacing.sm,
        fontSize: 14,
        fontWeight: "600",
        color: colors.label,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },

    rating: {
        fontSize: 12,
        color: colors.labelSecondary,
    },

    more: {
        marginVertical: spacing.lg,
    },
});
