import { Box, Container, Flex } from "@chakra-ui/react"
interface props {
  children: React.ReactNode
}
function Layout({ children }: props) {
  return (
    <Container centerContent height="100%">
      <Flex width="100%" height="100%" align="center">
        <Box
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding="15px"
        >
          {children}
        </Box>
      </Flex>
    </Container>
  )
}

export default Layout
