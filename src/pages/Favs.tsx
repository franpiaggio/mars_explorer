import { Box } from "@chakra-ui/react"
import { Layout } from "@/layout"
import { FavsGrid, ScrollToTop } from "@/components"

function Favs() {
  return (
    <Layout>
      <Box marginTop="50px" as="main">
        <FavsGrid />
        <ScrollToTop />
      </Box>
    </Layout>
  )
}

export default Favs
