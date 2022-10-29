import { SimpleGrid } from "@chakra-ui/react"
import RoverPhoto from "./RoverPhoto"

function PhotoGrid() {
  const photos: any = []
  return (
    <SimpleGrid columns={5} spacing={10}>
      {photos.map((photo: any) => (
        <RoverPhoto key={photo.id} src={photo.img_src} />
      ))}
    </SimpleGrid>
  )
}

export default PhotoGrid
