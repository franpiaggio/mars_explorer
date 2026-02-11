import {
  Heading,
  Box,
  Icon,
  Text,
  HStack,
  VStack,
  SimpleGrid,
  Badge,
  Flex,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react"
import {
  CheckIcon,
  ExternalLinkIcon,
  InfoIcon,
  StarIcon,
} from "@chakra-ui/icons"
import { Layout } from "@/layout"

const ROVERS = [
  {
    name: "Curiosity",
    status: "active",
    landingSite: "Gale Crater",
    description:
      "The largest and most capable rover sent to Mars. Equipped with 17 cameras, it has traveled over 30 km exploring evidence of water and past habitable conditions.",
    cameras: 17,
  },
  {
    name: "Opportunity",
    status: "complete",
    landingSite: "Meridiani Planum",
    description:
      "Designed for 90 days, it operated for nearly 15 years. It traveled 45 km, a record for off-Earth vehicles, until a global dust storm ended its mission in 2018.",
    cameras: 9,
  },
  {
    name: "Spirit",
    status: "complete",
    landingSite: "Gusev Crater",
    description:
      "Opportunity's twin. Found evidence of ancient hot springs and volcanic activity. Operated for 6 years until it became stuck in soft soil in 2009.",
    cameras: 9,
  },
  {
    name: "Perseverance",
    status: "active",
    landingSite: "Jezero Crater",
    description:
      "NASA's most advanced rover. Searching for signs of ancient microbial life, collecting rock samples, and carrying Ingenuity, the first helicopter to fly on another planet.",
    cameras: 23,
  },
]

const TECH_STACK = [
  "Vite + React + TypeScript",
  "React Query (TanStack)",
  "Vitest + React Testing Library",
  "React Router v6",
  "Chakra UI",
  "ESLint + Prettier",
  "Rails API Backend",
  "Docker Compose",
]

const NASA_API_ENDPOINTS = [
  {
    name: "Mars Rover Photos",
    path: "/mars-photos/api/v1/rovers/{rover}/photos",
    description:
      "Real photos taken by the rovers, filterable by Martian sol, Earth date, and camera.",
  },
  {
    name: "Rover Manifest",
    path: "/mars-photos/api/v1/manifests/{rover}",
    description:
      "Mission information: total photos, date range, and operational status of the rover.",
  },
]

function SectionCard({ children }: { children: React.ReactNode }) {
  const bg = useColorModeValue("white", "gray.800")
  const border = useColorModeValue("gray.100", "gray.700")

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={border}
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
      shadow="sm"
    >
      {children}
    </Box>
  )
}

function About() {
  const accentColor = useColorModeValue("mars.500", "mars.400")
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.700")
  const mutedColor = useColorModeValue("gray.500", "whiteAlpha.600")
  const labelColor = useColorModeValue("gray.500", "whiteAlpha.500")
  const checkBg = useColorModeValue("mars.50", "rgba(217, 90, 50, 0.15)")
  const codeBg = useColorModeValue("gray.100", "whiteAlpha.100")
  const codeColor = useColorModeValue("mars.600", "mars.300")
  const roverCardBg = useColorModeValue("gray.50", "gray.750")
  const roverCardBorder = useColorModeValue("gray.200", "gray.600")

  return (
    <Layout>
      <Box
        pt={{ base: 4, md: 8 }}
        pb={{ base: 8, md: 12 }}
        px={{ base: 2, md: 4 }}
        maxW="3xl"
        mx="auto"
      >
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          {/* Hero */}
          <Box textAlign="center" py={{ base: 4, md: 6 }}>
            <Text fontSize={{ base: "4xl", md: "5xl" }} mb={3} lineHeight={1}>
              🔴
            </Text>
            <Heading size={{ base: "lg", md: "xl" }} mb={3}>
              Mars Explorer
            </Heading>
            <Text
              color={subtitleColor}
              fontSize={{ base: "md", md: "lg" }}
              maxW="xl"
              mx="auto"
              lineHeight="tall"
            >
              Browse real photos taken by NASA's rovers on the surface of Mars.
              Filter by rover, camera, Martian sol, or Earth date, and save your
              favorites.
            </Text>
          </Box>

          {/* Rovers */}
          <SectionCard>
            <HStack spacing={2} mb={1}>
              <Icon as={StarIcon} color={accentColor} boxSize={4} />
              <Heading size="md">The Rovers</Heading>
            </HStack>
            <Text color={subtitleColor} mb={5} fontSize="sm">
              Four robotic vehicles that have explored Mars with high-resolution
              scientific cameras.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {ROVERS.map((rover) => (
                <Box
                  key={rover.name}
                  p={4}
                  borderRadius="xl"
                  bg={roverCardBg}
                  borderWidth="1px"
                  borderColor={roverCardBorder}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading size="sm">{rover.name}</Heading>
                    <Badge
                      colorScheme={rover.status === "active" ? "green" : "gray"}
                      borderRadius="full"
                      px={2}
                      fontSize="xs"
                    >
                      {rover.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm" color={subtitleColor} mb={3}>
                    {rover.description}
                  </Text>
                  <HStack spacing={4} fontSize="xs" color={labelColor}>
                    <Text>📍 {rover.landingSite}</Text>
                    <Text>📷 {rover.cameras} cameras</Text>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </SectionCard>

          {/* NASA API */}
          <SectionCard>
            <HStack spacing={2} mb={1}>
              <Icon as={ExternalLinkIcon} color={accentColor} boxSize={4} />
              <Heading size="md">NASA Mars Photos API</Heading>
            </HStack>
            <Text color={subtitleColor} mb={5} fontSize="sm">
              The backend is a fork of{" "}
              <Text as="span" color={accentColor} fontWeight={600}>
                chris-greening/mars-rover-photos-api
              </Text>
              , a Rails API with scrapers that fetch and cache data from NASA's
              free public API. You can get your own API key at{" "}
              <Text as="span" color={accentColor} fontWeight={600}>
                api.nasa.gov
              </Text>
              . The main endpoints we use:
            </Text>

            <VStack spacing={3} align="stretch">
              {NASA_API_ENDPOINTS.map((ep) => (
                <Box key={ep.name}>
                  <Text fontWeight={600} fontSize="sm" mb={1}>
                    {ep.name}
                  </Text>
                  <Box
                    bg={codeBg}
                    px={3}
                    py={1.5}
                    borderRadius="lg"
                    mb={1.5}
                    overflowX="auto"
                  >
                    <Text
                      fontFamily="mono"
                      fontSize="xs"
                      color={codeColor}
                      whiteSpace="nowrap"
                    >
                      GET {ep.path}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color={mutedColor}>
                    {ep.description}
                  </Text>
                </Box>
              ))}
            </VStack>

            <Divider my={4} />

            <HStack spacing={2}>
              <Icon as={InfoIcon} color={mutedColor} boxSize={3} />
              <Text fontSize="xs" color={mutedColor}>
                The API allows up to 1,000 requests per hour with a free key.
                This project uses a Rails backend as a proxy to cache responses
                and protect your API key.
              </Text>
            </HStack>
          </SectionCard>

          {/* Tech Stack */}
          <SectionCard>
            <HStack spacing={2} mb={1}>
              <Icon as={CheckIcon} color={accentColor} boxSize={4} />
              <Heading size="md">Tech Stack</Heading>
            </HStack>
            <Text color={subtitleColor} mb={5} fontSize="sm">
              Technologies used in this project.
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
              {TECH_STACK.map((item) => (
                <HStack key={item} spacing={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w={5}
                    h={5}
                    borderRadius="full"
                    bg={checkBg}
                    flexShrink={0}
                  >
                    <Icon as={CheckIcon} boxSize={2.5} color={accentColor} />
                  </Box>
                  <Text fontSize="sm" fontWeight={500}>
                    {item}
                  </Text>
                </HStack>
              ))}
            </SimpleGrid>
          </SectionCard>

          {/* Footer note */}
          <Text textAlign="center" fontSize="xs" color={mutedColor} pt={2}>
            Built with open data from NASA Open APIs
          </Text>
        </VStack>
      </Box>
    </Layout>
  )
}

export default About
