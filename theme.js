// Design tokens — Apple TV (dark) style. Single source of truth for the new UI.
export const colors = {
    black: "#000000",
    surface: "#0E0E10",      // screen background
    card: "#1C1C1E",         // cards, sheets, search bar
    cardLight: "#2C2C2E",    // secondary elements
    separator: "rgba(84, 84, 88, 0.65)",
    label: "#FFFFFF",
    labelSecondary: "rgba(235, 235, 245, 0.6)",
    labelTertiary: "rgba(235, 235, 245, 0.3)",
    accent: "#FF6A3D",       // brand orange, dipertahankan
    accentSoft: "rgba(255, 106, 61, 0.15)",
    star: "#FFD60A",
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
};

export const type = {
    largeTitle: { fontSize: 34, fontWeight: "700", color: colors.label },
    title2: { fontSize: 22, fontWeight: "700", color: colors.label },
    headline: { fontSize: 17, fontWeight: "600", color: colors.label },
    body: { fontSize: 15, fontWeight: "400", color: colors.label },
    footnote: { fontSize: 13, fontWeight: "400", color: colors.labelSecondary },
    caption: { fontSize: 12, fontWeight: "400", color: colors.labelSecondary },
};

// Palet hangat khusus splash & onboarding; hanya warna yang memang beda yang
// didefinisikan ulang. Spacing dan radius mengikuti skala dasar, nama lamanya
// dipertahankan supaya nilai yang sudah dipakai tidak bergeser.
export const onboarding = {
    colors: {
        bg: "#050505",
        bgElevated: "#0E0A08",
        primary: "#FF6A1A",
        gradientStart: "#FF8A1F",
        gradientEnd: "#FF4D2E",
        textPrimary: colors.label,
        textSecondary: "#A3A7B3",
        dotInactive: "#3A3A3F",
        glassFill: "rgba(20,16,14,0.55)",
        glassBorder: "rgba(255,255,255,0.08)",
        glow: "rgba(255,106,26,0.35)",
        bgWarm1: "#2A1408",
        bgWarm2: "#3A1B0A",
        chipFill: "rgba(10,8,6,0.55)",
    },
    spacing: {
        screenX: spacing.xl,
        xs: spacing.sm,
        sm: spacing.md,
        md: spacing.lg,
        lg: spacing.xl,
        xl: spacing.xxl,
    },
    radius: { chip: radius.pill, card: 20 },
    type: {
        title: { fontSize: 40, lineHeight: 46, fontWeight: "800", letterSpacing: -0.5 },
        body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
        eyebrow: { fontSize: 12, letterSpacing: 2, fontWeight: "600" },
        tagline: { fontSize: 14, letterSpacing: 3, fontWeight: "400" },
    },
};
