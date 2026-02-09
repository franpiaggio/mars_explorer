import { Box } from "@chakra-ui/react"
import { Layout } from "@/layout"
import { FavsGrid, ScrollToTop } from "@/components"

function Favs() {
  return (
    <Layout>
      <Box pt={{ base: 4, md: 6 }} as="main">
        <FavsGrid />
        <ScrollToTop />
      </Box>
    </Layout>
  )
}

export default Favs
