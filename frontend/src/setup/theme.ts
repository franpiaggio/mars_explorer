import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

// Mars-regolith palette. Warm-tinted neutrals (chroma toward rust) + a
// committed rust accent. Avoid pure #000 / #fff everywhere.
const colors = {
  // Rust / iron oxide — the planet's surface color
  mars: {
    50: "#fbeee7",
    100: "#f5d2c2",
    200: "#ecae93",
    300: "#e08763",
    400: "#d3623a",
    500: "#c4471c",
    600: "#a23713",
    700: "#7a280d",
    800: "#521a08",
    900: "#2a0d04",
  },
  // Warm beiges — Mars dust / pale regolith. Light-mode surface family.
  dust: {
    50: "#faf6f1",
    100: "#f1eadf",
    200: "#e5dac8",
    300: "#d3c1a8",
    400: "#bba484",
    500: "#9a8466",
    600: "#776550",
    700: "#564a3a",
    800: "#352e24",
    900: "#1a1612",
  },
  // Deep iron / shadowed regolith. Dark-mode surface family with warm tint.
  iron: {
    50: "#f5f1ee",
    100: "#dcd3cc",
    200: "#b8a89c",
    300: "#8c7a6e",
    400: "#5e4f44",
    500: "#3d322a",
    600: "#2a221c",
    700: "#1f1813",
    800: "#15100c",
    900: "#0d0907",
  },
}

const fonts = {
  heading: `'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif`,
  body: `'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif`,
  mono: `'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace`,
}

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const letterSpacings = {
  tighter: "-0.04em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.04em",
  wider: "0.08em",
  widest: "0.12em",
}

const fontSizes = {
  "2xs": "0.6875rem",
  xs: "0.75rem",
  sm: "0.8125rem",
  md: "0.9375rem",
  lg: "1.0625rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.5rem",
  "5xl": "3.5rem",
  "6xl": "4.75rem",
  "7xl": "6.25rem",
}

const styles = {
  global: (props: any) => ({
    "html, body, #root": {
      height: "100%",
      bg: props.colorMode === "dark" ? "iron.900" : "dust.50",
      color: props.colorMode === "dark" ? "iron.50" : "iron.900",
      fontFeatureSettings: '"ss01", "ss02", "cv11"',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "::selection": {
      bg: props.colorMode === "dark" ? "mars.500" : "mars.200",
      color: props.colorMode === "dark" ? "white" : "iron.900",
    },
    "*:focus-visible": {
      outline: "2px solid",
      outlineColor: props.colorMode === "dark" ? "mars.400" : "mars.500",
      outlineOffset: "2px",
    },
  }),
}

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const semanticTokens = {
  colors: {
    "bg.canvas": { default: "dust.50", _dark: "iron.900" },
    "bg.surface": { default: "white", _dark: "iron.800" },
    "bg.subtle": { default: "dust.100", _dark: "iron.700" },
    "bg.muted": { default: "dust.200", _dark: "iron.600" },
    "border.subtle": { default: "dust.200", _dark: "iron.700" },
    "border.muted": { default: "dust.300", _dark: "iron.600" },
    "text.primary": { default: "iron.900", _dark: "dust.50" },
    "text.secondary": { default: "iron.500", _dark: "dust.200" },
    "text.muted": { default: "iron.400", _dark: "dust.400" },
    "accent.fg": { default: "mars.600", _dark: "mars.400" },
    "accent.bg": { default: "mars.500", _dark: "mars.500" },
    "accent.subtle": { default: "mars.50", _dark: "rgba(196, 71, 28, 0.18)" },
  },
}

const components = {
  Heading: {
    baseStyle: {
      fontFamily: "heading",
      fontWeight: "semibold",
      letterSpacing: "tight",
      lineHeight: "1.1",
    },
  },
  Text: {
    baseStyle: {
      lineHeight: "1.55",
    },
  },
  Button: {
    baseStyle: {
      borderRadius: "lg",
      fontWeight: "500",
      letterSpacing: "tight",
      _focusVisible: {
        boxShadow: "0 0 0 3px rgba(196, 71, 28, 0.5)",
      },
    },
    variants: {
      mars: () => ({
        bg: "mars.500",
        color: "white",
        _hover: { bg: "mars.400", _disabled: { bg: "mars.500" } },
        _active: { bg: "mars.600" },
      }),
      chip: (props: any) => ({
        bg: props.colorMode === "dark" ? "iron.700" : "dust.100",
        color: props.colorMode === "dark" ? "dust.100" : "iron.700",
        borderRadius: "full",
        fontWeight: "500",
        fontSize: "sm",
        px: 4,
        py: 2,
        _hover: { bg: props.colorMode === "dark" ? "iron.600" : "dust.200" },
        _active: { bg: "mars.500", color: "white" },
      }),
      chipActive: () => ({
        bg: "mars.500",
        color: "white",
        borderRadius: "full",
        fontWeight: "600",
        fontSize: "sm",
        px: 4,
        py: 2,
        _hover: { bg: "mars.400" },
      }),
    },
  },
  Drawer: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "iron.800" : "white",
        borderTopRadius: "xl",
      },
      header: { pt: 3, pb: 2 },
    }),
  },
  Modal: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "iron.800" : "white",
        borderRadius: "xl",
      },
    }),
  },
  Card: {
    baseStyle: (props: any) => ({
      container: {
        bg: props.colorMode === "dark" ? "iron.800" : "white",
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "none",
        borderWidth: "1px",
        borderColor: props.colorMode === "dark" ? "iron.700" : "dust.200",
      },
    }),
  },
  Badge: {
    baseStyle: {
      fontWeight: "500",
      letterSpacing: "0.02em",
      textTransform: "none",
    },
  },
}

const theme = extendTheme({
  colors,
  fonts,
  fontWeights,
  fontSizes,
  letterSpacings,
  styles,
  config,
  semanticTokens,
  components,
  radii: {
    sm: "4px",
    md: "6px",
    lg: "10px",
    xl: "14px",
    "2xl": "20px",
    "3xl": "28px",
  },
  space: {
    18: "4.5rem",
    22: "5.5rem",
  },
})

export { theme }
