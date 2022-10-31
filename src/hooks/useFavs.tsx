import { useEffect, useState } from "react"
import type { Photo } from "@/setup/types"
function getInitialState() {
  const favs = localStorage.getItem("favs")
  return favs ? JSON.parse(favs) : []
}

export const useFavs = () => {
  const [favs, setFavs] = useState(getInitialState)
  const setNewFav = (fav: Photo) => {
    setFavs((prevFavs: Photo[]) => {
      if (prevFavs.some((curr: Photo) => curr.id === fav.id)) {
        return prevFavs
      }
      return [...prevFavs, fav]
    })
  }
  const removeFav = (fav: Photo) => {
    setFavs((prevFavs: Photo[]) => {
      return prevFavs.filter((curr: Photo) => curr.id !== fav.id)
    })
  }
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs))
  }, [favs])

  return { favs, setNewFav, removeFav }
}
