import { useState, useMemo, useCallback } from "react"
import {
  Box,
  Grid,
  GridItem,
  Text,
  IconButton,
  Flex,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isSameMonth, parseISO } from "date-fns"
import type { ManifestEntry } from "@/setup/types"

interface DatePickerProps {
  availableDatesSet: Set<string>
  dateToEntryMap: Map<string, ManifestEntry>
  selectedDate: string | null
  onDateSelect: (entry: ManifestEntry) => void
  minDate?: string
  maxDate?: string
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function DatePicker({
  availableDatesSet,
  dateToEntryMap,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
}: DatePickerProps) {
  const initialMonth = useMemo(() => {
    if (selectedDate) return startOfMonth(parseISO(selectedDate))
    if (maxDate) return startOfMonth(parseISO(maxDate))
    return startOfMonth(new Date())
  }, [])

  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth)

  const bgSurface = useColorModeValue("white", "gray.700")
  const bgHover = useColorModeValue("gray.100", "whiteAlpha.200")
  const textMuted = useColorModeValue("gray.400", "whiteAlpha.400")
  const textPrimary = useColorModeValue("gray.800", "whiteAlpha.900")
  const selectedBg = useColorModeValue("mars.500", "mars.500")
  const availableBg = useColorModeValue("mars.50", "rgba(217, 90, 50, 0.15)")
  const headerBg = useColorModeValue("gray.50", "whiteAlpha.50")

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const allDays = eachDayOfInterval({ start, end })
    const startDayOfWeek = getDay(start)
    const paddingBefore = Array(startDayOfWeek).fill(null)
    return [...paddingBefore, ...allDays]
  }, [currentMonth])

  const canGoNext = useMemo(() => {
    if (!maxDate) return true
    const nextMonth = addMonths(currentMonth, 1)
    return nextMonth <= startOfMonth(addMonths(parseISO(maxDate), 1))
  }, [currentMonth, maxDate])

  const canGoPrev = useMemo(() => {
    if (!minDate) return true
    const prevMonth = subMonths(currentMonth, 1)
    return prevMonth >= startOfMonth(parseISO(minDate))
  }, [currentMonth, minDate])

  const handlePrevMonth = useCallback(() => {
    if (canGoPrev) setCurrentMonth((m) => subMonths(m, 1))
  }, [canGoPrev])

  const handleNextMonth = useCallback(() => {
    if (canGoNext) setCurrentMonth((m) => addMonths(m, 1))
  }, [canGoNext])

  const handleDateClick = useCallback(
    (day: Date) => {
      const dateStr = format(day, "yyyy-MM-dd")
      const entry = dateToEntryMap.get(dateStr)
      if (entry) onDateSelect(entry)
    },
    [dateToEntryMap, onDateSelect]
  )

  return (
    <Box
      bg={bgSurface}
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}
    >
      <Flex
        justify="space-between"
        align="center"
        px={3}
        py={2}
        bg={headerBg}
      >
        <IconButton
          aria-label="Previous month"
          icon={<ChevronLeftIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          onClick={handlePrevMonth}
          isDisabled={!canGoPrev}
        />
        <Text fontWeight="600" fontSize="sm">
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <IconButton
          aria-label="Next month"
          icon={<ChevronRightIcon boxSize={5} />}
          size="sm"
          variant="ghost"
          onClick={handleNextMonth}
          isDisabled={!canGoNext}
        />
      </Flex>

      <Box px={2} pb={2} role="grid" aria-label="Calendar">
        <Grid templateColumns="repeat(7, 1fr)" gap={0} role="row">
          {WEEKDAYS.map((day) => (
            <GridItem key={day} textAlign="center" py={1}>
              <Text fontSize="xs" fontWeight="600" color={textMuted}>
                {day}
              </Text>
            </GridItem>
          ))}

          {days.map((day, idx) => {
            if (!day) {
              return <GridItem key={`empty-${idx}`} />
            }

            const dateStr = format(day, "yyyy-MM-dd")
            const isAvailable = availableDatesSet.has(dateStr)
            const isSelected = selectedDate === dateStr
            const entry = dateToEntryMap.get(dateStr)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isToday = isSameDay(day, new Date())

            return (
              <GridItem key={dateStr} textAlign="center">
                <Box
                  as="button"
                  w="100%"
                  py={1}
                  px={0.5}
                  borderRadius="md"
                  cursor={isAvailable ? "pointer" : "default"}
                  bg={isSelected ? selectedBg : isAvailable ? availableBg : "transparent"}
                  color={
                    isSelected
                      ? "white"
                      : isAvailable
                      ? textPrimary
                      : textMuted
                  }
                  fontWeight={isSelected ? "700" : isAvailable ? "500" : "400"}
                  fontSize="sm"
                  _hover={isAvailable && !isSelected ? { bg: bgHover } : {}}
                  onClick={() => isAvailable && handleDateClick(day)}
                  opacity={isCurrentMonth ? 1 : 0.4}
                  position="relative"
                  aria-label={
                    isAvailable
                      ? `${dateStr}, ${entry?.total_photos} photos available`
                      : `${dateStr}, no photos`
                  }
                  aria-selected={isSelected}
                  disabled={!isAvailable}
                >
                  <Text
                    lineHeight="1.3"
                    borderBottom={isToday ? "2px solid" : "none"}
                    borderColor={isSelected ? "white" : "mars.400"}
                    display="inline"
                  >
                    {format(day, "d")}
                  </Text>
                  {isAvailable && entry && (
                    <Badge
                      position="absolute"
                      bottom="-2px"
                      left="50%"
                      transform="translateX(-50%)"
                      bg={isSelected ? "whiteAlpha.600" : "mars.400"}
                      color={isSelected ? "mars.800" : "white"}
                      fontSize="6px"
                      lineHeight="1"
                      px={1}
                      borderRadius="full"
                      minW="auto"
                    >
                      {entry.total_photos > 999 ? "1k+" : entry.total_photos}
                    </Badge>
                  )}
                </Box>
              </GridItem>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default DatePicker
