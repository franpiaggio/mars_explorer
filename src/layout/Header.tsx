import {
  Box,
  Flex,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
interface Props {
  isRefetching?: boolean
}
function Header({ isRefetching }: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box
        as="header"
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        marginBottom="50px"
      >
        <Container maxW={{ base: "100%", xl: "80%" }}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box display="flex">
              <Heading as="h1" size="md" marginRight="15px">
                <Link to="/">Nasa Rover Explorer</Link>
              </Heading>
              {isRefetching ? <Spinner /> : null}
            </Box>
            <Flex alignItems="center" as="nav">
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <HamburgerIcon />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <Link to="/">
                      <MenuItem>Photos</MenuItem>
                    </Link>
                    <Link to="/favs">
                      <MenuItem>Favourites</MenuItem>
                    </Link>
                    <Link to="/about">
                      <MenuItem>About this app</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Header
