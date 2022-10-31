import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary"
import { Box, Container } from "@chakra-ui/react"
import Header from "@/layout/Header"
interface props {
  children: React.ReactNode
}
function Layout({ children }: props) {
  return (
    <>
      <Header />
      <Container centerContent maxW={{ base: "100%", xl: "80%" }} minH="100vh">
        <Box width="100%" borderWidth="1px" borderRadius="lg" padding="15px" minH="100vh">
          <ErrorBoundary>{children}</ErrorBoundary>
        </Box>
      </Container>
    </>
  )
}

export default Layout
