import { useRef, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import FloatingTabBar from "../components/ui/FloatingTabBar";
import { PAGES } from "./tabs";
import { routes } from "./routes";

// Pager utama memakai urutan PAGES, dengan floating bar yang membaca daftar yang sama.
const MainTabs = () => {
    const navigation = useNavigation();
    const pager = useRef(null);
    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <PagerView
                ref={pager}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
                onPageSelected={(e) => setIndex(e.nativeEvent.position)}
            >
                {PAGES.map(({ label, component: Page }) => (
                    <View key={label} style={{ flex: 1 }}>
                        <Page />
                    </View>
                ))}
            </PagerView>
            <FloatingTabBar
                index={index}
                onSelect={(i) => pager.current?.setPage(i)}
                onSearch={() =>
                    navigation.navigate(routes.search, { type: PAGES[index]?.type || "movie" })
                }
            />
        </View>
    );
};

export default MainTabs;
