import { useMemo, useEffect, useState } from "react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  useToast,
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
  const toast = useToast()
  const { state, actions } = useFiltersContext()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const [inputDate, setInputDate] = useState("1")
  const debouncedValue = useDebounce(inputDate, 500)
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const dayType = useMemo(() => state.dayType, [state.dayType])
  const earthDay = useMemo(() => {
    /*
     * state.day !== "1" is for a bug that i didnt have the time to solve :(
     * When changing the router and dayType was DayType.SOL a value is by default "1"
     * And <SingleDatepicker /> throws an error
     */
    if (state.day && dayType === DayType.EARTH && state.day !== "1") {
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
    if (selectedRover && parseInt(value) > selectedRover.max_sol) {
      toast({
        id: 1,
        title: "Max Martian date for this rover is " + selectedRover.max_sol,
        status: "warning",
        position: "top-right",
        isClosable: true,
      })
      return
    }
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
      <FormControl marginRight={"15px"} maxW={{ base: "auto", md: "300px" }}>
        <FormLabel>Day</FormLabel>
        <NumberInput
          value={inputDate}
          min={0}
          max={selectedRover?.max_sol ? selectedRover.max_sol : undefined}
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
      </FormControl>
    )
  }
  return (
    <FormControl marginRight={"5px"} maxW={{ base: "auto", md: "300px" }}>
      <FormLabel>Day</FormLabel>
      <SingleDatepicker
        disabled={!selectedRover || isRefetching}
        name="date-input"
        date={earthDay || undefined}
        onDateChange={onChangeEarthDay}
        minDate={minEarthDay}
        maxDate={maxEarthDay}
      />
    </FormControl>
  )
}
export { DayPicker }
