import { useMemo, useContext } from "react"
import { SimpleGrid, Button } from "@chakra-ui/react"
import { useRoverPhotos } from "@/queries"
import { RoverPhoto } from "@/components"
import { FiltersContext } from "@/state/FiltersContext"
import type { Photo } from "@/setup/types"
function PhotoGrid() {
  const { state, actions } = useContext(FiltersContext)
  const { roverData, isError } = useRoverPhotos()
  const showPage = useMemo(() => state?.page, [state?.page])

  if (isError) {
    return <h2>ERROR</h2>
  }

  if (roverData && !roverData.photos.length) {
    return <h2>NO HAY DATOS</h2>
  }

  if (roverData) {
    return (
      <>
        <SimpleGrid columns={5} spacing={10}>
          {roverData.photos.map((photo: Photo) => (
            <RoverPhoto key={photo.id} src={photo.img_src} />
          ))}
        </SimpleGrid>
        {showPage ? (
          <>
            <p>Page: 1</p>
            <Button onClick={() => actions.setNextPage()}>Load more</Button>
          </>
        ) : null}
      </>
    )
  }

  return <h2>LOADING</h2>
}

export default PhotoGrid
