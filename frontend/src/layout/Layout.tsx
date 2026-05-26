import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary"
import { Box } from "@chakra-ui/react"
import Header from "@/layout/Header"
import BottomNav from "@/layout/BottomNav"

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = "fixed"
          e.currentTarget.style.top = "10px"
          e.currentTarget.style.left = "10px"
          e.currentTarget.style.width = "auto"
          e.currentTarget.style.height = "auto"
          e.currentTarget.style.zIndex = "9999"
          e.currentTarget.style.padding = "8px 16px"
          e.currentTarget.style.background = "#c4471c"
          e.currentTarget.style.color = "white"
          e.currentTarget.style.borderRadius = "8px"
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = "absolute"
          e.currentTarget.style.left = "-10000px"
          e.currentTarget.style.width = "1px"
          e.currentTarget.style.height = "1px"
        }}
      >
        Skip to content
      </a>
      <Header />
      <Box
        id="main-content"
        as="main"
        role="main"
        w="100%"
        maxW={{ base: "100%", xl: "1320px" }}
        mx="auto"
        px={{ base: 4, md: 8, lg: 10 }}
        pt={{ base: 3, md: 6 }}
        pb={{ base: "96px", md: 14 }}
        minH="calc(100vh - 60px)"
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </Box>
      <BottomNav />
    </>
  )
}

export default Layout
