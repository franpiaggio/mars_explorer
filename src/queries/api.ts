const key = import.meta.env.VITE_NASA_API_KEY
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1"
const getPhotosUrl = (name: string, camera: string | null, page?: number): URL => {
  const url = new URL(`${baseUrl}/rovers/${name}/photos`)
  if (camera) {
    url.searchParams.append("camera", camera.toLocaleLowerCase())
  }
  if (page) {
    url.searchParams.append("page", String(page))
  }
  url.searchParams.append("api_key", key)
  url.searchParams.append("sol", "1")
  return url
}
const fetchRovers = async () => {
  const res = await fetch(`${baseUrl}/rovers?api_key=${key}`)
  return res.json()
}
const fetchRoverData = async (
  roverName: string | null,
  camera: string | null,
  page?: number
) => {
  if (!roverName) return
  const url = getPhotosUrl(roverName, camera, page)
  const res = await fetch(url)
  return res.json()
}
export { fetchRoverData, fetchRovers }
