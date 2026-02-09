import { useState, useEffect } from "react"
import { Box, Flex, IconButton, ButtonGroup, useColorModeValue } from "@chakra-ui/react"
import { Layout } from "@/layout"
import { Filters, PhotoGrid, ScrollToTop } from "@/components"
import MobileSolNav from "@/components/MobileSolNav/MobileSolNav"
import { useFiltersContext } from "@/hooks"

type GridView = "grid" | "list"

function GridIcon() {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="2px" w="12px" h="12px">
      <Box bg="currentColor" borderRadius="1px" />
      <Box bg="currentColor" borderRadius="1px" />
      <Box bg="currentColor" borderRadius="1px" />
      <Box bg="currentColor" borderRadius="1px" />
    </Box>
  )
}

function ListIcon() {
  return (
    <Flex direction="column" gap="2px" w="12px" h="12px" justify="center">
      <Box h="2px" w="100%" bg="currentColor" borderRadius="1px" />
      <Box h="2px" w="100%" bg="currentColor" borderRadius="1px" />
      <Box h="2px" w="100%" bg="currentColor" borderRadius="1px" />
    </Flex>
  )
}

function Home() {
  const [gridView, setGridView] = useState<GridView>("grid")
  const { actions } = useFiltersContext()
  const toggleBg = useColorModeValue("gray.100", "whiteAlpha.100")
  const toggleActiveBg = useColorModeValue("white", "gray.600")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200")

  useEffect(() => {
    return () => {
      actions.setDefaultValues(null)
    }
  }, [])

  return (
    <Layout>
      <Box pt={{ base: 2, md: 4 }}>
        <Filters />
        <MobileSolNav />
        <Box mt={{ base: 2, md: 3 }} as="main">
          <Flex justify="flex-end" mb={2}>
            <ButtonGroup size="xs" isAttached variant="outline">
              <IconButton
                aria-label="Grid view"
                icon={<GridIcon />}
                bg={gridView === "grid" ? toggleActiveBg : toggleBg}
                borderColor={borderColor}
                onClick={() => setGridView("grid")}
                boxShadow={gridView === "grid" ? "sm" : "none"}
              />
              <IconButton
                aria-label="List view"
                icon={<ListIcon />}
                bg={gridView === "list" ? toggleActiveBg : toggleBg}
                borderColor={borderColor}
                onClick={() => setGridView("list")}
                boxShadow={gridView === "list" ? "sm" : "none"}
              />
            </ButtonGroup>
          </Flex>
          <PhotoGrid gridView={gridView} />
          <ScrollToTop />
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
