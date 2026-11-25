# Spesifikasi: Splash Screen & Onboarding Lalajo (React Native)

> Dokumen ini sepenuhnya berbasis teks. **Tidak ada file gambar yang perlu dibuka atau dibaca.** Jangan menjelajah atau membuka file gambar apa pun di repo. Semua detail visual ada di bawah.

## 1. Tentang aplikasi

Lalajo adalah aplikasi penemuan film & serial TV (streaming/discovery). Gaya visual: **sinematik, gelap, hangat**, dengan aksen **oranye** berpendar. Tagline: "Find your next story".

## 2. Design tokens

Buat `src/theme/tokens.ts`:

```ts
export const colors = {
  bg: '#050505',
  bgElevated: '#0E0A08',
  primary: '#FF6A1A',
  gradientStart: '#FF8A1F',
  gradientEnd: '#FF4D2E',
  textPrimary: '#FFFFFF',
  textSecondary: '#A3A7B3',
  dotInactive: '#3A3A3F',
  glassFill: 'rgba(20,16,14,0.55)',
  glassBorder: 'rgba(255,255,255,0.08)',
  glow: 'rgba(255,106,26,0.35)',
};

export const typography = {
  fontFamily: 'Inter', // sans-serif geometris modern; satu keluarga saja
  title:   { fontSize: 44, lineHeight: 48, fontWeight: '800' as const, letterSpacing: -0.5 },
  body:    { fontSize: 18, lineHeight: 26, fontWeight: '400' as const },
  eyebrow: { fontSize: 13, letterSpacing: 2, fontWeight: '600' as const },
  tagline: { fontSize: 16, letterSpacing: 4, fontWeight: '400' as const },
};

export const spacing = { screenX: 24, xs: 8, sm: 12, md: 16, lg: 24, xl: 32 };
export const radius = { chip: 999, card: 20 };
```

## 3. Splash Screen

**Tampilan (portrait, rasio sekitar 9:19.5):**
- Latar hitam pekat `#050505`.
- Dua **kurva cahaya oranye berpendar** (garis melengkung halus dengan glow): satu masuk dari pojok kiri atas, satu dari pojok kanan bawah. Bangun dengan `react-native-svg` (path melengkung + stroke gradien oranye ke transparan) dan sedikit opacity/blur. Tidak perlu persis; yang penting kesan cahaya mengalir di dua pojok berlawanan.
- **Tengah layar:** logo + wordmark dalam satu baris horizontal.
  - Logo mark: dua segitiga "play" bertumpuk/overlap menghadap kanan (seperti ikon fast-forward), gradien oranye (`#FF8A1F`) ke merah-oranye (`#FF4D2E`), sudut sedikit membulat.
  - Wordmark: teks "**Lalajo**" putih, bold, sans-serif; huruf "o" terakhir berisi ikon play kecil oranye di dalamnya.
- **Di bawah logo:** tagline "Find your next story", abu-abu (`textSecondary`), huruf kecil, letter-spacing lebar, ukuran kecil, rata tengah.

**Implementasi:**
1. Splash native (OS-level) dengan `expo-splash-screen` atau `react-native-bootsplash`: latar `#050505`, supaya tidak ada kilatan putih.
2. Komponen JS `SplashScreen.tsx`: logo fade-in + scale 0.9 → 1 (±600 ms), tagline fade-in setelah ±300 ms, kurva cahaya fade-in perlahan. Total ±1,5–2 detik atau sampai app siap (font loaded + status onboarding terbaca).
3. Setelah selesai: jika `hasSeenOnboarding` false → Onboarding; jika true → layar utama/login.

**Logo:** buat sebagai komponen SVG (`LogoMark.tsx`, `Wordmark.tsx`) dengan `react-native-svg` dan `LinearGradient` SVG. Jika hasil kurang rapi, tandai dengan `// TODO: ganti dengan SVG resmi dari desainer`. Jangan membuat file biner/gambar palsu.

## 4. Onboarding (3 slide, swipe horizontal)

### Struktur layar (sama untuk semua slide)
- **Header atas:** logo kecil (mark oranye) + teks "Lalajo" putih bold di kiri; tombol teks "**Skip**" abu-abu (`textSecondary`) di kanan. Gunakan safe-area insets.
- **Area visual:** memenuhi ±65% tinggi layar dari atas. Berupa foto/ilustrasi latar yang gelap dengan cahaya oranye hangat, memudar ke `#050505` di bagian bawah lewat gradien vertikal (transparan → `#050505`) supaya teks terbaca.
- **Blok bawah:** indikator halaman → (opsional) eyebrow → judul 2 baris → deskripsi. Margin horizontal 24.
- **Indikator halaman:** 3 titik. Titik aktif = pil oranye memanjang (lebar ±44, tinggi ±10); titik tidak aktif = lingkaran ±10 abu gelap (`dotInactive`). Animasikan lebar saat pindah slide.
- **Judul:** dua baris, ukuran besar, tebal. Baris 1 putih. Baris 2 **teks gradien oranye** (`@react-native-masked-view/masked-view` + `expo-linear-gradient`, dari `gradientStart` ke `gradientEnd`).
- **Deskripsi:** `textSecondary`, ukuran body, maksimal 2 baris, lebar terbatas (±80% layar).

### Slide 1: "Explore Movies & TV Shows"
- **Visual latar:** adegan seseorang duduk di sofa dilihat dari belakang, ruangan gelap dengan lampu hangat oranye. Di atas kepala orang itu melayang **carousel poster film melengkung** (efek 3D/perspective), poster tengah paling besar, poster samping lebih kecil dan miring, dengan **garis cahaya oranye melengkung** di bawah poster.
- Di atas judul: **garis oranye pendek** (±50 × 3 dp) sebagai aksen. Tidak ada teks eyebrow.
- **Judul:** "Explore Movies" (putih) / "& TV Shows" (gradien oranye).
- **Deskripsi:** "From epic blockbusters to binge-worthy series, find it all in one place."
- **Implementasi:** komponen `PosterCarousel.tsx` yang merender poster dari **data** (mock lokal dulu, siap diganti API), dengan `transform` perspective/rotateY dan parallax ringan saat swipe. **Jangan** hard-code poster film berhak cipta; pakai kartu placeholder netral (gradien gelap + judul mock).

### Slide 2: "Find the Perfect Watch"
- **Visual latar:** seseorang bersandar di sofa menonton TV layar lebar melengkung yang menampilkan adegan sci-fi (astronot berdiri di planet asing, langit oranye). Ada strip LED oranye di dinding kiri.
- **Kartu rating kaca (glassmorphism)** melayang di kiri-atas area TV: ikon bintang oranye + "**8.7**" putih bold dengan "/10" kecil abu; di bawahnya ikon orang/penonton + "1.2M watched". Latar `glassFill`, border `glassBorder`, radius ±20, blur (`expo-blur`).
- **Baris chip genre** di bagian bawah layar TV: `Action`, `Sci-Fi`, `Adventure`, `Drama`. Chip aktif (`Action`): border oranye + glow + teks putih. Chip lain: latar gelap semi-transparan, teks putih/abu. Bentuk pil penuh. Opsional: chip aktif berganti otomatis secara berkala dengan animasi halus.
- **Eyebrow:** garis oranye pendek + teks "DETAILS AT A GLANCE" (oranye, huruf kapital, letter-spacing lebar).
- **Judul:** "Find the" (putih) / "Perfect Watch" (gradien oranye).
- **Deskripsi:** "Get ratings, genres and more to choose the best movie for your mood."
- **Implementasi:** `RatingCard.tsx` dan `GenreChips.tsx` dibuat sebagai komponen native di atas gambar latar, bukan bagian dari gambar.

### Slide 3: placeholder (desain belum final)
- Pakai layout dan komponen yang sama, data di `slides.ts` bertanda `// TODO: ganti dengan desain final`.
- Konten sementara: judul "Save Your" / "Favorites"; deskripsi "Build your watchlist and get reminded when new episodes arrive."
- Slide ini menampilkan tombol utama **"Get Started"** (pil penuh lebar, gradien oranye, teks putih bold).

### Perilaku & navigasi
- Swipe horizontal (`FlatList` paging atau `react-native-pager-view`); titik sinkron dengan scroll.
- **Skip** (semua slide) dan **Get Started** (slide terakhir) → simpan `hasSeenOnboarding = true` di `AsyncStorage` (atau MMKV jika sudah dipakai) lalu navigasi ke layar berikutnya (replace, bukan push).
- Animasi (`react-native-reanimated`): teks fade + slide-up kecil saat slide masuk, visual dengan parallax ringan. Hormati "Reduce Motion".
- Responsif: tes di layar pendek (mis. 667 dp tinggi) dan tinggi (≥ 900 dp); teks tidak boleh terpotong; visual pakai `resizeMode="cover"` dan alignment atas.
- Aksesibilitas: `accessibilityLabel` untuk Skip dan indikator, area sentuh minimal 44×44.

## 5. Asset visual (tanpa gambar di repo)

Karena tidak ada file gambar yang boleh dibaca, gunakan strategi ini:
- Foto latar tiap slide: **placeholder** berupa `LinearGradient` gelap (hitam → cokelat tua → oranye redup) di komponen `SlideBackground.tsx`, dengan prop `source?` agar foto asli bisa dipasang nanti lewat `require('../../assets/onboarding/bg-xxx.jpg')`.
- Beri komentar `// TODO` yang jelas di setiap tempat yang menunggu asset asli.
- Di akhir pekerjaan, tulis daftar asset yang perlu saya sediakan: logo SVG resmi, foto latar slide 1 dan 2 (tanpa teks/UI di dalamnya), font Inter, desain slide 3.

## 6. Struktur file

```
src/
  theme/tokens.ts
  features/onboarding/
    data/slides.ts
    screens/SplashScreen.tsx
    screens/OnboardingScreen.tsx
    components/
      OnboardingHeader.tsx
      PaginationDots.tsx
      GradientText.tsx
      SlideBackground.tsx
      RatingCard.tsx
      GenreChips.tsx
      PosterCarousel.tsx
      PrimaryButton.tsx
      LogoMark.tsx
      Wordmark.tsx
    hooks/useOnboardingStatus.ts
```

## 7. Dependensi (cek dulu yang sudah ada; minta persetujuan sebelum install)

`react-native-reanimated`, `react-native-gesture-handler`, `expo-linear-gradient` (atau `react-native-linear-gradient`), `@react-native-masked-view/masked-view`, `react-native-svg`, `expo-blur`, `expo-splash-screen` / `react-native-bootsplash`, `@react-native-async-storage/async-storage`, `expo-font` + Inter, serta library navigasi yang sudah dipakai proyek.

## 8. Kriteria selesai

- [ ] Splash native + splash animasi tampil, lalu route sesuai status onboarding.
- [ ] 3 slide bisa di-swipe, titik indikator beranimasi, Skip dan Get Started berfungsi.
- [ ] Teks, tombol, titik, kartu rating, dan chip genre adalah komponen native.
- [ ] Judul memakai teks gradien oranye.
- [ ] Tampilan rapi di layar ±390×844 dan di layar kecil/besar, iOS & Android.
- [ ] Tidak ada warna/ukuran hard-coded di luar `tokens.ts`.
- [ ] Type-check dan lint lolos tanpa warning baru.
- [ ] Tidak ada poster berhak cipta atau asset biner palsu di repo.

---

## 9. PROMPT UNTUK CLAUDE CODE

```text
Baca docs/LALAJO_ONBOARDING_GUIDE_TEXT_ONLY.md. Dokumen itu sepenuhnya teks.
JANGAN membuka, membaca, atau melampirkan file gambar apa pun (png/jpg/svg raster)
di repo ini; model yang saya pakai tidak mendukung vision.

Tugas: implementasikan Splash Screen dan flow Onboarding 3 slide aplikasi Lalajo
sesuai spesifikasi.

1. Pelajari struktur proyek (Expo/bare, TypeScript, navigasi, storage) dan ikuti
   konvensi yang ada. Jangan ganti stack.
2. Buat rencana singkat (file dan dependensi baru), lalu tunggu persetujuan saya
   sebelum menginstal paket.
3. Kerjakan bertahap: tokens, komponen kecil, SplashScreen, OnboardingScreen,
   integrasi navigasi dan hasSeenOnboarding.
4. Pakai placeholder berbasis kode (gradien, SVG) untuk foto latar dan logo, dengan
   TODO yang jelas. Jangan membuat asset biner.
5. Setelah selesai, jalankan type-check dan lint, perbaiki error, jelaskan cara
   menjalankan di iOS/Android, dan beri daftar asset yang masih perlu saya sediakan.
```
