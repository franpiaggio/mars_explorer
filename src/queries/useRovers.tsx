import { useEffect, useContext } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"
function useRovers() {
  const { actions } = useContext(FiltersContext)
  const res = useQuery(["rovers"], fetchRovers, { staleTime: Infinity })
  const listRovers = res.data
  const roversLoaded = res.isFetched

  useEffect(() => {
    if (res.isSuccess && actions) {
      actions.setDefaultRover(listRovers.rovers[listRovers.rovers.length - 1])
      actions.setDefaultCamera(null)
    }
  }, [roversLoaded])

  return { ...res, listRovers, roversLoaded }
}
export { useRovers }
