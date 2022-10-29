import { useContext, useMemo } from "react"
import { Select } from "@chakra-ui/react"
import { useRovers } from "@/queries/useRovers"
import { FiltersContext } from "@/state/FiltersContext"
function SelectCamera() {
  const { roversLoaded } = useRovers()
  const { state, actions } = useContext(FiltersContext)
  const selectedRover = useMemo(() => (state ? state.rover : null), [state])
  const onChangeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    actions?.setCamera(value)
  }
  return (
    <Select
      onChange={onChangeCamera}
      disabled={!roversLoaded}
      defaultValue={state?.camera ? state.camera.name : undefined}
      placeholder={!selectedRover && !roversLoaded ? "Loading..." : undefined}
    >
      {selectedRover?.cameras.map((camera: any) => (
        <option key={camera.id} value={camera.name}>
          {camera.name}
        </option>
      ))}
    </Select>
  )
}
export default SelectCamera
