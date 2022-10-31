import { useEffect } from "react"
import { fetchRovers } from "./api"
import { useQuery } from "@tanstack/react-query"
import { formatToAllowedDate } from "@/hooks/useFormatedDate"
import { useFiltersContext } from "@/hooks/useFiltersContext"
function useRovers() {
  const { actions } = useFiltersContext()
  const res = useQuery(["rovers"], fetchRovers, { staleTime: Infinity })
  const listRovers = res.data
  const roversLoaded = res.isFetched

  useEffect(() => {
    if (res.isSuccess && listRovers) {
      const selected = listRovers.rovers[0]
      const maxDate = selected.max_date
        ? formatToAllowedDate(selected.max_date)
        : new Date()
      actions.setDefaultRover(selected, maxDate)
    }
  }, [roversLoaded])

  return { ...res, listRovers, roversLoaded }
}

export { useRovers }
