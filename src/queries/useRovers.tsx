import { useEffect, useContext } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"
function useRovers() {
  const { actions } = useContext(FiltersContext)
  const { data: listRovers, isFetched: roversLoaded } = useQuery(
    ["rovers"],
    fetchRovers,
    { staleTime: Infinity }
  )
  useEffect(() => {
    if (roversLoaded && actions) {
      actions.setDefaultRover(listRovers.rovers[0])
      actions.setDefaultCamera(listRovers.rovers[0].cameras[0])
    }
  }, [roversLoaded])
  return { listRovers, roversLoaded }
}
export { useRovers }
