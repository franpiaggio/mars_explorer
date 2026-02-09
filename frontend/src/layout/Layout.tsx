import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary"
import { Box, Container } from "@chakra-ui/react"
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
          e.currentTarget.style.background = "#c44a25"
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
      <Container
        centerContent
        maxW={{ base: "100%", xl: "80%" }}
        minH="100vh"
        px={{ base: 3, md: 4 }}
        pb={{ base: "80px", md: 4 }}
      >
        <Box
          id="main-content"
          width="100%"
          borderWidth={{ base: 0, md: "1px" }}
          borderRadius={{ base: 0, md: "xl" }}
          padding={{ base: 0, md: 5 }}
          minH="100vh"
          role="main"
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </Box>
      </Container>
      <BottomNav />
    </>
  )
}

export default Layout
