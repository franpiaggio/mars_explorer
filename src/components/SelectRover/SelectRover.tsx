import { useContext, useMemo } from "react"
import { Select } from "@chakra-ui/react"
import { useRovers, useRoverPhotos } from "@/queries"
import { FiltersContext } from "@/state/FiltersContext"
import type { Rover } from "@/setup/types"
function SelectRovers() {
  const { listRovers, roversLoaded } = useRovers()
  const { state, actions } = useContext(FiltersContext)
  const { isRefetching } = useRoverPhotos()
  const onChangeRover = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    actions.setRover(parseInt(value), listRovers.rovers)
  }
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  return (
    <Select
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
  )
}
export default SelectRovers
