import { Box } from "@chakra-ui/react"
import { Layout } from "@/layout"
import { FavsGrid, ScrollToTop } from "@/components"

function Favs() {
  return (
    <Layout>
      <Box pt={{ base: 2, md: 4 }} as="section">
        <FavsGrid />
        <ScrollToTop />
      </Box>
    </Layout>
  )
}

export default Favs
