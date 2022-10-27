const get_api_url = (name: string) => {
  return new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos`)
}
const key = import.meta.env.VITE_NASA_API_KEY
const fetchRoverData = async (rover: string) => {
  const url = get_api_url(rover)
  url.searchParams.append("api_key", key)
  url.searchParams.append("sol", "1")
  url.searchParams.append("page", "1")
  // url.searchParams.append("camera", "fhaz")
  const res = await fetch(url)
  return res.json()
}
export default fetchRoverData
