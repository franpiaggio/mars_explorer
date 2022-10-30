import { useMemo } from "react"
import { fetchRoverData } from "@/queries/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function useRoverPhotos() {
  const { state } = useFiltersContext()
  const selectedRoverName: string | null = useMemo(
    () => (state.rover ? state.rover.name.toLowerCase() : null),
    [state.rover?.id]
  )
  const selectedCameraName: string | null = useMemo(
    () => (state.camera ? state.camera.name.toLowerCase() : null),
    [state?.camera?.id]
  )
  const page = useMemo(() => state.page || 1, [state.page])
  const day = useMemo(() => state.day, [state.day])
  const dayType = useMemo(() => state.dayType, [state.dayType])

  const res = useInfiniteQuery(
    ["photos", selectedRoverName, selectedCameraName, day, dayType],
    ({ pageParam }) =>
      fetchRoverData(selectedRoverName, selectedCameraName, pageParam, day, dayType),
    {
      enabled: !!selectedRoverName,
      getNextPageParam: () => page,
      getPreviousPageParam: () => false,
    }
  )

  const roverData =
    res?.data?.pages.reduce((prev, page) => prev.concat(page.photos), []) ?? []
  const pagesData = res.data

  return { ...res, roverData, pagesData }
}

export { useRoverPhotos }
