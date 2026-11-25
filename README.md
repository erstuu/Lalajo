# Lalajo

Lalajo is a movie & TV show catalog app built with React Native (Expo). Browse what's playing, rate, and watch trailers — data powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

> "Lalajo" means *to watch* (Sundanese).

## Features

**Movies**
- Home: hero carousel (Now Playing) + shelves for Popular, Top Rated, Must Watch (highest rated with 500+ votes), Upcoming
- Movie detail: backdrop hero, rating, genres, overview, cast, image gallery with zoom, trailer playback (YouTube), recommendations
- "See All" lists with infinite scroll pagination
- Search movies with 300 ms debounce

**TV Shows**
- Home: hero (Popular) + shelves for Popular, Top Rated, Must Watch, On The Air
- TV detail with seasons list

**UI**
- Dark, Apple TV–inspired design system (see `theme.js`)
- Skeleton loaders, safe-area layout, pressable feedback

## Tech

- React Native 0.74 + Expo SDK 51
- Redux Toolkit (`catalogSlice`, `movieDetailSlice`, `searchSlice`)
- Axios (single instance in `service/api.js`)
- React Navigation (stack + bottom tabs)

## Project structure

```
├── App.js                  # Navigation (Stack + BottomTab), dark theme
├── theme.js                # Design tokens (colors, spacing, radius, type)
├── screens/                # MovieScreen, TvScreen, Movie/TVDetail, MovieList, Search, WebView
├── components/
│   ├── home/               # HomeComponent, HeroCarousel, MoviesRow
│   ├── movieDetail/        # Backdrop, Title, Rating, Genres, PlayButton, Cast, ...
│   ├── ui/                 # Skeleton
│   └── helper/             # Genres map
├── service/
│   ├── api.js              # Axios instance (TMDB base URL, API key from env)
│   ├── tmdb.js             # Endpoints: lists, detail bundle, search
│   └── url.js              # Image URL helper
└── store/
    ├── configureStore.js
    └── features/           # catalogSlice (per media+category cache), movieDetailSlice, searchSlice
```

## Getting started

```bash
npm install
```

Create a `.env` file in the project root (see `.gitignore` — it is not committed):

```
EXPO_PUBLIC_TMDB_KEY=<your TMDB API key>
```

Get a free key at https://www.themoviedb.org/settings/api.

Then run:

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app.

> **Note:** this project uses **Expo SDK 51**. The Play Store version of Expo Go targets newer SDKs — install the SDK 51 build of Expo Go from https://expo.dev/go.

## Known limitations / roadmap

- Season detail (episode list) not implemented yet
- Watchlist / favorites not implemented
- TMDB API key was previously committed in source — rotate your key if you forked early history
