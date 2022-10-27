const API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
async function fetchRoverData() {
  const url = new URL(API_URL)
  url.searchParams.append("rover", "curiosity")
  url.searchParams.append("api_key", import.meta.env.VITE_NASA_API_KEY)
  const res = await fetch(url)
  return res.json()
}
export default fetchRoverData
