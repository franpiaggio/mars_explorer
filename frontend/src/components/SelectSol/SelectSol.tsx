import { useCallback } from "react"
import { Box, FormControl, FormLabel, Skeleton, VStack } from "@chakra-ui/react"
import { useManifest, useAvailableDates } from "@/queries"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import DatePicker from "@/components/DatePicker/DatePicker"
import SolList from "@/components/DatePicker/SolList"
import type { ManifestEntry } from "@/setup/types"

function SelectSol() {
  const { state, actions } = useFiltersContext()
  const { manifest, isLoading } = useManifest()
  const { availableDatesSet, dateToEntryMap, entries } = useAvailableDates()
  const hasRover = !!state.rover

  const handleDateSelect = useCallback(
    (entry: ManifestEntry) => {
      actions.setEarthDate(entry.earth_date, entry.sol)
    },
    [actions]
  )

  const handleSolSelect = useCallback(
    (entry: ManifestEntry) => {
      actions.setEarthDate(entry.earth_date, entry.sol)
    },
    [actions]
  )

  if (!hasRover || isLoading) {
    return (
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="600">
          Date / Sol
        </FormLabel>
        <Skeleton height="200px" borderRadius="xl" />
      </FormControl>
    )
  }

  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="600">
        Date / Sol
      </FormLabel>
      <VStack spacing={3} align="stretch">
        <DatePicker
          availableDatesSet={availableDatesSet}
          dateToEntryMap={dateToEntryMap}
          selectedDate={state.earth_date ?? null}
          onDateSelect={handleDateSelect}
          minDate={manifest?.landing_date}
          maxDate={manifest?.max_date}
        />
        <SolList
          entries={entries}
          selectedSol={state.sol ?? null}
          onSolSelect={handleSolSelect}
        />
      </VStack>
    </FormControl>
  )
}

export default SelectSol
