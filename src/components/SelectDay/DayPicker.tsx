import { useContext, useMemo, useEffect, useState } from "react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useDebounce } from "@/hooks/"
import { useRovers } from "@/queries/useRovers"
import { useFormatedDate } from "@/hooks"
import { useRoverPhotos } from "@/queries"
import { DayType } from "@/components/SelectDay/DayType"
import { formatToAllowedDate, formatDateToPicker } from "@/hooks/useFormatedDate"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function DayPicker() {
  const { state, actions } = useFiltersContext()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const [inputDate, setInputDate] = useState("1")
  const debouncedValue = useDebounce(inputDate, 500)
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const dayType = useMemo(() => state.dayType, [state.dayType])
  const earthDay = useMemo(() => {
    if (state.day && dayType === DayType.EARTH) {
      return formatDateToPicker(state.day)
    }
    return undefined
  }, [state.day])
  const maxEarthDay = selectedRover
    ? formatDateToPicker(selectedRover?.max_date)
    : undefined
  const minEarthDay = selectedRover
    ? formatDateToPicker(selectedRover?.landing_date)
    : undefined

  const onChangeDay = (value: string) => {
    setInputDate(value)
  }

  const onChangeEarthDay = (e: any) => {
    actions.setDay(formatToAllowedDate(useFormatedDate(e)))
  }

  useEffect(() => {
    setInputDate(String(selectedRover?.max_sol))
  }, [selectedRover])

  useEffect(() => {
    if (dayType === DayType.SOL) {
      actions.setDay(inputDate)
    }
  }, [debouncedValue])

  if (dayType === DayType.SOL) {
    return (
      <Box>
        <h2>Day. Max: {selectedRover?.max_sol}</h2>
        <NumberInput
          value={inputDate}
          max={selectedRover?.max_sol ? selectedRover?.max_sol : undefined}
          placeholder={roversLoaded ? "Martian Day..." : "Loading"}
          clampValueOnBlur={false}
          onChange={onChangeDay}
        >
          <NumberInputField disabled={!selectedRover || isRefetching} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    )
  }
  return (
    <Box>
      <h2>Day Max: {selectedRover?.max_date}</h2>
      <SingleDatepicker
        disabled={!selectedRover || isRefetching}
        name="date-input"
        date={earthDay}
        onDateChange={onChangeEarthDay}
        minDate={minEarthDay}
        maxDate={maxEarthDay}
      />
    </Box>
  )
}
export { DayPicker }
