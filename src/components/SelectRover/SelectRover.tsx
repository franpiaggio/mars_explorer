import { useMemo } from "react"
import { Select, FormLabel, FormControl } from "@chakra-ui/react"
import { useRovers, useRoverPhotos } from "@/queries"
import type { Rover } from "@/setup/types"
import { useFiltersContext } from "@/hooks/useFiltersContext"
function SelectRovers() {
  const { listRovers, roversLoaded } = useRovers()
  const { state, actions } = useFiltersContext()
  const { isRefetching } = useRoverPhotos()
  const selectedDayType = useMemo(() => state.dayType, [state.dayType])
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const onChangeRover = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    actions.setRover(parseInt(value), listRovers.rovers, selectedDayType)
  }
  return (
    <>
      <FormControl
        marginTop="10px"
        marginRight={"15px"}
        maxW={{ base: "auto", md: "300px" }}
      >
        <FormLabel>Rover</FormLabel>
        <Select
          maxW={{ base: "auto" }}
          name="roverSelector"
          disabled={!roversLoaded || isRefetching}
          onChange={onChangeRover}
          value={selectedRover ? selectedRover.id : undefined}
          placeholder={!roversLoaded ? "Loading..." : undefined}
        >
          {roversLoaded &&
            listRovers.rovers.map((rover: Rover) => (
              <option key={rover.id} value={rover.id}>
                {rover.name}
              </option>
            ))}
        </Select>
      </FormControl>
    </>
  )
}
export default SelectRovers
