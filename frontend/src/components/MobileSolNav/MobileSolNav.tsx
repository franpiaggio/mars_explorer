import { useMemo, useCallback } from "react"
import {
  Flex,
  IconButton,
  Text,
  Badge,
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
  const bgColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const textSecondary = useColorModeValue("gray.500", "whiteAlpha.600")

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
        borderRadius="xl"
        px={1}
        py={1}
      >
        <IconButton
          aria-label="Previous sol"
          icon={<ChevronLeftIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasPrev}
          onClick={goToPrev}
          borderRadius="full"
          minW="40px"
        />

        <Flex direction="column" align="center" flex={1} minW={0}>
          <Flex align="center" gap={2}>
            <Text fontSize="sm" fontWeight="600">
              Sol {currentEntry.sol}
            </Text>
            <Badge colorScheme="orange" fontSize="10px" borderRadius="full">
              {currentEntry.total_photos}
            </Badge>
          </Flex>
          <Text fontSize="xs" color={textSecondary}>
            {currentEntry.earth_date}
          </Text>
        </Flex>

        <IconButton
          aria-label="Next sol"
          icon={<ChevronRightIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasNext}
          onClick={goToNext}
          borderRadius="full"
          minW="40px"
        />
      </Flex>
    </Box>
  )
}

export default MobileSolNav
