import { useMemo } from "react"
import { Select, FormLabel, FormHelperText, FormControl } from "@chakra-ui/react"
import { useRovers, useRoverPhotos } from "@/queries/"
import type { Camera } from "@/setup/types"
import { useFiltersContext } from "@/hooks/useFiltersContext"
function SelectCamera() {
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const { state, actions } = useFiltersContext()
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
    <FormControl maxW={{ base: "auto", md: "300px" }} marginRight="15px">
      <FormLabel>Camera</FormLabel>
      <Select
        maxW={{ base: "auto" }}
        onChange={onChangeCamera}
        disabled={!roversLoaded || isRefetching}
        defaultValue={selectedCamera ? selectedCamera.name : undefined}
        placeholder={!selectedRover && !roversLoaded ? "Loading..." : undefined}
      >
        <option value={"all"}>All</option>
        {selectedRover?.cameras.map((camera: Camera) => (
          <option key={camera.id} value={camera.id}>
            {camera.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
export default SelectCamera
