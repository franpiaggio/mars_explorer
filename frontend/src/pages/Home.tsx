import { useState, useEffect, useMemo } from "react"
import {
  Box,
  Flex,
  IconButton,
  ButtonGroup,
  Text,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { Layout } from "@/layout"
import { Filters, PhotoGrid, ScrollToTop } from "@/components"
import MobileSolNav from "@/components/MobileSolNav/MobileSolNav"
import { useFiltersContext } from "@/hooks"
import { useRoverPhotos, useAvailableDates } from "@/queries"
import type { ManifestEntry } from "@/setup/types"

type GridView = "grid" | "list"

function GridIcon() {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="2px" w="11px" h="11px">
      <Box bg="currentColor" />
      <Box bg="currentColor" />
      <Box bg="currentColor" />
      <Box bg="currentColor" />
    </Box>
  )
}

function ListIcon() {
  return (
    <Flex direction="column" gap="2px" w="12px" h="12px" justify="center">
      <Box h="2px" w="100%" bg="currentColor" />
      <Box h="2px" w="100%" bg="currentColor" />
      <Box h="2px" w="100%" bg="currentColor" />
    </Flex>
  )
}

function Home() {
  const [gridView, setGridView] = useState<GridView>("grid")
  const { state, actions } = useFiltersContext()
  const { roverData } = useRoverPhotos()
  const { entries } = useAvailableDates()
  const toggleBg = useColorModeValue("dust.100", "iron.700")
  const toggleActiveBg = useColorModeValue("white", "iron.600")
  const borderColor = useColorModeValue("dust.200", "iron.700")
  const labelColor = useColorModeValue("iron.400", "dust.400")
  const valueColor = useColorModeValue("iron.700", "dust.100")
  const subtleBorder = useColorModeValue("dust.200", "iron.700")

  const earthDate =
    state.earth_date || (roverData.length > 0 ? roverData[0].earth_date : null)

  const currentEntry = useMemo<ManifestEntry | null>(() => {
    if (state.sol == null) return null
    return entries.find((e: ManifestEntry) => e.sol === state.sol) ?? null
  }, [state.sol, entries])

  const formattedDate = useMemo(() => {
    if (!earthDate) return null
    const [year, month, day] = earthDate.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [earthDate])

  useEffect(() => {
    return () => {
      actions.setDefaultValues(null)
    }
  }, [])

  const photoCount = currentEntry?.total_photos ?? roverData.length

  return (
    <Layout>
      <Stack spacing={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
        {/* Instrument readout — mono metadata strip */}
        <Box display={{ base: "none", md: "block" }}>
          <Flex
            align="baseline"
            justify="space-between"
            gap={6}
            borderBottomWidth="1px"
            borderColor={subtleBorder}
            pb={4}
          >
            <Flex align="baseline" gap={{ base: 4, lg: 8 }} flexWrap="wrap">
              <Stack spacing={0.5}>
                <Text
                  fontFamily="mono"
                  fontSize="2xs"
                  color={labelColor}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                >
                  Rover
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  fontWeight="600"
                  letterSpacing="-0.02em"
                  color={valueColor}
                >
                  {state.rover?.name ?? "—"}
                </Text>
              </Stack>

              <Stack spacing={0.5}>
                <Text
                  fontFamily="mono"
                  fontSize="2xs"
                  color={labelColor}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                >
                  Martian sol
                </Text>
                <Text
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight="600"
                  color={valueColor}
                  sx={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {state.sol != null ? state.sol.toLocaleString() : "—"}
                </Text>
              </Stack>

              <Stack spacing={0.5}>
                <Text
                  fontFamily="mono"
                  fontSize="2xs"
                  color={labelColor}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                >
                  Earth date
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="500"
                  letterSpacing="-0.01em"
                  color={valueColor}
                >
                  {formattedDate ?? "—"}
                </Text>
              </Stack>

              {photoCount > 0 && (
                <Stack spacing={0.5}>
                  <Text
                    fontFamily="mono"
                    fontSize="2xs"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                  >
                    Photos
                  </Text>
                  <HStack spacing={1.5} align="baseline">
                    <Text
                      fontFamily="mono"
                      fontSize="lg"
                      fontWeight="600"
                      color={valueColor}
                      sx={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {photoCount.toLocaleString()}
                    </Text>
                    {state.camera && (
                      <Text fontSize="xs" color={labelColor} fontFamily="mono">
                        · {state.camera.name}
                      </Text>
                    )}
                  </HStack>
                </Stack>
              )}
            </Flex>

            <ButtonGroup size="xs" isAttached variant="outline">
              <IconButton
                aria-label="Grid view"
                icon={<GridIcon />}
                bg={gridView === "grid" ? toggleActiveBg : toggleBg}
                borderColor={borderColor}
                onClick={() => setGridView("grid")}
              />
              <IconButton
                aria-label="List view"
                icon={<ListIcon />}
                bg={gridView === "list" ? toggleActiveBg : toggleBg}
                borderColor={borderColor}
                onClick={() => setGridView("list")}
              />
            </ButtonGroup>
          </Flex>
        </Box>

        <Filters />
        <MobileSolNav />

        <Box as="section">
          <PhotoGrid gridView={gridView} />
          <ScrollToTop />
        </Box>
      </Stack>
    </Layout>
  )
}

export default Home
