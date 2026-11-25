import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "lalajo:watchlist:v1";

// Daftar film dan serial yang disimpan pengguna.
export const getWatchlist = async () => {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const isSaved = async ({ media, id }) => {
    const list = await getWatchlist();
    return list.some((entry) => entry.media === media && entry.id === id);
};

// Menambah atau menghapus satu judul; mengembalikan status tersimpan yang baru.
export const toggleSaved = async (item) => {
    const list = await getWatchlist();
    const exists = list.some((entry) => entry.media === item.media && entry.id === item.id);
    const next = exists
        ? list.filter((entry) => !(entry.media === item.media && entry.id === item.id))
        : [item, ...list];

    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return !exists;
};
