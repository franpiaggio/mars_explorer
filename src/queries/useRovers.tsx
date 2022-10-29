import { useEffect, useContext } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"
function useRovers() {
  const { actions } = useContext(FiltersContext)
  const {
    data: listRovers,
    isFetched: roversLoaded,
    isSuccess,
  } = useQuery(["rovers"], fetchRovers, { staleTime: Infinity })
  useEffect(() => {
    if (isSuccess && actions) {
      actions.setDefaultRover(listRovers.rovers[listRovers.rovers.length - 1])
      actions.setDefaultCamera(null)
    }
  }, [roversLoaded])
  return { listRovers, roversLoaded }
}
export { useRovers }
