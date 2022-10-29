import type { Rover } from "@/setup/types"
const key = import.meta.env.VITE_NASA_API_KEY
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/"
const getPhotosUrl = (name: string, camera: string) => {
  const url = new URL(`${baseUrl}/rovers/${name}/photos`)
  if (camera) {
    url.searchParams.append("camera", camera.toLocaleLowerCase())
  }
  url.searchParams.append("api_key", key)
  url.searchParams.append("sol", "1")
  url.searchParams.append("page", "1")
  return url
}
const fetchRovers = async () => {
  const res = await fetch(`${baseUrl}/rovers?api_key=${key}`)
  return res.json()
}
const fetchRoverData = async (rover: Rover | null, camera: string) => {
  if (!rover) return
  const url = getPhotosUrl(rover.name, camera)
  const res = await fetch(url)
  return res.json()
}
export { fetchRoverData, fetchRovers }
