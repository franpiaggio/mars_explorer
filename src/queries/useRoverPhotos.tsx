import { useMemo, useContext } from "react"
import { fetchRoverData } from "@/queries/api"
import { useQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"

function useRoverPhotos() {
  const { state } = useContext(FiltersContext)
  const selectedRoverName: string | null = useMemo(
    () => (state?.rover ? state.rover.name.toLowerCase() : null),
    [state?.rover?.id]
  )
  const selectedCameraName: string | null = useMemo(
    () => (state?.camera ? state.camera.name.toLowerCase() : null),
    [state?.camera?.id]
  )
  const page = useMemo(() => state?.page || 1, [state?.page])
  const {
    data: roverData,
    isLoading,
    isError,
    isRefetching,
  } = useQuery(
    ["photos", selectedRoverName, selectedCameraName, page],
    () => fetchRoverData(selectedRoverName, selectedCameraName, page),
    {
      enabled: !!selectedRoverName,
      keepPreviousData: true,
    }
  )
  return { roverData, isError, isRefetching, isLoading }
}

export { useRoverPhotos }
