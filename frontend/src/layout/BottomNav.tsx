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
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const activeColor = useColorModeValue("mars.500", "mars.400")
  const inactiveColor = useColorModeValue("gray.500", "whiteAlpha.500")

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
    >
      <Flex justify="space-around" align="center" h="56px">
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
            >
              <Icon as={item.icon} boxSize={5} mb={0.5} />
              <Text fontSize="xs" fontWeight={isActive ? "600" : "400"}>
                {item.label}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}

export default BottomNav
