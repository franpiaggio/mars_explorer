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
  const handleBg = useColorModeValue("dust.300", "iron.600")
  const labelColor = useColorModeValue("iron.400", "dust.400")
  const dividerColor = useColorModeValue("dust.200", "iron.700")

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

  const Label = ({ children }: { children: React.ReactNode }) => (
    <Text
      fontFamily="mono"
      fontSize="2xs"
      color={labelColor}
      textTransform="uppercase"
      letterSpacing="0.14em"
      mb={2}
    >
      {children}
    </Text>
  )

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="2xl" maxH="88vh">
        <Box
          w="36px"
          h="4px"
          bg={handleBg}
          borderRadius="full"
          mx="auto"
          mt={2}
        />
        <DrawerCloseButton />
        <DrawerHeader pb={1}>
          <Text fontSize="lg" fontWeight="700" letterSpacing="-0.02em">
            Filters
          </Text>
        </DrawerHeader>

        <DrawerBody pb={8} overflowY="auto">
          <VStack spacing={5} align="stretch">
            <Box>
              <Label>Rover</Label>
              <SelectRover />
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Label>Pick a date</Label>
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
              <Label>By sol</Label>
              <SolList
                entries={entries}
                selectedSol={state.sol ?? null}
                onSolSelect={handleSolSelect}
              />
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Label>Camera</Label>
              <SelectCamera />
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileFilterDrawer
