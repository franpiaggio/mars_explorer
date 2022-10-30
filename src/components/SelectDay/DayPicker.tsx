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
import { FiltersContext } from "@/state/FiltersContext"
import { useFormatedDate } from "@/hooks"
import { useRoverPhotos } from "@/queries"
import { DayType } from "@/components/SelectDay/DayType"
import { formatToAllowedDate } from "@/hooks/useFormatedDate"

function DayPicker() {
  const { state, actions } = useContext(FiltersContext)
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const [inputDate, setInputDate] = useState("1")
  const debouncedValue = useDebounce(inputDate, 500)
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const dayType = useMemo(() => state.dayType, [state.dayType])
  const earthDay = useMemo(() => {
    if (state.day && dayType === DayType.EARTH) {
      const dateWithPickerFormat = formatToAllowedDate(state.day)
      console.log(dateWithPickerFormat)
      const selectedDay = new Date(dateWithPickerFormat + "T00:00:00")
      return selectedDay
    }
    return undefined
  }, [state.day])
  const onChangeDay = (value: string) => {
    setInputDate(value)
  }
  const onChangeEarthDay = (e: any) => {
    actions.setDay(useFormatedDate(e))
  }

  useEffect(() => {
    setInputDate(String(selectedRover?.max_sol))
  }, [selectedRover])

  useEffect(() => {}, [])

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
      />
    </Box>
  )
}
export { DayPicker }
