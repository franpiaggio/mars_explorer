import { useMemo } from "react"
import { fetchAvailableDates } from "@/queries/api"
import { useQuery } from "@tanstack/react-query"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import { useManifest } from "./useManifest"
import type { ManifestEntry } from "@/setup/types"

function useAvailableDates() {
  const { state } = useFiltersContext()
  const roverName = state.rover?.name?.toLowerCase() ?? null
  const { manifestEntries } = useManifest()

  const res = useQuery(
    ["availableDates", roverName],
    () => fetchAvailableDates(roverName!),
    {
      enabled: !!roverName,
      staleTime: Infinity,
    }
  )

  const entries: ManifestEntry[] = useMemo(() => {
    if (res.data?.available_dates) return res.data.available_dates
    return manifestEntries
  }, [res.data, manifestEntries])

  const availableDatesSet = useMemo(() => {
    const set = new Set<string>()
    entries.forEach((entry: ManifestEntry) => set.add(entry.earth_date))
    return set
  }, [entries])

  const dateToEntryMap = useMemo(() => {
    const map = new Map<string, ManifestEntry>()
    entries.forEach((entry: ManifestEntry) => map.set(entry.earth_date, entry))
    return map
  }, [entries])

  const solToEntryMap = useMemo(() => {
    const map = new Map<number, ManifestEntry>()
    entries.forEach((entry: ManifestEntry) => map.set(entry.sol, entry))
    return map
  }, [entries])

  return {
    ...res,
    entries,
    availableDatesSet,
    dateToEntryMap,
    solToEntryMap,
  }
}

export { useAvailableDates }
