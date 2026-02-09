import { useEffect } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import type { Rover } from "@/setup/types"

function useRovers() {
  const { actions } = useFiltersContext()
  const res = useQuery(["rovers"], fetchRovers, { staleTime: Infinity })
  const listRovers = res.data
  const roversLoaded = res.isFetched

  useEffect(() => {
    if (res.isSuccess && listRovers) {
      const withPhotos = listRovers.rovers.find((r: Rover) => r.total_photos > 0)
      if (withPhotos) {
        actions.setDefaultRover(withPhotos, withPhotos.max_sol)
      }
    }
  }, [roversLoaded])

  return { ...res, listRovers, roversLoaded }
}

export { useRovers }
