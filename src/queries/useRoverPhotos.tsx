import { useMemo, useContext } from "react"
import { fetchRoverData } from "@/queries/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"

function useRoverPhotos() {
  const { state } = useContext(FiltersContext)
  const selectedRoverName: string | null = useMemo(
    () => (state.rover ? state.rover.name.toLowerCase() : null),
    [state.rover?.id]
  )
  const selectedCameraName: string | null = useMemo(
    () => (state.camera ? state.camera.name.toLowerCase() : null),
    [state?.camera?.id]
  )
  const page = useMemo(() => state.page || 1, [state.page])

  const res = useInfiniteQuery(
    ["photos", selectedRoverName, selectedCameraName],
    ({ pageParam }) => fetchRoverData(selectedRoverName, selectedCameraName, pageParam),
    {
      enabled: !!selectedRoverName,
      keepPreviousData: true,
      getNextPageParam: () => {
        return page
      },
      getPreviousPageParam: () => false,
    }
  )

  const roverData =
    res?.data?.pages.reduce((prev, page) => prev.concat(page.photos), []) ?? []
  const pagesData = res.data

  return { ...res, roverData, pagesData }
}

export { useRoverPhotos }
