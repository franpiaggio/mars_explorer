import { useContext, useMemo } from "react"
import { Flex, Box, Select } from "@chakra-ui/react"
import { FiltersContext } from "@/state/FiltersContext"
import { useRoverPhotos } from "@/queries"
import { DayPicker } from "./DayPicker"
function SelectDay() {
  const { state, actions } = useContext(FiltersContext)
  const { isRefetching } = useRoverPhotos()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const dayType = useMemo(() => state.dayType, [state.dayType])
  function changeDayType(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    actions.setDayType(value)
  }
  return (
    <>
      <Flex align="center" justify="flex-end">
        <Box>
          <h2>Date type</h2>
          <Select
            disabled={!selectedRover || isRefetching}
            defaultValue={dayType}
            onChange={changeDayType}
          >
            <option value="earth_day">Earth day</option>
            <option value="sol">Martian day</option>
          </Select>
        </Box>
        <DayPicker />
      </Flex>
    </>
  )
}
export default SelectDay
