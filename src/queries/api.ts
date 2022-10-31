const key = import.meta.env.VITE_NASA_API_KEY
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1"
const getPhotosUrl = (
  name: string,
  camera: string | null,
  page: number,
  day: string | null,
  dayType: string | null
): URL => {
  const url = new URL(`${baseUrl}/rovers/${name}/photos`)
  if (camera) {
    url.searchParams.append("camera", camera.toLocaleLowerCase())
  }
  if (page) {
    url.searchParams.append("page", String(page))
  }
  if (day && dayType) {
    url.searchParams.append(dayType, day)
  }
  url.searchParams.append("api_key", key)
  return url
}
const fetchRovers = async () => {
  const res = await fetch(`${baseUrl}/rovers?api_key=${key}`)
  return res.json()
}
const fetchRoverData = async (
  roverName: string | null,
  camera: string | null,
  page: number = 1,
  day: string | null = "1",
  dayType: string | null = "earth_date"
) => {
  if (!roverName) return
  const url = getPhotosUrl(roverName, camera, page, day, dayType)
  const res = await fetch(url)
  return res.json()
}
export { fetchRoverData, fetchRovers }
