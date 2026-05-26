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
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons"
import { useManifest, useAvailableDates, useRovers, useRoverPhotos } from "@/queries"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import CameraInfoModal from "@/components/CameraInfoModal/CameraInfoModal"
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
  const {
    isOpen: isCameraInfoOpen,
    onOpen: onCameraInfoOpen,
    onClose: onCameraInfoClose,
  } = useDisclosure()
  const { listRovers, roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()

  const toggleBg = useColorModeValue("dust.100", "iron.700")
  const toggleActiveBg = useColorModeValue("white", "iron.600")
  const selectBg = useColorModeValue("white", "iron.800")
  const borderColor = useColorModeValue("dust.200", "iron.700")
  const labelColor = useColorModeValue("iron.400", "dust.400")
  const navHoverBg = useColorModeValue("dust.100", "iron.700")

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
    <Box
      display={{ base: "none", md: "block" }}
      w="100%"
      role="complementary"
      aria-label="Photo filters"
    >
      <Flex align="stretch" gap={2} wrap="nowrap">
        <IconButton
          aria-label="Previous sol"
          icon={<ChevronLeftIcon boxSize={5} />}
          variant="ghost"
          isDisabled={!hasPrev || !state.rover}
          onClick={goToPrev}
          h="40px"
          minW="40px"
          borderRadius="lg"
          color={labelColor}
          _hover={{ bg: navHoverBg, color: "text.primary" }}
        />

        <Flex
          flex={1}
          align="center"
          justify="center"
          gap={2}
          wrap="wrap"
        >
          <Select
            value={state.rover?.id ?? ""}
            onChange={onSelectRover}
            disabled={!roversLoaded || isRefetching}
            size="sm"
            h="40px"
            borderRadius="lg"
            bg={selectBg}
            borderColor={borderColor}
            w="auto"
            minW="160px"
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
                  variant="outline"
                  h="40px"
                  bg={selectBg}
                  borderColor={borderColor}
                  borderRadius="lg"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<CalendarIcon boxSize={3.5} />}
                  fontWeight="500"
                  aria-label="Select date"
                >
                  {state.sol != null ? (
                    <Flex align="baseline" gap={2}>
                      <Text fontFamily="mono" fontWeight="600" fontSize="sm">
                        Sol {state.sol}
                      </Text>
                      {state.earth_date && (
                        <Text fontSize="xs" color={labelColor} fontFamily="mono">
                          {state.earth_date}
                        </Text>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="sm">Pick a date</Text>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                w="340px"
                borderRadius="xl"
                borderColor={borderColor}
                bg={selectBg}
                boxShadow="0 12px 32px rgba(0,0,0,0.25)"
                _focus={{ outline: "none" }}
              >
                <PopoverBody p={2.5}>
                  <ButtonGroup size="xs" mb={2.5} isAttached variant="outline" w="100%">
                    <Button
                      flex={1}
                      bg={dateView === "calendar" ? toggleActiveBg : toggleBg}
                      fontWeight={dateView === "calendar" ? "600" : "400"}
                      borderColor={borderColor}
                      onClick={() => setDateView("calendar")}
                    >
                      Calendar
                    </Button>
                    <Button
                      flex={1}
                      bg={dateView === "sol" ? toggleActiveBg : toggleBg}
                      fontWeight={dateView === "sol" ? "600" : "400"}
                      borderColor={borderColor}
                      onClick={() => setDateView("sol")}
                    >
                      Sol list
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

          {state.rover && (
            <Flex align="center" gap={1}>
              <Select
                onChange={onChangeCamera}
                disabled={isRefetching || availableCameras.length === 0}
                value={state.camera ? state.camera.id : "all"}
                size="sm"
                h="40px"
                borderRadius="lg"
                bg={selectBg}
                borderColor={borderColor}
                w="auto"
                maxW="280px"
                aria-label="Select camera"
              >
                <option value="all">All cameras ({availableCameras.length})</option>
                {availableCameras.map((camera: Camera) => (
                  <option key={camera.id} value={camera.id}>
                    {camera.full_name}
                  </option>
                ))}
              </Select>
              {state.camera && (
                <IconButton
                  aria-label="Camera info"
                  icon={<InfoOutlineIcon boxSize={3.5} />}
                  size="xs"
                  variant="ghost"
                  borderRadius="full"
                  onClick={onCameraInfoOpen}
                  minW="28px"
                  minH="28px"
                  color={labelColor}
                />
              )}
            </Flex>
          )}
        </Flex>

        <IconButton
          aria-label="Next sol"
          icon={<ChevronRightIcon boxSize={5} />}
          variant="ghost"
          isDisabled={!hasNext || !state.rover}
          onClick={goToNext}
          h="40px"
          minW="40px"
          borderRadius="lg"
          color={labelColor}
          _hover={{ bg: navHoverBg, color: "text.primary" }}
        />
      </Flex>

      {state.camera && (
        <CameraInfoModal
          isOpen={isCameraInfoOpen}
          onClose={onCameraInfoClose}
          cameraFullName={state.camera.full_name}
          roverName={state.rover?.name}
        />
      )}
    </Box>
  )
}

export default Filters
