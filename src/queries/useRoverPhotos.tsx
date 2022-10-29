import { useMemo } from "react"
import { fetchRoverData } from "@/queries/api"
import { useQuery } from "@tanstack/react-query"
import type { Rover } from "@/setup/types"
function useRoverPhotos(
  queryEnabled: boolean,
  selectedRover: Rover | null,
  selectedCamera: string
) {
  const queryRover = useMemo(
    () => (selectedRover ? selectedRover.name : null),
    [selectedRover]
  )
  const {
    data: roverData,
    isError,
    isRefetching,
  } = useQuery(
    ["photos", queryRover, selectedCamera],
    () => fetchRoverData(selectedRover, selectedCamera),
    {
      enabled: queryEnabled,
    }
  )
  return { roverData, isError, isRefetching }
}

export { useRoverPhotos }
