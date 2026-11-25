import { useEffect, useState } from "react";
import { isSaved, toggleSaved } from "../service/watchlist";

// Status simpan satu judul di watchlist, plus aksi toggle-nya.
export const useWatchlist = (item) => {
    const { media, id } = item;
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        let alive = true;
        isSaved({ media, id })
            .then((value) => {
                if (alive) setSaved(value);
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, [media, id]);

    const onToggle = () => toggleSaved(item).then(setSaved).catch(() => {});

    return { saved, onToggle };
};
