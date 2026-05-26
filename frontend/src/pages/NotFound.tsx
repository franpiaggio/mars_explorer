import { Box, Heading, Text, Button, Stack, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Layout } from "@/layout"

function NotFound() {
  const accentColor = useColorModeValue("mars.600", "mars.400")
  const subtitleColor = useColorModeValue("iron.500", "dust.200")
  const labelColor = useColorModeValue("iron.400", "dust.400")

  return (
    <Layout>
      <Box
        maxW="540px"
        mx="auto"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <Text
          fontFamily="mono"
          fontSize="2xs"
          color={labelColor}
          textTransform="uppercase"
          letterSpacing="0.2em"
          mb={4}
        >
          Signal lost
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "6xl", md: "7xl" }}
          fontWeight="700"
          color={accentColor}
          letterSpacing="-0.05em"
          lineHeight="0.9"
          mb={3}
          sx={{ fontVariantNumeric: "tabular-nums" }}
        >
          404
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="600"
          letterSpacing="-0.02em"
          mb={2}
        >
          This page is somewhere on Mars.
        </Text>
        <Text fontSize="md" color={subtitleColor} mb={8}>
          The address you tried doesn't resolve to anything in this archive.
          Head back to the surface.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} spacing={3} justify="center">
          <Button
            as={Link}
            to="/"
            variant="mars"
            size="md"
            h="44px"
            px={6}
          >
            Back to Explore
          </Button>
          <Button
            as={Link}
            to="/about"
            variant="outline"
            size="md"
            h="44px"
            px={6}
            fontWeight="500"
          >
            About the project
          </Button>
        </Stack>
      </Box>
    </Layout>
  )
}

export default NotFound
