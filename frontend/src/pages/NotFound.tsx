import { Box, Heading, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Layout } from "@/layout"

function NotFound() {
  return (
    <Layout>
      <Box textAlign="center" py={16} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, mars.400, mars.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="lg" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color="gray.500" mb={6}>
          The page you're looking for does not seem to exist
        </Text>
        <Button
          as={Link}
          to="/"
          bg="mars.500"
          color="white"
          _hover={{ bg: "mars.600" }}
          borderRadius="xl"
        >
          Go to Home
        </Button>
      </Box>
    </Layout>
  )
}

export default NotFound
