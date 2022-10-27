import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Spinner,
  useColorMode,
} from "@chakra-ui/react"
interface props {
  isRefetching?: boolean
}
function Header({ isRefetching }: props) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading as="h1" size="md">
          NASA ROVER
        </Heading>
        {isRefetching && <Spinner />}
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export default Header
