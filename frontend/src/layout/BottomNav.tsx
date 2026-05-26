import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react"
import { ViewIcon, StarIcon, InfoIcon } from "@chakra-ui/icons"
import { useNavigate, useLocation } from "react-router-dom"

interface NavItem {
  label: string
  icon: typeof ViewIcon
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Explore", icon: ViewIcon, path: "/" },
  { label: "Favorites", icon: StarIcon, path: "/favs" },
  { label: "About", icon: InfoIcon, path: "/about" },
]

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const bgColor = useColorModeValue("rgba(250,246,241,0.92)", "rgba(13,9,7,0.92)")
  const borderColor = useColorModeValue("dust.200", "iron.700")
  const activeColor = useColorModeValue("iron.900", "dust.50")
  const inactiveColor = useColorModeValue("iron.400", "dust.400")

  return (
    <Box
      as="nav"
      display={{ base: "block", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bgColor}
      borderTopWidth="1px"
      borderColor={borderColor}
      zIndex="sticky"
      pb="env(safe-area-inset-bottom)"
      role="navigation"
      aria-label="Main navigation"
      sx={{ backdropFilter: "saturate(140%) blur(12px)" }}
    >
      <Flex justify="space-around" align="center" h="60px">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Flex
              key={item.path}
              as="button"
              direction="column"
              align="center"
              justify="center"
              flex={1}
              h="100%"
              color={isActive ? activeColor : inactiveColor}
              onClick={() => navigate(item.path)}
              _hover={{ color: activeColor }}
              transition="color 0.15s"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              role="link"
              minW="44px"
              minH="44px"
              position="relative"
            >
              <Icon as={item.icon} boxSize={5} mb={0.5} />
              <Text
                fontSize="xs"
                fontWeight={isActive ? "600" : "400"}
                letterSpacing="-0.01em"
              >
                {item.label}
              </Text>
              {isActive && (
                <Box
                  position="absolute"
                  top={0}
                  left="50%"
                  transform="translateX(-50%)"
                  w="24px"
                  h="2px"
                  bg="mars.500"
                  borderRadius="0 0 2px 2px"
                />
              )}
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}

export default BottomNav
