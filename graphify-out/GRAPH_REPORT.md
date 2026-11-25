# Graph Report - Lalajo  (2026-11-25)

## Corpus Check
- 67 files · ~14,246 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: (none) 1)

## Summary
- 293 nodes · 833 edges · 26 communities (11 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8751f6e6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Onboarding & Branding
- Movie & TV Details
- Home Screen Layout
- DiscoverScreen.js
- Expo App Config
- Redux Store & TMDB API
- dependencies
- Package Metadata
- NPM Scripts
- axios
- Expo Core
- Blur Effect Library
- Font Loading
- Metro Runtime
- useWatchlist.js
- React DOM Renderer
- Async Storage
- Fast Image
- Image Zoom Viewer
- Linear Gradient
- react-native-ionicons@^4.6.5
- @react-navigation/stack
- react-native-pager-view
- react-native-webview@13.8.6
- react-native-youtube-iframe

## God Nodes (most connected - your core abstractions)
1. `react-native` - 42 edges
2. `react` - 39 edges
3. `colors` - 25 edges
4. `getImageUrl()` - 23 edges
5. `TvDetailScreen()` - 18 edges
6. `MovieDetailScreen()` - 17 edges
7. `@react-navigation/native` - 15 edges
8. `onboarding` - 14 edges
9. `spacing` - 12 edges
10. `react-native-vector-icons` - 12 edges

## Surprising Connections (you probably didn't know these)
- `MovieListScreen()` --calls--> `ScreenContainer()`  [EXTRACTED]
  screens/MovieListScreen.js → components/ScreenContainer.js
- `SearchScreen()` --calls--> `ScreenContainer()`  [EXTRACTED]
  screens/SearchScreen.js → components/ScreenContainer.js
- `MovieScreen()` --calls--> `HomeComponent()`  [EXTRACTED]
  screens/MovieScreen.js → components/home/HomeComponent.js
- `TvScreen()` --calls--> `HomeComponent()`  [EXTRACTED]
  screens/TvScreen.js → components/home/HomeComponent.js
- `MovieListScreen()` --calls--> `BackIcon()`  [EXTRACTED]
  screens/MovieListScreen.js → components/ui/BackIcon.js

## Import Cycles
- None detected.

## Communities (26 total, 15 thin omitted)

### Community 0 - "Onboarding & Branding"
Cohesion: 0.08
Nodes (39): App(), GradientText(), LogoMark(), OnboardingHeader(), styles, PaginationDots(), styles, FALLBACK_POSTERS (+31 more)

### Community 1 - "Movie & TV Details"
Cohesion: 0.11
Nodes (34): HERO_HEIGHT, MovieBackdrop(), styles, { width }, Cast(), MovieCast(), MovieGenres(), styles (+26 more)

### Community 2 - "Home Screen Layout"
Cohesion: 0.15
Nodes (21): FloatingTabBar(), styles, CATEGORIES, Stack, MainTabs(), PAGES, TABS, @react-navigation/native (+13 more)

### Community 3 - "DiscoverScreen.js"
Cohesion: 0.11
Nodes (31): HeroCarousel(), styles, { width }, HomeComponent(), styles, MediaRow(), styles, MovieList() (+23 more)

### Community 4 - "Expo App Config"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, backgroundColor, barStyle, expo, android, androidNavigationBar (+14 more)

### Community 5 - "Redux Store & TMDB API"
Cohesion: 0.13
Nodes (16): @reduxjs/toolkit@^2.2.6, @reduxjs/toolkit, fetchDetailBundle(), fetchDiscover(), fetchList(), MOVIE_PATHS, searchMedia(), TV_PATHS (+8 more)

### Community 6 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, expo-linear-gradient@~13.0.2, expo-status-bar@~1.12.1, react@18.2.0, react-native@0.74.3, @react-native-masked-view/masked-view@0.3.1, react-native-vector-icons@^10.1.0, react-native-web@~0.19.10 (+4 more)

### Community 7 - "Package Metadata"
Cohesion: 0.22
Nodes (9): react-native-modal@^13.0.1, devDependencies, @babel/core@^7.20.0, main, name, private, version, @babel/core (+1 more)

### Community 8 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, android, ios, start, web

### Community 9 - "axios"
Cohesion: 0.50
Nodes (3): axios@^1.7.2, axios, api

### Community 14 - "useWatchlist.js"
Cohesion: 0.73
Nodes (4): useWatchlist(), getWatchlist(), isSaved(), toggleSaved()

## Knowledge Gaps
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Onboarding & Branding` to `Movie & TV Details`, `Home Screen Layout`, `DiscoverScreen.js`, `dependencies`, `Package Metadata`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `Onboarding & Branding` be split into smaller, more focused modules?**
  _Cohesion score 0.08458646616541353 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Movie & TV Details` to `Onboarding & Branding`, `Home Screen Layout`, `DiscoverScreen.js`, `dependencies`, `Package Metadata`, `useWatchlist.js`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Should `Movie & TV Details` be split into smaller, more focused modules?**
  _Cohesion score 0.11436170212765957 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `Onboarding & Branding`, `Redux Store & TMDB API`, `Package Metadata`, `axios`, `Expo Core`, `Blur Effect Library`, `Font Loading`, `Metro Runtime`, `React DOM Renderer`, `Async Storage`, `Fast Image`, `Image Zoom Viewer`, `Linear Gradient`, `react-native-ionicons@^4.6.5`, `@react-navigation/stack`, `react-native-pager-view`, `react-native-webview@13.8.6`, `react-native-youtube-iframe`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `Home Screen Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.14838709677419354 - nodes in this community are weakly interconnected._
- **Should `DiscoverScreen.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10628019323671498 - nodes in this community are weakly interconnected._