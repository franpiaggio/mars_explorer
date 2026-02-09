import {
  Heading,
  Box,
  Icon,
  Text,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { Layout } from "@/layout"

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

function About() {
  const checkColor = useColorModeValue("mars.500", "mars.400")
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.700")

  return (
    <Layout>
      <Box pt={{ base: 4, md: 6 }} px={{ base: 2, md: 4 }} maxW="lg">
        <Heading size="lg" mb={2}>
          About Mars Explorer
        </Heading>
        <Text color={subtitleColor} mb={6}>
          A self-hosted Mars Rover photo explorer built with the following technologies:
        </Text>
        <VStack spacing={3} align="stretch">
          {TECH_STACK.map((item) => (
            <HStack key={item} spacing={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={6}
                h={6}
                borderRadius="full"
                bg={useColorModeValue("mars.50", "rgba(217, 90, 50, 0.15)")}
                flexShrink={0}
              >
                <Icon as={CheckIcon} boxSize={3} color={checkColor} />
              </Box>
              <Text fontWeight={500}>{item}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Layout>
  )
}

export default About
