import MovieScreen from "../screens/MovieScreen";
import TvScreen from "../screens/TvScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import DiscoverScreen from "../screens/DiscoverScreen";

// Satu daftar untuk urutan tab di floating bar sekaligus urutan halaman pager;
// entri dengan `search` hanya aksi dan tidak menambah halaman.
export const TABS = [
    { label: "Movies", icon: "film", outline: "film-outline", component: MovieScreen, type: "movie" },
    { label: "TV", icon: "tv", outline: "tv-outline", component: TvScreen, type: "tv" },
    { search: true },
    { label: "Watchlist", icon: "bookmark", outline: "bookmark-outline", component: WatchlistScreen },
    { label: "Discover", icon: "compass", outline: "compass-outline", component: DiscoverScreen },
];

export const PAGES = TABS.filter((tab) => tab.component);
