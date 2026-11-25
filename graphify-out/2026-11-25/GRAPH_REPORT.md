# Graph Report - Lalajo  (2026-11-25)

## Corpus Check
- 60 files · ~13,833 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: (none) 1)

## Summary
- 279 nodes · 797 edges · 27 communities (10 shown, 17 thin omitted)
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
- react-native-ionicons@^4.6.5
- react-native-pager-view
- React Native Web
- react-native-webview@13.8.6
- react-native-youtube-iframe

## God Nodes (most connected - your core abstractions)
1. `react-native` - 42 edges
2. `react` - 37 edges
3. `getImageUrl()` - 25 edges
4. `colors` - 25 edges
5. `TVDetailScreen()` - 17 edges
6. `MovieDetailScreen()` - 16 edges
7. `@react-navigation/native` - 15 edges
8. `onboarding` - 14 edges
9. `react-native-vector-icons` - 12 edges
10. `spacing` - 12 edges

## Surprising Connections (you probably didn't know these)
- `BottomTab()` --calls--> `DiscoverScreen()`  [EXTRACTED]
  App.js → screens/DiscoverScreen.js
- `MoviePosterAndInfo()` --calls--> `getImageUrl()`  [EXTRACTED]
  components/MoviePosterAndInfo.js → service/url.js
- `MovieDetailScreen()` --calls--> `SaveButton()`  [EXTRACTED]
  screens/MovieDetailScreen.js → components/movieDetail/SaveButton.js
- `TVDetailScreen()` --calls--> `SaveButton()`  [EXTRACTED]
  screens/TVDetailScreen.js → components/movieDetail/SaveButton.js
- `Visual()` --calls--> `GenreChips()`  [EXTRACTED]
  screens/OnboardingScreen.js → components/onboarding/GenreChips.js

## Import Cycles
- None detected.

## Communities (27 total, 17 thin omitted)

### Community 0 - "Onboarding & Branding"
Cohesion: 0.09
Nodes (34): App(), GradientText(), LogoMark(), OnboardingHeader(), styles, PaginationDots(), styles, FALLBACK_POSTERS (+26 more)

### Community 1 - "Movie & TV Details"
Cohesion: 0.15
Nodes (24): HeroCarousel(), MoviesRow(), MovieBackdrop(), Cast(), MovieCast(), MovieGenres(), MovieImages(), MovieOverview() (+16 more)

### Community 2 - "Home Screen Layout"
Cohesion: 0.13
Nodes (27): BottomTab(), Stack, HomeComponent(), MovieList(), styles, genreText(), GridSkeleton(), MoviePosterAndInfo() (+19 more)

### Community 3 - "react-native"
Cohesion: 0.13
Nodes (30): styles, { width }, styles, styles, HERO_HEIGHT, styles, { width }, styles (+22 more)

### Community 4 - "Expo App Config"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, backgroundColor, barStyle, expo, android, androidNavigationBar (+14 more)

### Community 5 - "Redux Store & TMDB API"
Cohesion: 0.12
Nodes (17): @reduxjs/toolkit@^2.2.6, @reduxjs/toolkit, api, fetchDetailBundle(), fetchDiscover(), MOVIE_PATHS, searchMedia(), TV_PATHS (+9 more)

### Community 6 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, expo-linear-gradient@~13.0.2, react@18.2.0, react-native@0.74.3, @react-native-masked-view/masked-view@0.3.1, react-native-svg@15.2.0, @react-navigation/native@^6.1.18, @react-navigation/stack@^6.4.1 (+2 more)

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
  _Cohesion score 0.08788159111933395 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react-native` to `Onboarding & Branding`, `Movie & TV Details`, `Home Screen Layout`, `dependencies`, `Package Metadata`, `DiscoverScreen.js`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `Home Screen Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.13277310924369748 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `Onboarding & Branding`, `Home Screen Layout`, `Redux Store & TMDB API`, `Package Metadata`, `Axios Dependency`, `Expo Core`, `Blur Effect Library`, `Font Loading`, `Metro Runtime`, `Status Bar`, `React DOM Renderer`, `Async Storage`, `Fast Image`, `Image Zoom Viewer`, `Linear Gradient`, `react-native-ionicons@^4.6.5`, `react-native-pager-view`, `React Native Web`, `react-native-webview@13.8.6`, `react-native-youtube-iframe`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.1279220779220779 - nodes in this community are weakly interconnected._
- **Should `Expo App Config` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._