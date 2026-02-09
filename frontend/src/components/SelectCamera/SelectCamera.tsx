import { useMemo } from "react"
import {
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRovers, useRoverPhotos, useManifest } from "@/queries/"
import type { Camera } from "@/setup/types"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function SelectCamera() {
  const { roversLoaded } = useRovers()
  const { isRefetching } = useRoverPhotos()
  const { manifestEntries } = useManifest()
  const { state, actions } = useFiltersContext()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const selectedCamera = useMemo(() => state?.camera, [state.camera?.id])
  const selectedSol = useMemo(() => state.sol, [state.sol])

  const availableCameras = useMemo(() => {
    if (!selectedRover || selectedSol == null) return []
    const entry = manifestEntries.find((e) => e.sol === selectedSol)
    if (!entry) return []
    return selectedRover.cameras.filter((cam: Camera) =>
      entry.cameras.includes(cam.name)
    )
  }, [selectedRover, selectedSol, manifestEntries])

  const onChangeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === "all") {
      actions.setDefaultCamera(null)
      return
    }
    actions.setCamera(parseInt(value))
  }

  const selectBg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200")

  return (
    <FormControl maxW={{ md: "260px" }}>
      <FormLabel fontSize="sm" fontWeight="600">
        Camera
      </FormLabel>
      <Select
        onChange={onChangeCamera}
        disabled={!roversLoaded || isRefetching || availableCameras.length === 0}
        value={selectedCamera ? selectedCamera.id : "all"}
        size="sm"
        borderRadius="lg"
        bg={selectBg}
        borderColor={borderColor}
        aria-label="Select camera"
      >
        <option value="all">
          All cameras ({availableCameras.length})
        </option>
        {availableCameras.map((camera: Camera) => (
          <option key={camera.id} value={camera.id}>
            {camera.full_name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCamera
