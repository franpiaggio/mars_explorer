import { FiltersContext } from "@/state/FiltersContext"
import { useContext } from "react"
function useFiltersContext() {
  return useContext(FiltersContext)
}
export { useFiltersContext }
