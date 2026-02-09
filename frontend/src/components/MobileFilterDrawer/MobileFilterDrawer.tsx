import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react"
import { SelectRover, SelectCamera } from "@/components"
import DatePicker from "@/components/DatePicker/DatePicker"
import SolList from "@/components/DatePicker/SolList"
import { useAvailableDates } from "@/queries"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import { useManifest } from "@/queries"
import type { ManifestEntry } from "@/setup/types"
import { useCallback } from "react"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function MobileFilterDrawer({ isOpen, onClose }: MobileFilterDrawerProps) {
  const { state, actions } = useFiltersContext()
  const { manifest } = useManifest()
  const { availableDatesSet, dateToEntryMap, entries } = useAvailableDates()
  const handleBg = useColorModeValue("gray.300", "whiteAlpha.300")

  const handleDateSelect = useCallback(
    (entry: ManifestEntry) => {
      actions.setEarthDate(entry.earth_date, entry.sol)
      onClose()
    },
    [actions, onClose]
  )

  const handleSolSelect = useCallback(
    (entry: ManifestEntry) => {
      actions.setEarthDate(entry.earth_date, entry.sol)
      onClose()
    },
    [actions, onClose]
  )

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius="2xl"
        maxH="85vh"
      >
        <Box
          w="40px"
          h="4px"
          bg={handleBg}
          borderRadius="full"
          mx="auto"
          mt={2}
        />
        <DrawerCloseButton />
        <DrawerHeader pb={1}>
          <Text fontSize="lg" fontWeight="700">
            Filters
          </Text>
        </DrawerHeader>

        <DrawerBody pb={8} overflowY="auto">
          <VStack spacing={4} align="stretch">
            <SelectRover />

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2}>
                Pick a Date
              </Text>
              <DatePicker
                availableDatesSet={availableDatesSet}
                dateToEntryMap={dateToEntryMap}
                selectedDate={state.earth_date ?? null}
                onDateSelect={handleDateSelect}
                minDate={manifest?.landing_date}
                maxDate={manifest?.max_date}
              />
            </Box>

            <Box>
              <SolList
                entries={entries}
                selectedSol={state.sol ?? null}
                onSolSelect={handleSolSelect}
              />
            </Box>

            <Divider />

            <SelectCamera />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileFilterDrawer
