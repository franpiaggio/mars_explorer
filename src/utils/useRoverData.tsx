import { useQuery } from "@tanstack/react-query"
import fetchRoverData from "./fetchRoverData"
function useRoverData() {
  const { data, status } = useQuery(["rovers"], fetchRoverData)
  return { data, status }
}
export { useRoverData }
