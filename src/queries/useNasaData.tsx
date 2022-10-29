import { useState, useMemo, useEffect } from "react"
import { useRovers, useRoverPhotos } from "@/queries"
import type { Rover } from "@/setup/types"
function useNasaData() {
  const [enablePhotos, setEnablePhotos] = useState(false)
  const [selectedRover, setSelectedRover] = useState<null | Rover>(null)
  const [selectedCamera, setSelectedCamera] = useState("pancam")

  const { listRovers, roversLoaded } = useRovers()
  const {
    roverData,
    isError: isErrorPhotos,
    isRefetching: isRefetchingPhotos,
  } = useRoverPhotos(enablePhotos, selectedRover, selectedCamera)

  useEffect(() => {
    if (selectedRover) {
      setEnablePhotos(true)
    }
  }, [selectedRover])

  useEffect(() => {
    if (listRovers) {
      setSelectedRover(listRovers.rovers[0])
    }
  }, [roversLoaded])

  return {
    listRovers,
    roverData,
    roversLoaded,
    selectedRover,
    isRefetchingPhotos,
    isErrorPhotos,
    setSelectedRover,
  }
}
export { useNasaData }
