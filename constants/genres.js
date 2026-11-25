// Nama genre TMDB berdasarkan id, dipakai untuk menerjemahkan genre_ids dari API.
export const genres = {
    "12": { name: "Adventure" },
    "14": { name: "Fantasy" },
    "16": { name: "Animation" },
    "18": { name: "Drama" },
    "27": { name: "Horror" },
    "28": { name: "Action" },
    "35": { name: "Comedy" },
    "36": { name: "History" },
    "37": { name: "Western" },
    "53": { name: "Thriller" },
    "80": { name: "Crime" },
    "99": { name: "Documentary" },
    "878": { name: "Science Fiction" },
    "9648": { name: "Mystery" },
    "10402": { name: "Music" },
    "10749": { name: "Romance" },
    "10751": { name: "Family" },
    "10752": { name: "War" },
    "10770": { name: "TV Movie" },
    "10759": { name: "Action & Adventure" },
    "10762": { name: "Kids" },
    "10763": { name: "News" },
    "10764": { name: "Reality" },
    "10765": { name: "Sci-Fi & Fantasy" },
    "10766": { name: "Soap" },
    "10767": { name: "Talk" },
    "10768": { name: "War & Politics" },
};

// Genre movie dan TV punya id berbeda di TMDB; labelnya menyesuaikan pilihan.
export const DISCOVER_GENRES = {
    movie: [
        ["Action", 28],
        ["Adventure", 12],
        ["Sci-Fi", 878],
        ["Drama", 18],
        ["Comedy", 35],
        ["Horror", 27],
        ["Romance", 10749],
        ["Thriller", 53],
    ],
    tv: [
        ["Action", 10759],
        ["Drama", 18],
        ["Comedy", 35],
        ["Crime", 80],
        ["Mystery", 9648],
        ["Sci-Fi", 10765],
        ["Western", 37],
        ["War", 10768],
    ],
};

// Label chip dekoratif di slide onboarding.
export const ONBOARDING_GENRES = ["Action", "Sci-Fi", "Adventure", "Drama"];
