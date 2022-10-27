import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

const styles = {
  global: {
    "html, body, #root": {
      height: "100%",
    },
  },
}
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const theme = extendTheme({ colors, styles, config })

export { theme }
