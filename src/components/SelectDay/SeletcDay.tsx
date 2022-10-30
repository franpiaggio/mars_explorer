import { useContext, useMemo } from "react"
import { Flex, Box, Select } from "@chakra-ui/react"
import { FiltersContext } from "@/state/FiltersContext"
import { useRoverPhotos } from "@/queries"
import { DayPicker } from "@/components/SelectDay/DayPicker"
import { useFormatedDate } from "@/hooks"
import { DayType } from "@/components/SelectDay/DayType"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function SelectDay() {
  // const { state, actions } = useContext(FiltersContext)
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
      const maxDate = selectedRover?.max_sol ? selectedRover?.max_sol : "1"
      actions.setDayType(value, maxDate)
    }
  }
  return (
    <>
      <Flex align="center" justify="flex-end">
        <Box>
          <h2>Date type</h2>
          <Select
            disabled={!selectedRover || isRefetching}
            value={selectedDayType}
            onChange={changeDayType}
          >
            <option value={DayType.EARTH}>Earth day</option>
            <option value={DayType.SOL}>Martian day</option>
          </Select>
        </Box>
        <DayPicker />
      </Flex>
    </>
  )
}
export default SelectDay
