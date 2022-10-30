import React, { useContext, useMemo, useEffect, useState } from "react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Input,
} from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useDebounce } from "@/hooks/"
import { useRovers } from "@/queries/useRovers"
import { FiltersContext } from "@/state/FiltersContext"
import { useFormatedDate } from "@/hooks"
import { useRoverPhotos } from "@/queries"

function DayPicker() {
  const [inputDate, setInputDate] = useState("1")
  const debouncedValue = useDebounce(inputDate, 500)
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const { state, actions } = useContext(FiltersContext)
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const dayType = useMemo(() => state.dayType, [state.dayType])
  const [earthDay, setEarthDay] = useState(
    selectedRover ? new Date(Date.parse(selectedRover?.max_date)) : new Date()
  )
  const onChangeDay = (value: string) => {
    setInputDate(value)
  }
  const onChangeEarthDay = (e: any) => {
    actions.setDay(useFormatedDate(e))
  }

  useEffect(() => {
    actions.setDay(inputDate)
  }, [debouncedValue])

  useEffect(() => {
    if (dayType === "earth_day") {
      if (selectedRover) {
        const formated = new Date(Date.parse(selectedRover?.max_date))
        setEarthDay(formated)
        actions.setDay(useFormatedDate(formated))
      }
    } else {
      setInputDate("1")
    }
  }, [selectedRover])

  if (dayType === "sol") {
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
        name="date-input"
        date={earthDay}
        onDateChange={onChangeEarthDay}
      />
    </Box>
  )
}
export { DayPicker }
