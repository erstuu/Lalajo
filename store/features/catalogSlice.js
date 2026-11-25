import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchList } from "../../service/tmdb";

// Must Watch memakai trending; judul yang sudah ada di Top Rated dibuang, dan
// halaman berikutnya diambil selama hasil uniknya belum mencapai 10.
export const fetchCategory = createAsyncThunk(
    "catalog/fetchCategory",
    async ({ media, category, page }, { getState }) => {
        if (category !== "mustWatch") {
            return fetchList({ media, category, page });
        }

        const topRated = getState().catalog.categories[`${media}:topRated`];
        const seen = new Set((topRated?.items || []).map((item) => item.id));
        const results = [];
        let data = await fetchList({ media, category, page });

        while (true) {
            data.results.forEach((item) => {
                if (seen.has(item.id)) return;
                seen.add(item.id);
                results.push(item);
            });
            if (results.length >= 10 || data.page >= data.total_pages) break;
            data = await fetchList({ media, category, page: data.page + 1 });
        }

        return { ...data, page, results };
    }
);

const newCategory = () => ({ items: [], page: 0, status: "idle", error: null });

// Movie dan TV memakai id kategori yang sama ("popular"), jadi cache dipisah per media
const keyOf = ({ media = "movie", category }) => `${media}:${category}`;

const catalogSlice = createSlice({
    name: "catalog",
    initialState: { categories: {} },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state, action) => {
                const key = keyOf(action.meta.arg);
                const cat = state.categories[key] || newCategory();
                cat.status = cat.page === 0 ? "loading" : "loadingMore";
                state.categories[key] = cat;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                const key = keyOf(action.meta.arg);
                const { page, results } = action.payload;
                const cat = state.categories[key] || newCategory();
                const seen = new Set(cat.items.map((i) => i.id));
                cat.items =
                    page > 1
                        ? [...cat.items, ...results.filter((r) => !seen.has(r.id))]
                        : results;
                cat.page = page;
                cat.status = "succeeded";
                state.categories[key] = cat;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                const key = keyOf(action.meta.arg);
                const cat = state.categories[key] || newCategory();
                cat.status = "failed";
                cat.error = action.error.message;
                state.categories[key] = cat;
            });
    },
});

export default catalogSlice.reducer;

export const selectCategory = (media, category) => (state) =>
    state.catalog.categories[`${media}:${category}`] ||
    { items: [], page: 0, status: "idle", error: null };
