import { useContext } from "react"
import { Select } from "@chakra-ui/react"
import { useRovers } from "@/queries/useRovers"
import { FiltersContext } from "@/state/FiltersContext"
import type { Rover } from "@/setup/types"
function SelectRovers() {
  const { listRovers, roversLoaded } = useRovers()
  const { state, actions } = useContext(FiltersContext)
  const onChangeRover = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    actions?.setRover(value, listRovers.rovers)
  }
  return (
    <Select
      disabled={!roversLoaded}
      onChange={onChangeRover}
      defaultValue={state?.rover ? state.rover.name : undefined}
      placeholder={!roversLoaded ? "Loading..." : undefined}
    >
      {roversLoaded &&
        listRovers.rovers.map((rover: Rover) => (
          <option key={rover.id} value={rover.name}>
            {rover.name}
          </option>
        ))}
    </Select>
  )
}
export default SelectRovers
