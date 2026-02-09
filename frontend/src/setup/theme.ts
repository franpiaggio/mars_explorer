import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

const styles = {
  global: (props: any) => ({
    "html, body, #root": {
      height: "100%",
      bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
    },
  }),
}

const colors = {
  brand: {
    50: "#fef2e8",
    100: "#fcd9b8",
    200: "#f9bf88",
    300: "#f6a557",
    400: "#f38b27",
    500: "#e07316",
    600: "#b25a11",
    700: "#80400c",
    800: "#4e2707",
    900: "#1e0e02",
  },
  mars: {
    50: "#fdf0ec",
    100: "#f8d5ca",
    200: "#f1a992",
    300: "#e87d5b",
    400: "#d95a32",
    500: "#c44a25",
    600: "#a13b1d",
    700: "#7d2d16",
    800: "#5a200f",
    900: "#381308",
  },
  surface: {
    dark: "#1a1a2e",
    card: {
      dark: "#16213e",
      light: "#ffffff",
    },
  },
}

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const semanticTokens = {
  colors: {
    "bg.surface": {
      default: "white",
      _dark: "gray.800",
    },
    "bg.card": {
      default: "white",
      _dark: "gray.700",
    },
    "bg.subtle": {
      default: "gray.50",
      _dark: "gray.900",
    },
    "text.primary": {
      default: "gray.800",
      _dark: "whiteAlpha.900",
    },
    "text.secondary": {
      default: "gray.600",
      _dark: "whiteAlpha.700",
    },
    "accent.main": {
      default: "mars.500",
      _dark: "mars.400",
    },
    "accent.subtle": {
      default: "mars.50",
      _dark: "rgba(217, 90, 50, 0.15)",
    },
  },
}

const components = {
  Button: {
    baseStyle: {
      borderRadius: "xl",
      fontWeight: "600",
      _focusVisible: {
        boxShadow: "0 0 0 3px rgba(217, 90, 50, 0.5)",
      },
    },
    variants: {
      mars: (props: any) => ({
        bg: props.colorMode === "dark" ? "mars.500" : "mars.500",
        color: "white",
        _hover: {
          bg: props.colorMode === "dark" ? "mars.400" : "mars.600",
          _disabled: {
            bg: "mars.500",
          },
        },
        _active: {
          bg: "mars.700",
        },
      }),
      chip: (props: any) => ({
        bg: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.100",
        color: props.colorMode === "dark" ? "whiteAlpha.800" : "gray.700",
        borderRadius: "full",
        fontWeight: "500",
        fontSize: "sm",
        px: 4,
        py: 2,
        _hover: {
          bg: props.colorMode === "dark" ? "whiteAlpha.200" : "gray.200",
        },
        _active: {
          bg: props.colorMode === "dark" ? "mars.500" : "mars.500",
          color: "white",
        },
      }),
      chipActive: (props: any) => ({
        bg: props.colorMode === "dark" ? "mars.500" : "mars.500",
        color: "white",
        borderRadius: "full",
        fontWeight: "600",
        fontSize: "sm",
        px: 4,
        py: 2,
        _hover: {
          bg: props.colorMode === "dark" ? "mars.400" : "mars.600",
        },
      }),
    },
  },
  Drawer: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        borderTopRadius: "2xl",
      },
      header: {
        pt: 3,
        pb: 2,
      },
    }),
  },
  Card: {
    baseStyle: (props: any) => ({
      container: {
        bg: props.colorMode === "dark" ? "gray.700" : "white",
        borderRadius: "xl",
        overflow: "hidden",
        boxShadow: props.colorMode === "dark"
          ? "0 1px 3px rgba(0,0,0,0.4)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      },
    }),
  },
}

const theme = extendTheme({
  colors,
  styles,
  config,
  semanticTokens,
  components,
  radii: {
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
  },
  space: {
    18: "4.5rem",
    22: "5.5rem",
  },
})

export { theme }
