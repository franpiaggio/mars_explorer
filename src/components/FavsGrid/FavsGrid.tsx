import { SimpleGrid, useToast } from "@chakra-ui/react"
import { RoverPhoto } from "@/components"
import { useFavs } from "@/hooks/useFavs"
import { EmptyState } from "@/components"
import type { Photo } from "@/setup/types"
function FavsGrid() {
  const { favs, removeFav }: any = useFavs()
  const toast = useToast()
  const removePhoto = (photo: Photo) => {
    toast({
      title: "Photo removed from favourites",
      status: "warning",
      position: "top-right",
      isClosable: true,
    })
    removeFav(photo)
  }
  if (favs && !favs.length) {
    return <EmptyState />
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, xl: 3 }} spacing={10}>
      {favs.map((photo: Photo) => (
        <RoverPhoto
          key={photo.id}
          id={photo.id}
          src={photo.img_src}
          camera={photo.camera.full_name}
          roverName={photo.rover.name}
          removeBtn
          favCb={() => removePhoto(photo)}
        />
      ))}
    </SimpleGrid>
  )
}
export default FavsGrid
