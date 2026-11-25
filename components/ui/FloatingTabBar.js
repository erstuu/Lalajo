import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../../theme";
import { PAGES, TABS } from "../../navigation/tabs";

// Floating glass pill di atas pager; urutannya mengikuti daftar tab di navigation/tabs.
const FloatingTabBar = ({ index, onSelect, onSearch }) => {
    const insets = useSafeAreaInsets();

    const tab = (item) => {
        const page = PAGES.indexOf(item);
        const focused = index === page;
        return (
            <Pressable
                key={item.label}
                onPress={() => onSelect(page)}
                style={[styles.item, focused && styles.itemActive]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: focused }}
            >
                <Ionicons
                    name={focused ? item.icon : item.outline}
                    size={20}
                    color={focused ? colors.label : colors.labelSecondary}
                />
                {focused ? <Text style={styles.label}>{item.label}</Text> : null}
            </Pressable>
        );
    };

    return (
        <View pointerEvents="box-none" style={[styles.container, { bottom: insets.bottom + 14 }]}>
            <BlurView
                tint="dark"
                intensity={60}
                experimentalBlurMethod="dimezisBlurView"
                style={styles.pill}
            >
                {TABS.map((item) =>
                    item.search ? (
                        <Pressable
                            key="search"
                            onPress={onSearch}
                            style={styles.search}
                            accessibilityRole="button"
                            accessibilityLabel="Search"
                        >
                            <Ionicons name="search" size={20} color={colors.black} />
                        </Pressable>
                    ) : (
                        tab(item)
                    )
                )}
            </BlurView>
        </View>
    );
};

export default FloatingTabBar;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 100,
        elevation: 20,
        alignItems: "center",
    },

    pill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        padding: 6,
        borderRadius: radius.pill,
        overflow: "hidden",
        backgroundColor: "rgba(28, 28, 30, 0.75)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255, 255, 255, 0.18)",
        elevation: 12,
        shadowColor: colors.black,
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
    },

    item: {
        minWidth: 44,
        height: 52,
        borderRadius: radius.pill,
        alignItems: "center",
        justifyContent: "center",
    },

    itemActive: {
        flexDirection: "row",
        gap: 6,
        paddingHorizontal: 14,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },

    label: {
        fontSize: 10,
        fontWeight: "600",
        color: colors.label,
    },

    search: {
        width: 46,
        height: 46,
        borderRadius: radius.pill,
        marginHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accent,
    },
});
