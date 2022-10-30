import { useContext, useMemo } from "react"
import { Select } from "@chakra-ui/react"
import { useRovers, useRoverPhotos } from "@/queries/"
import { FiltersContext } from "@/state/FiltersContext"
function SelectCamera() {
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const { state, actions } = useContext(FiltersContext)
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const selectedCamera = useMemo(() => state?.camera, [state.camera?.id])
  const onChangeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === "all") {
      actions.setDefaultCamera(null)
      return
    }
    actions.setCamera(parseInt(value))
  }
  return (
    <Select
      onChange={onChangeCamera}
      disabled={!roversLoaded || isRefetching}
      defaultValue={selectedCamera ? selectedCamera.name : undefined}
      placeholder={!selectedRover && !roversLoaded ? "Loading..." : undefined}
    >
      <option value={"all"}>All</option>
      {selectedRover?.cameras.map((camera: any) => (
        <option key={camera.id} value={camera.id}>
          {camera.name}
        </option>
      ))}
    </Select>
  )
}
export default SelectCamera
