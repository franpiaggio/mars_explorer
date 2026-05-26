import { useMemo, useCallback } from "react"
import {
  Flex,
  IconButton,
  Text,
  Stack,
  HStack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import { useAvailableDates } from "@/queries"
import type { ManifestEntry } from "@/setup/types"

function MobileSolNav() {
  const { state, actions } = useFiltersContext()
  const { entries } = useAvailableDates()
  const bgColor = useColorModeValue("white", "iron.800")
  const borderColor = useColorModeValue("dust.200", "iron.700")
  const labelColor = useColorModeValue("iron.400", "dust.400")
  const valueColor = useColorModeValue("iron.700", "dust.100")

  const currentIndex = useMemo(() => {
    if (state.sol == null) return -1
    return entries.findIndex((e: ManifestEntry) => e.sol === state.sol)
  }, [state.sol, entries])

  const currentEntry = currentIndex >= 0 ? entries[currentIndex] : null
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < entries.length - 1 && currentIndex >= 0

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      const prev = entries[currentIndex - 1]
      actions.setEarthDate(prev.earth_date, prev.sol)
    }
  }, [hasPrev, currentIndex, entries, actions])

  const goToNext = useCallback(() => {
    if (hasNext) {
      const next = entries[currentIndex + 1]
      actions.setEarthDate(next.earth_date, next.sol)
    }
  }, [hasNext, currentIndex, entries, actions])

  if (!state.rover || !currentEntry) return null

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Flex
        align="center"
        justify="space-between"
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        px={1}
        py={1.5}
      >
        <IconButton
          aria-label="Previous sol"
          icon={<ChevronLeftIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasPrev}
          onClick={goToPrev}
          borderRadius="md"
          minW="40px"
          color={labelColor}
        />

        <Stack spacing={0} align="center" flex={1} minW={0}>
          <HStack spacing={2} align="baseline">
            <Text
              fontFamily="mono"
              fontWeight="600"
              fontSize="sm"
              color={valueColor}
              sx={{ fontVariantNumeric: "tabular-nums" }}
            >
              Sol {currentEntry.sol}
            </Text>
            <Text
              fontFamily="mono"
              fontSize="2xs"
              color="mars.400"
              fontWeight="600"
              sx={{ fontVariantNumeric: "tabular-nums" }}
            >
              {currentEntry.total_photos} photos
            </Text>
          </HStack>
          <Text
            fontFamily="mono"
            fontSize="2xs"
            color={labelColor}
            textTransform="uppercase"
            letterSpacing="0.1em"
          >
            {currentEntry.earth_date}
          </Text>
        </Stack>

        <IconButton
          aria-label="Next sol"
          icon={<ChevronRightIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasNext}
          onClick={goToNext}
          borderRadius="md"
          minW="40px"
          color={labelColor}
        />
      </Flex>
    </Box>
  )
}

export default MobileSolNav
