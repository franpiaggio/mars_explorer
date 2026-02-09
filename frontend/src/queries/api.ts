const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api/v1"

const getPhotosUrl = (
  name: string,
  camera: string | null,
  page: number,
  sol: number | null,
  earth_date: string | null = null
): URL => {
  const url = new URL(`${baseUrl}/rovers/${name}/photos`, window.location.origin)
  if (camera) {
    url.searchParams.append("camera", camera.toLocaleLowerCase())
  }
  if (page) {
    url.searchParams.append("page", String(page))
  }
  if (earth_date) {
    url.searchParams.append("earth_date", earth_date)
  } else if (sol != null) {
    url.searchParams.append("sol", String(sol))
  }
  return url
}

const fetchRovers = async () => {
  const url = new URL(`${baseUrl}/rovers`, window.location.origin)
  const res = await fetch(url)
  return res.json()
}

const fetchRoverData = async (
  roverName: string | null,
  camera: string | null,
  page: number = 1,
  sol: number | null = null,
  earth_date: string | null = null
) => {
  if (!roverName) return
  const url = getPhotosUrl(roverName, camera, page, sol, earth_date)
  const res = await fetch(url)
  return res.json()
}

const fetchManifest = async (roverName: string) => {
  const url = new URL(`${baseUrl}/manifests/${roverName}`, window.location.origin)
  const res = await fetch(url)
  return res.json()
}

const fetchAvailableDates = async (roverName: string) => {
  const url = new URL(
    `${baseUrl}/rovers/${roverName}/available_dates`,
    window.location.origin
  )
  const res = await fetch(url)
  return res.json()
}

export { fetchRoverData, fetchRovers, fetchManifest, fetchAvailableDates }
