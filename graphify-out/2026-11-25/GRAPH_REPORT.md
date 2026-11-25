# Graph Report - Lalajo  (2026-11-25)

## Corpus Check
- 60 files · ~13,869 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: (none) 1)

## Summary
- 279 nodes · 798 edges · 27 communities (10 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `560b496d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Onboarding & Branding
- Movie & TV Details
- Home Screen Layout
- react-native
- Expo App Config
- Redux Store & TMDB API
- dependencies
- Package Metadata
- NPM Scripts
- Axios Dependency
- Expo Core
- Blur Effect Library
- Font Loading
- Metro Runtime
- Status Bar
- React DOM Renderer
- Async Storage
- Fast Image
- Image Zoom Viewer
- Linear Gradient
- DiscoverScreen.js
- @react-navigation/stack
- react-native-pager-view
- React Native Web
- react-native-webview@13.8.6
- react-native-youtube-iframe

## God Nodes (most connected - your core abstractions)
1. `react-native` - 42 edges
2. `react` - 37 edges
3. `colors` - 25 edges
4. `getImageUrl()` - 25 edges
5. `TVDetailScreen()` - 17 edges
6. `MovieDetailScreen()` - 16 edges
7. `@react-navigation/native` - 15 edges
8. `onboarding` - 14 edges
9. `spacing` - 12 edges
10. `react-native-vector-icons` - 12 edges

## Surprising Connections (you probably didn't know these)
- `PosterCarousel()` --calls--> `getImageUrl()`  [EXTRACTED]
  components/onboarding/PosterCarousel.js → service/url.js
- `SavedCard()` --calls--> `getImageUrl()`  [EXTRACTED]
  components/onboarding/SavedCard.js → service/url.js
- `Visual()` --calls--> `GenreChips()`  [EXTRACTED]
  screens/OnboardingScreen.js → components/onboarding/GenreChips.js
- `MoviePoster()` --calls--> `getImageUrl()`  [EXTRACTED]
  components/MoviePoster.js → service/url.js
- `MovieDetailScreen()` --calls--> `BackIcon()`  [EXTRACTED]
  screens/MovieDetailScreen.js → components/utils/BackIcon.js

## Import Cycles
- None detected.

## Communities (27 total, 17 thin omitted)

### Community 0 - "Onboarding & Branding"
Cohesion: 0.09
Nodes (32): App(), GradientText(), LogoMark(), OnboardingHeader(), styles, PaginationDots(), styles, FALLBACK_POSTERS (+24 more)

### Community 1 - "Movie & TV Details"
Cohesion: 0.13
Nodes (28): HeroCarousel(), HERO_HEIGHT, MovieBackdrop(), styles, { width }, Cast(), MovieCast(), MovieGenres() (+20 more)

### Community 2 - "Home Screen Layout"
Cohesion: 0.13
Nodes (28): BottomTab(), Stack, HomeComponent(), MovieList(), styles, genreText(), GridSkeleton(), MoviePosterAndInfo() (+20 more)

### Community 3 - "react-native"
Cohesion: 0.14
Nodes (27): styles, { width }, styles, MoviesRow(), styles, styles, styles, styles (+19 more)

### Community 4 - "Expo App Config"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, backgroundColor, barStyle, expo, android, androidNavigationBar (+14 more)

### Community 5 - "Redux Store & TMDB API"
Cohesion: 0.13
Nodes (16): @reduxjs/toolkit@^2.2.6, @reduxjs/toolkit, api, fetchDetailBundle(), fetchDiscover(), MOVIE_PATHS, searchMedia(), TV_PATHS (+8 more)

### Community 6 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, expo-linear-gradient@~13.0.2, react@18.2.0, react-native@0.74.3, react-native-ionicons@^4.6.5, @react-native-masked-view/masked-view@0.3.1, react-native-svg@15.2.0, react-native-vector-icons@^10.1.0 (+3 more)

### Community 7 - "Package Metadata"
Cohesion: 0.22
Nodes (9): react-native-modal@^13.0.1, devDependencies, @babel/core@^7.20.0, main, name, private, version, @babel/core (+1 more)

### Community 8 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, android, ios, start, web

### Community 20 - "DiscoverScreen.js"
Cohesion: 0.27
Nodes (7): GenreChips(), styles, DISCOVER_GENRES, genres, ONBOARDING_GENRES, DiscoverScreen(), styles

## Knowledge Gaps
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `Onboarding & Branding`, `Movie & TV Details`, `Home Screen Layout`, `dependencies`, `Package Metadata`, `DiscoverScreen.js`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `Onboarding & Branding` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react-native` to `Onboarding & Branding`, `Movie & TV Details`, `Home Screen Layout`, `dependencies`, `Package Metadata`, `DiscoverScreen.js`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `Movie & TV Details` be split into smaller, more focused modules?**
  _Cohesion score 0.12762762762762764 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `Home Screen Layout`, `Redux Store & TMDB API`, `Package Metadata`, `Axios Dependency`, `Expo Core`, `Blur Effect Library`, `Font Loading`, `Metro Runtime`, `Status Bar`, `React DOM Renderer`, `Async Storage`, `Fast Image`, `Image Zoom Viewer`, `Linear Gradient`, `@react-navigation/stack`, `react-native-pager-view`, `React Native Web`, `react-native-webview@13.8.6`, `react-native-youtube-iframe`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Should `Home Screen Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.1414141414141414 - nodes in this community are weakly interconnected._