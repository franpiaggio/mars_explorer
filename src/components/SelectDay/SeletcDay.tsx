import { useMemo } from "react"
import { Flex, Box, Select, FormLabel, FormControl } from "@chakra-ui/react"
import { useRoverPhotos } from "@/queries"
import { DayPicker } from "@/components/SelectDay/DayPicker"
import { useFormatedDate } from "@/hooks"
import { DayType } from "@/components/SelectDay/DayType"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function SelectDay() {
  const { state, actions } = useFiltersContext()
  const { isRefetching } = useRoverPhotos()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const selectedDayType = useMemo(() => state.dayType ?? DayType.EARTH, [state.dayType])
  function changeDayType(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    if (value === DayType.EARTH) {
      const maxDate = selectedRover?.max_date
        ? useFormatedDate(new Date(Date.parse(selectedRover?.max_date)))
        : new Date()
      actions.setDayType(value, maxDate)
    }
    if (value === DayType.SOL) {
      const maxDate = selectedRover?.max_sol ? selectedRover?.max_sol : null
      actions.setDayType(value, maxDate)
    }
  }
  return (
    <>
      <Flex
        marginTop="10px"
        width={{ base: "100%", md: "1200px" }}
        align="center"
        justify="flex-end"
      >
        <FormControl marginRight={"15px"} maxW={{ base: "auto", md: "300px" }}>
          <FormLabel>Type date</FormLabel>
          <Select
            disabled={!selectedRover || isRefetching}
            value={selectedDayType}
            onChange={changeDayType}
          >
            <option value={DayType.EARTH}>Earth day</option>
            <option value={DayType.SOL}>Martian day</option>
          </Select>
        </FormControl>
        <DayPicker />
      </Flex>
    </>
  )
}
export default SelectDay
