import { Box, Container, Flex } from "@chakra-ui/react"
interface props {
  children: React.ReactNode
}
function Layout({ children }: props) {
  return (
    <Container centerContent maxW="80%" height="100%">
      <Box width="100%" borderWidth="1px" borderRadius="lg" padding="15px">
        {children}
      </Box>
    </Container>
  )
}

export default Layout
