import {
  Heading,
  Box,
  Text,
  HStack,
  VStack,
  Flex,
  Wrap,
  WrapItem,
  Link,
  useColorModeValue,
} from "@chakra-ui/react"
import { Layout } from "@/layout"
import { Suspense, lazy } from "react"

const Mars3D = lazy(() =>
  import("@/components/Mars3D/Mars3D").then((m) => ({ default: m.Mars3D }))
)

const ROVERS = [
  {
    name: "Curiosity",
    status: "active",
    landed: "2012",
    site: "Gale Crater",
    cameras: 17,
    description:
      "The largest rover ever sent to Mars. Has driven 30+ km searching for evidence of past habitable environments.",
  },
  {
    name: "Perseverance",
    status: "active",
    landed: "2021",
    site: "Jezero Crater",
    cameras: 23,
    description:
      "NASA's most advanced rover. Caching rock samples for a future return mission. Carried Ingenuity, the first helicopter to fly on another planet.",
  },
  {
    name: "Opportunity",
    status: "complete",
    landed: "2004",
    site: "Meridiani Planum",
    cameras: 9,
    description:
      "Designed for 90 days, lasted nearly 15 years. Traveled 45 km — a record for off-Earth vehicles — until a global dust storm ended its mission in 2018.",
  },
  {
    name: "Spirit",
    status: "complete",
    landed: "2004",
    site: "Gusev Crater",
    cameras: 9,
    description:
      "Opportunity's twin. Found evidence of ancient hot springs and volcanic activity before becoming stuck in soft soil in 2009.",
  },
]

const STACK = [
  { label: "Frontend", value: "React 18 · TypeScript · Vite · Chakra UI" },
  { label: "Data", value: "React Query · React Router · localForage" },
  { label: "3D", value: "Three.js · @react-three/fiber · @react-three/drei" },
  { label: "Backend", value: "Rails 8 · PostgreSQL · Redis · Puma" },
  { label: "Infra", value: "Docker Compose · Nginx · Coolify" },
  { label: "Tests", value: "Vitest · React Testing Library" },
]

const ENDPOINTS = [
  {
    method: "GET",
    path: "/mars-photos/api/v1/rovers/{rover}/photos",
    note: "Filterable by Martian sol, Earth date, and camera.",
  },
  {
    method: "GET",
    path: "/mars-photos/api/v1/manifests/{rover}",
    note: "Mission manifest — date range, totals, operational status.",
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  const color = useColorModeValue("iron.400", "dust.400")
  return (
    <Text
      fontFamily="mono"
      fontSize="2xs"
      color={color}
      textTransform="uppercase"
      letterSpacing="0.18em"
    >
      {children}
    </Text>
  )
}

function About() {
  const accentColor = useColorModeValue("mars.600", "mars.400")
  const subtitleColor = useColorModeValue("iron.500", "dust.200")
  const mutedColor = useColorModeValue("iron.400", "dust.400")
  const ruleColor = useColorModeValue("dust.200", "iron.700")
  const codeBg = useColorModeValue("dust.100", "iron.800")
  const codeColor = useColorModeValue("iron.700", "dust.100")
  const dotInactive = useColorModeValue("iron.300", "iron.600")
  const valueColor = useColorModeValue("iron.700", "dust.100")
  const linkUnderline = useColorModeValue("dust.300", "iron.600")

  return (
    <Layout>
      <Box maxW="980px" mx="auto" pt={{ base: 2, md: 8 }}>
        {/* Hero — asymmetric: title block left, 3D Mars right */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "stretch", lg: "center" }}
          gap={{ base: 6, lg: 10 }}
          pb={{ base: 10, md: 14 }}
        >
          <Box flex="1.4" order={{ base: 2, lg: 1 }}>
            <Eyebrow>About this project</Eyebrow>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="700"
              letterSpacing="-0.04em"
              lineHeight="0.95"
              mt={3}
              mb={6}
            >
              A quiet window
              <Box as="span" display="block" color={accentColor}>
                onto Mars.
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={subtitleColor}
              maxW="48ch"
              lineHeight="1.55"
            >
              Real photos taken by NASA's rovers on the surface of another
              planet. Browse by rover, by Martian sol, by camera. Self-hosted, so
              the archive doesn't disappear when an API does.
            </Text>
          </Box>
          <Box
            flex="1"
            order={{ base: 1, lg: 2 }}
            display="flex"
            justifyContent={{ base: "center", lg: "flex-end" }}
          >
            <Suspense fallback={<Box w="280px" h="280px" />}>
              <Mars3D />
            </Suspense>
          </Box>
        </Flex>

        {/* Story */}
        <Box
          borderTopWidth="1px"
          borderColor={ruleColor}
          py={{ base: 10, md: 14 }}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }}>
            <Box w={{ base: "auto", md: "180px" }} flexShrink={0}>
              <Eyebrow>The story</Eyebrow>
            </Box>
            <Box flex="1" maxW="60ch">
              <Text fontSize={{ base: "md", md: "lg" }} mb={4} lineHeight="1.65">
                I built the original frontend years ago as a coding challenge
                against NASA's public Mars Rover Photos API. I kept coming back
                to browse the photos — there's something about seeing what
                another planet looks like through a rover's camera that I never
                got tired of.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color={subtitleColor} lineHeight="1.65">
                When the API was archived in 2025, I forked the{" "}
                <Link
                  href="https://github.com/corincerami/mars-photo-api"
                  isExternal
                  color={accentColor}
                  borderBottomWidth="1px"
                  borderColor={linkUnderline}
                  _hover={{ borderColor: accentColor }}
                >
                  original Rails backend
                </Link>{" "}
                by Corin Cerami and turned it into a self-hosted monorepo so I
                could keep it running on my own infrastructure.
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Rovers — list, not card grid */}
        <Box
          borderTopWidth="1px"
          borderColor={ruleColor}
          py={{ base: 10, md: 14 }}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }} mb={{ base: 6, md: 10 }}>
            <Box w={{ base: "auto", md: "180px" }} flexShrink={0}>
              <Eyebrow>The rovers</Eyebrow>
            </Box>
            <Text flex="1" maxW="60ch" fontSize={{ base: "md", md: "lg" }} color={subtitleColor}>
              Four robotic vehicles. Two still working, two completed. All of
              them carry scientific cameras whose images you can browse here.
            </Text>
          </Flex>

          <VStack
            align="stretch"
            spacing={0}
            divider={<Box borderTopWidth="1px" borderColor={ruleColor} />}
          >
            {ROVERS.map((rover) => (
              <Flex
                key={rover.name}
                py={6}
                gap={{ base: 4, md: 8 }}
                direction={{ base: "column", md: "row" }}
                align={{ base: "stretch", md: "baseline" }}
              >
                <Box w={{ base: "auto", md: "180px" }} flexShrink={0}>
                  <Heading
                    as="h3"
                    size="lg"
                    fontWeight="600"
                    letterSpacing="-0.02em"
                  >
                    {rover.name}
                  </Heading>
                  <HStack spacing={2} mt={1.5}>
                    <Box
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={rover.status === "active" ? "green.400" : dotInactive}
                    />
                    <Text
                      fontFamily="mono"
                      fontSize="xs"
                      color={mutedColor}
                      textTransform="uppercase"
                      letterSpacing="0.1em"
                    >
                      {rover.status === "active" ? "Active" : "Complete"} · {rover.landed}
                    </Text>
                  </HStack>
                </Box>
                <Box flex="1">
                  <Text fontSize="md" mb={2} maxW="60ch" lineHeight="1.6">
                    {rover.description}
                  </Text>
                  <HStack
                    spacing={4}
                    fontFamily="mono"
                    fontSize="xs"
                    color={mutedColor}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    flexWrap="wrap"
                  >
                    <Text>{rover.site}</Text>
                    <Text>·</Text>
                    <Text>{rover.cameras} cameras</Text>
                  </HStack>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* API */}
        <Box
          borderTopWidth="1px"
          borderColor={ruleColor}
          py={{ base: 10, md: 14 }}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }} mb={6}>
            <Box w={{ base: "auto", md: "180px" }} flexShrink={0}>
              <Eyebrow>The data source</Eyebrow>
            </Box>
            <Box flex="1" maxW="60ch">
              <Text fontSize={{ base: "md", md: "lg" }} mb={3} color={valueColor}>
                NASA Mars Photos API
              </Text>
              <Text fontSize="md" color={subtitleColor} lineHeight="1.65">
                The Rails backend acts as a cache and proxy in front of NASA's
                free public API. Up to 1,000 requests per hour with your own key
                from{" "}
                <Link
                  href="https://api.nasa.gov"
                  isExternal
                  color={accentColor}
                  borderBottomWidth="1px"
                  borderColor={linkUnderline}
                  _hover={{ borderColor: accentColor }}
                >
                  api.nasa.gov
                </Link>
                . Two endpoints carry the weight.
              </Text>
            </Box>
          </Flex>

          <VStack
            align="stretch"
            spacing={3}
            ml={{ base: 0, md: "180px" }}
            pl={{ base: 0, md: 12 }}
          >
            {ENDPOINTS.map((ep) => (
              <Box key={ep.path}>
                <Box
                  bg={codeBg}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  overflowX="auto"
                >
                  <Text
                    fontFamily="mono"
                    fontSize="sm"
                    color={codeColor}
                    whiteSpace="nowrap"
                  >
                    <Box as="span" color={accentColor} fontWeight="600" mr={2}>
                      {ep.method}
                    </Box>
                    {ep.path}
                  </Text>
                </Box>
                <Text fontSize="sm" color={mutedColor} mt={1.5} pl={1}>
                  {ep.note}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Stack */}
        <Box
          borderTopWidth="1px"
          borderColor={ruleColor}
          py={{ base: 10, md: 14 }}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }}>
            <Box w={{ base: "auto", md: "180px" }} flexShrink={0}>
              <Eyebrow>Built with</Eyebrow>
            </Box>
            <VStack
              flex="1"
              align="stretch"
              spacing={0}
              divider={<Box borderTopWidth="1px" borderColor={ruleColor} />}
            >
              {STACK.map((row) => (
                <Flex
                  key={row.label}
                  py={3.5}
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "stretch", sm: "baseline" }}
                  gap={{ base: 1, sm: 6 }}
                >
                  <Text
                    w={{ base: "auto", sm: "120px" }}
                    fontFamily="mono"
                    fontSize="xs"
                    color={mutedColor}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    flexShrink={0}
                  >
                    {row.label}
                  </Text>
                  <Text fontSize="md" color={valueColor}>
                    {row.value}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Flex>
        </Box>

        {/* Footer */}
        <Box
          borderTopWidth="1px"
          borderColor={ruleColor}
          pt={8}
          pb={{ base: 4, md: 8 }}
          mt={4}
        >
          <Wrap spacing={4} justify="space-between" align="center">
            <WrapItem>
              <Text fontFamily="mono" fontSize="xs" color={mutedColor} textTransform="uppercase" letterSpacing="0.12em">
                Mars rover photo data · NASA / JPL-Caltech
              </Text>
            </WrapItem>
            <WrapItem>
              <HStack spacing={5} fontFamily="mono" fontSize="xs">
                <Link
                  href="https://github.com/franpiaggio/mars_explorer"
                  isExternal
                  color={mutedColor}
                  _hover={{ color: accentColor }}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                >
                  Source on GitHub
                </Link>
                <Link
                  href="https://api.nasa.gov"
                  isExternal
                  color={mutedColor}
                  _hover={{ color: accentColor }}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                >
                  NASA Open APIs
                </Link>
              </HStack>
            </WrapItem>
          </Wrap>
        </Box>
      </Box>
    </Layout>
  )
}

export default About
