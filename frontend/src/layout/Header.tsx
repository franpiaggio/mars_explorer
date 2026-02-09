import {
  Box,
  Flex,
  Container,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Link, useLocation } from "react-router-dom"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import MobileFilterDrawer from "@/components/MobileFilterDrawer/MobileFilterDrawer"

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { state } = useFiltersContext()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const activeLinkColor = useColorModeValue("mars.600", "mars.400")
  const linkColor = useColorModeValue("gray.600", "whiteAlpha.700")
  const isHome = location.pathname === "/"

  return (
    <>
      <Box
        as="header"
        bg={bgColor}
        borderBottomWidth="1px"
        borderColor={borderColor}
        position="sticky"
        top={0}
        zIndex="banner"
      >
        <Container maxW={{ base: "100%", xl: "80%" }}>
          <Flex h={{ base: "52px", md: "60px" }} align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <Heading as="h1" fontSize={{ base: "md", md: "lg" }} fontWeight="700">
                <Link to="/">
                  <Flex align="center" gap={2}>
                    <Text as="span" color={useColorModeValue("mars.600", "mars.400")}>
                      Mars
                    </Text>
                    <Text as="span">Explorer</Text>
                  </Flex>
                </Link>
              </Heading>

              {isHome && state.rover && (
                <Text
                  display={{ base: "inline", md: "none" }}
                  fontSize="xs"
                  color={useColorModeValue("gray.500", "whiteAlpha.600")}
                  ml={1}
                >
                  {state.rover.name}
                </Text>
              )}
            </Flex>

            <Flex align="center" gap={1}>
              {/* Desktop nav links */}
              <HStack spacing={1} display={{ base: "none", md: "flex" }} mr={2}>
                {[
                  { to: "/", label: "Explore" },
                  { to: "/favs", label: "Favorites" },
                  { to: "/about", label: "About" },
                ].map((link) => (
                  <Button
                    key={link.to}
                    as={Link}
                    to={link.to}
                    variant="ghost"
                    size="sm"
                    color={location.pathname === link.to ? activeLinkColor : linkColor}
                    fontWeight={location.pathname === link.to ? "600" : "400"}
                    _hover={{ color: activeLinkColor }}
                    aria-current={location.pathname === link.to ? "page" : undefined}
                  >
                    {link.label}
                  </Button>
                ))}
              </HStack>

              <IconButton
                aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />

              {/* Mobile filter button */}
              {isHome && (
                <IconButton
                  aria-label="Open filters"
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                  variant="ghost"
                  size="sm"
                  display={{ base: "flex", md: "none" }}
                />
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      <MobileFilterDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
