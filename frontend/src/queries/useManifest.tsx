import { fetchManifest } from "@/queries/api"
import { useQuery } from "@tanstack/react-query"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import type { Manifest, ManifestEntry } from "@/setup/types"

function useManifest() {
  const { state } = useFiltersContext()
  const roverName = state.rover?.name?.toLowerCase() ?? null

  const res = useQuery(
    ["manifest", roverName],
    () => fetchManifest(roverName!),
    {
      enabled: !!roverName,
      staleTime: Infinity,
    }
  )

  const manifest: Manifest | undefined = res.data?.photo_manifest
  const manifestEntries: ManifestEntry[] = manifest?.photos ?? []

  return { ...res, manifest, manifestEntries }
}

export { useManifest }
