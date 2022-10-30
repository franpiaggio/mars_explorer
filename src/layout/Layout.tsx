import { Box, Container, Flex } from "@chakra-ui/react"
interface props {
  children: React.ReactNode
}
function Layout({ children }: props) {
  return (
    <Container centerContent maxW={{ base: "100%", xl: "80%" }} minH="100vh">
      <Box width="100%" borderWidth="1px" borderRadius="lg" padding="15px" minH="100vh">
        {children}
      </Box>
    </Container>
  )
}

export default Layout
