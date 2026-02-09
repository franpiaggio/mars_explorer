import { useState, useCallback, useMemo } from "react"
import {
  Box,
  Flex,
  ButtonGroup,
  Button,
  Text,
  Select,
  IconButton,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react"
import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useManifest, useAvailableDates, useRovers, useRoverPhotos } from "@/queries"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import DatePicker from "@/components/DatePicker/DatePicker"
import SolList from "@/components/DatePicker/SolList"
import type { ManifestEntry, Camera, Rover } from "@/setup/types"

type DateView = "calendar" | "sol"

function Filters() {
  const [dateView, setDateView] = useState<DateView>("calendar")
  const { state, actions } = useFiltersContext()
  const { manifest, manifestEntries } = useManifest()
  const { availableDatesSet, dateToEntryMap, entries } = useAvailableDates()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { listRovers, roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()

  const toggleBg = useColorModeValue("gray.100", "whiteAlpha.100")
  const toggleActiveBg = useColorModeValue("white", "gray.600")
  const triggerBg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200")
  const textSecondary = useColorModeValue("gray.500", "whiteAlpha.600")
  const selectBg = useColorModeValue("white", "gray.700")

  // Prev/next sol navigation
  const currentIndex = useMemo(() => {
    if (state.sol == null) return -1
    return entries.findIndex((e: ManifestEntry) => e.sol === state.sol)
  }, [state.sol, entries])

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

  // Available cameras (inlined from SelectCamera)
  const availableCameras = useMemo(() => {
    if (!state.rover || state.sol == null) return []
    const entry = manifestEntries.find((e: ManifestEntry) => e.sol === state.sol)
    if (!entry) return []
    return state.rover.cameras.filter((cam: Camera) =>
      entry.cameras.includes(cam.name)
    )
  }, [state.rover, state.sol, manifestEntries])

  const handleDateSelect = useCallback(
    (entry: ManifestEntry) => {
      actions.setEarthDate(entry.earth_date, entry.sol)
      onClose()
    },
    [actions, onClose]
  )

  const onSelectRover = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roverId = parseInt(e.target.value)
    if (!isNaN(roverId) && listRovers?.rovers) {
      actions.setRover(roverId, listRovers.rovers)
    }
  }

  const onChangeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === "all") {
      actions.setDefaultCamera(null)
      return
    }
    actions.setCamera(parseInt(value))
  }

  return (
    <Box display={{ base: "none", md: "block" }} w="100%" role="complementary" aria-label="Photo filters">
      <Flex align="center" justify="space-between" wrap="nowrap">
        {/* Left arrow */}
        <IconButton
          aria-label="Previous sol"
          icon={<ChevronLeftIcon boxSize={6} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasPrev || !state.rover}
          onClick={goToPrev}
          borderRadius="full"
          minW="40px"
        />

        {/* Center controls */}
        <Flex gap={3} align="center" justify="center" flex={1}>
          {/* Rover - compact dropdown */}
          <Select
            value={state.rover?.id ?? ""}
            onChange={onSelectRover}
            disabled={!roversLoaded || isRefetching}
            size="sm"
            borderRadius="lg"
            bg={selectBg}
            borderColor={borderColor}
            w="auto"
            minW="150px"
            fontWeight="600"
            aria-label="Select rover"
          >
            {!state.rover && <option value="">Select rover</option>}
            {roversLoaded &&
              listRovers?.rovers
                ?.filter((r: Rover) => r.total_photos > 0)
                .map((r: Rover) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
          </Select>

          {/* Date popover */}
          {state.rover && (
            <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              placement="bottom"
              isLazy
            >
              <PopoverTrigger>
                <Button
                  size="sm"
                  variant="outline"
                  bg={triggerBg}
                  borderColor={borderColor}
                  borderRadius="lg"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<CalendarIcon boxSize={3} />}
                  fontWeight="500"
                  minH="32px"
                  aria-label="Select date"
                >
                  {state.sol != null ? (
                    <Flex align="center" gap={1.5}>
                      <Text fontSize="sm">Sol {state.sol}</Text>
                      {state.earth_date && (
                        <Text fontSize="xs" color={textSecondary}>
                          {state.earth_date}
                        </Text>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="sm">Pick a date</Text>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent w="320px" borderRadius="xl" boxShadow="lg" _focus={{ outline: "none" }}>
                <PopoverBody p={2}>
                  <ButtonGroup size="xs" mb={2} isAttached variant="outline" w="100%">
                    <Button
                      flex={1}
                      bg={dateView === "calendar" ? toggleActiveBg : toggleBg}
                      fontWeight={dateView === "calendar" ? "600" : "400"}
                      borderColor={borderColor}
                      onClick={() => setDateView("calendar")}
                      boxShadow={dateView === "calendar" ? "sm" : "none"}
                    >
                      Calendar
                    </Button>
                    <Button
                      flex={1}
                      bg={dateView === "sol" ? toggleActiveBg : toggleBg}
                      fontWeight={dateView === "sol" ? "600" : "400"}
                      borderColor={borderColor}
                      onClick={() => setDateView("sol")}
                      boxShadow={dateView === "sol" ? "sm" : "none"}
                    >
                      Sol List
                    </Button>
                  </ButtonGroup>

                  {dateView === "calendar" ? (
                    <DatePicker
                      availableDatesSet={availableDatesSet}
                      dateToEntryMap={dateToEntryMap}
                      selectedDate={state.earth_date ?? null}
                      onDateSelect={handleDateSelect}
                      minDate={manifest?.landing_date}
                      maxDate={manifest?.max_date}
                    />
                  ) : (
                    <SolList
                      entries={entries}
                      selectedSol={state.sol ?? null}
                      onSolSelect={handleDateSelect}
                      maxItems={30}
                    />
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}

          {/* Camera selector */}
          {state.rover && (
            <Select
              onChange={onChangeCamera}
              disabled={isRefetching || availableCameras.length === 0}
              value={state.camera ? state.camera.id : "all"}
              size="sm"
              borderRadius="lg"
              bg={selectBg}
              borderColor={borderColor}
              w="auto"
              maxW="260px"
              aria-label="Select camera"
            >
              <option value="all">All cameras ({availableCameras.length})</option>
              {availableCameras.map((camera: Camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.full_name}
                </option>
              ))}
            </Select>
          )}
        </Flex>

        {/* Right arrow */}
        <IconButton
          aria-label="Next sol"
          icon={<ChevronRightIcon boxSize={6} />}
          size="sm"
          variant="ghost"
          isDisabled={!hasNext || !state.rover}
          onClick={goToNext}
          borderRadius="full"
          minW="40px"
        />
      </Flex>
    </Box>
  )
}

export default Filters
