import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Link, useLocation } from "react-router-dom"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import MobileFilterDrawer from "@/components/MobileFilterDrawer/MobileFilterDrawer"

const NAV_LINKS = [
  { to: "/", label: "Explore" },
  { to: "/favs", label: "Favorites" },
  { to: "/about", label: "About" },
]

function MarsMark() {
  return (
    <Box
      as="span"
      display="inline-block"
      w="14px"
      h="14px"
      borderRadius="full"
      bgGradient="radial(circle at 30% 30%, #e08763, #c4471c 55%, #7a280d 100%)"
      boxShadow="inset -1px -1px 2px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)"
      flexShrink={0}
    />
  )
}

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { state } = useFiltersContext()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue("rgba(250,246,241,0.85)", "rgba(13,9,7,0.85)")
  const borderColor = useColorModeValue("dust.200", "iron.700")
  const linkColor = useColorModeValue("iron.500", "dust.300")
  const linkActiveColor = useColorModeValue("iron.900", "dust.50")
  const mutedColor = useColorModeValue("iron.400", "dust.400")
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
        sx={{ backdropFilter: "saturate(140%) blur(10px)" }}
      >
        <Flex
          maxW={{ base: "100%", xl: "1320px" }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 10 }}
          h={{ base: "56px", md: "64px" }}
          align="center"
          justify="space-between"
        >
          <Link to="/" aria-label="Mars Explorer — home">
            <HStack spacing={{ base: 2, md: 2.5 }}>
              <MarsMark />
              <Text
                as="span"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                letterSpacing="-0.02em"
              >
                Mars Explorer
              </Text>
              {isHome && state.rover && (
                <Text
                  display={{ base: "none", sm: "inline" }}
                  fontFamily="mono"
                  fontSize="xs"
                  color={mutedColor}
                  ml={1}
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                >
                  · {state.rover.name}
                </Text>
              )}
            </HStack>
          </Link>

          <Flex align="center" gap={{ base: 0, md: 1 }}>
            <HStack spacing={0} display={{ base: "none", md: "flex" }} mr={2}>
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Button
                    key={link.to}
                    as={Link}
                    to={link.to}
                    variant="ghost"
                    size="sm"
                    h="32px"
                    px={3}
                    color={isActive ? linkActiveColor : linkColor}
                    fontWeight={isActive ? "600" : "400"}
                    position="relative"
                    _hover={{ color: linkActiveColor, bg: "transparent" }}
                    aria-current={isActive ? "page" : undefined}
                    sx={
                      isActive
                        ? {
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              left: "12px",
                              right: "12px",
                              bottom: "-1px",
                              height: "2px",
                              bg: "mars.500",
                              borderRadius: "2px",
                            },
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Button>
                )
              })}
            </HStack>

            <IconButton
              aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color={linkColor}
              _hover={{ color: linkActiveColor, bg: "transparent" }}
            />

            {isHome && (
              <IconButton
                aria-label="Open filters"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="ghost"
                size="sm"
                color={linkColor}
                display={{ base: "flex", md: "none" }}
                _hover={{ color: linkActiveColor, bg: "transparent" }}
              />
            )}
          </Flex>
        </Flex>
      </Box>

      <MobileFilterDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
