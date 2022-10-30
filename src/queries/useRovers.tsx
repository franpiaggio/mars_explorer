import { useEffect, useContext } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { FiltersContext } from "@/state/FiltersContext"
import { formatToAllowedDate } from "@/hooks/useFormatedDate"
function useRovers() {
  const { actions } = useContext(FiltersContext)
  const res = useQuery(["rovers"], fetchRovers, { staleTime: Infinity })
  const listRovers = res.data
  const roversLoaded = res.isFetched

  useEffect(() => {
    if (res.isSuccess && actions) {
      const selected = listRovers.rovers[listRovers.rovers.length - 1]
      const maxDate = selected.max_date
        ? formatToAllowedDate(selected.max_date)
        : new Date()
      actions.setDefaultRover(selected, maxDate)
    }
  }, [roversLoaded])

  return { ...res, listRovers, roversLoaded }
}
export { useRovers }
