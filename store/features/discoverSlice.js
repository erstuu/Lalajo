import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDiscover } from "../../service/tmdb";

const initialState = {
    media: "movie",
    genreIndex: 0,
    items: [],
    page: 0,
    status: "idle",
    hasMore: true,
    loadingMore: false,
    request: 0,
};

// Halaman discover per filter; respons dari filter lama dibuang lewat nomor request.
export const fetchDiscoverPage = createAsyncThunk(
    "discover/fetchPage",
    async ({ media, genreId, page }, { getState }) => {
        const { request } = getState().discover;
        const data = await fetchDiscover({ media, genre: genreId, page });
        return { ...data, page, request };
    },
    {
        condition: ({ page }, { getState }) => {
            const { status, hasMore, loadingMore } = getState().discover;
            return page === 1
                ? status !== "loading"
                : status === "succeeded" && hasMore && !loadingMore;
        },
    }
);

const discoverSlice = createSlice({
    name: "discover",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            const { media, genreIndex } = action.payload;
            if (state.media === media && state.genreIndex === genreIndex) return;

            state.media = media;
            state.genreIndex = genreIndex;
            state.items = [];
            state.page = 0;
            state.status = "idle";
            state.hasMore = true;
            state.loadingMore = false;
            state.request += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscoverPage.pending, (state, action) => {
                const { media, genreIndex, page } = action.meta.arg;
                if (media !== state.media || genreIndex !== state.genreIndex) return;

                if (page === 1) {
                    state.status = "loading";
                    state.items = [];
                } else {
                    state.loadingMore = true;
                }
            })
            .addCase(fetchDiscoverPage.fulfilled, (state, action) => {
                const { results, page, total_pages, request } = action.payload;
                if (request !== state.request) return;

                state.items = page > 1 ? [...state.items, ...results] : results;
                state.page = page;
                state.hasMore = page < total_pages;
                state.status = "succeeded";
                state.loadingMore = false;
            })
            .addCase(fetchDiscoverPage.rejected, (state, action) => {
                const arg = action.meta.arg;
                if (!arg || arg.media !== state.media || arg.genreIndex !== state.genreIndex) {
                    return;
                }

                if (arg.page === 1) state.status = "failed";
                state.loadingMore = false;
            });
    },
});

export const { setFilter } = discoverSlice.actions;
export default discoverSlice.reducer;
