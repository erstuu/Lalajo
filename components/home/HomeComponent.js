import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import ScreenContainer from "../ScreenContainer";
import MediaRow from "./MediaRow";
import HeroCarousel from "./HeroCarousel";

// Helper
import { spacing, type as typeScale } from "../../theme";

const HomeComponent = ({ data, subTitle, type, title = "Lalajo" }) => {
    const insets = useSafeAreaInsets();
    const bottomSpace = insets.bottom + 66; // pill (78 dari bawah) + jarak, dikurangi margin baris (24)
    const shelves = [
        { id: "popular", title: subTitle[0] },
        { id: "topRated", title: subTitle[1] },
        { id: "mustWatch", title: subTitle[2] },
        { id: type === "tv" ? "onTheAir" : "upcoming", title: subTitle[3] },
    ];

    return (
        <ScreenContainer>
            <StatusBar style="light" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: bottomSpace }}
            >
                <View style={styles.header}>
                    <Text style={styles.largeTitle}>{title}</Text>
                </View>
                <HeroCarousel items={data.nowPlaying || data.popular} type={type} />
                <View style={styles.shelves}>
                    {shelves.map(({ id, title }) => (
                        <MediaRow key={id} id={id} title={title} type={type} data={data[id]} />
                    ))}
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default HomeComponent;

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },

    largeTitle: {
        ...typeScale.largeTitle,
    },

    shelves: {
        paddingLeft: spacing.md,
        marginTop: spacing.xl,
    },
});
