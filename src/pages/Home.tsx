import { Box, Divider } from "@chakra-ui/react"
import { Layout } from "@/layout"
import { Filters, PhotoGrid } from "@/components"

function Home() {
  return (
    <Layout>
      <Filters />
      <Box marginTop="50px" as="main">
        <Box marginBottom="50px">
          <Divider orientation="horizontal" />
        </Box>
        <PhotoGrid />
      </Box>
    </Layout>
  )
}

export default Home
