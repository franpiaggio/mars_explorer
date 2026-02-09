import {
  SimpleGrid,
  useToast,
  Flex,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { RoverPhoto } from "@/components"
import { useFavs } from "@/hooks/useFavs"
import { EmptyState } from "@/components"
import type { Photo } from "@/setup/types"

function FavsGrid() {
  const { favs, removeFav, clearFavs }: any = useFavs()
  const toast = useToast()
  const subtitleColor = useColorModeValue("gray.500", "whiteAlpha.600")

  const removePhoto = (photo: Photo) => {
    toast({
      title: "Removed from favorites",
      status: "warning",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    })
    removeFav(photo)
  }

  const handleClearAll = () => {
    if (clearFavs) {
      clearFavs()
      toast({
        title: "All favorites removed",
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  if (favs && !favs.length) {
    return <EmptyState isFavorites />
  }

  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <div>
          <Heading size="md">Favorites</Heading>
          <Text fontSize="sm" color={subtitleColor}>
            {favs.length} photo{favs.length !== 1 ? "s" : ""} saved
          </Text>
        </div>
        {clearFavs && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleClearAll}
            aria-label="Remove all favorites"
          >
            Remove all
          </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 2, sm: 2, lg: 3 }} spacing={{ base: 2, md: 5 }}>
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
    </>
  )
}

export default FavsGrid
