import { Link } from "react-router-dom"
import { Center, Heading, Box } from "@chakra-ui/react"
import { Layout } from "@/components"
function NotFound() {
  return (
    <Layout>
      <Box textAlign="center">
        <Heading as="h1" size="md">
          Oops!
        </Heading>
        <p>No existe esta sección.</p>
        <Link to={"/"}> Volver </Link>
      </Box>
    </Layout>
  )
}

export default NotFound
