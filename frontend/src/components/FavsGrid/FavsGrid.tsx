import {
  SimpleGrid,
  useToast,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { RoverPhoto } from "@/components"
import { useFavs } from "@/hooks/useFavs"
import { EmptyState } from "@/components"
import type { Photo } from "@/setup/types"

function FavsGrid() {
  const { favs, removeFav, clearFavs }: any = useFavs()
  const toast = useToast()
  const labelColor = useColorModeValue("iron.400", "dust.400")
  const valueColor = useColorModeValue("iron.700", "dust.100")
  const ruleColor = useColorModeValue("dust.200", "iron.700")

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
      <Flex
        justify="space-between"
        align={{ base: "flex-start", sm: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        gap={3}
        mb={6}
        pb={5}
        borderBottomWidth="1px"
        borderColor={ruleColor}
      >
        <Stack spacing={1.5}>
          <Text
            fontFamily="mono"
            fontSize="2xs"
            color={labelColor}
            textTransform="uppercase"
            letterSpacing="0.12em"
          >
            Saved by you
          </Text>
          <HStack align="baseline" spacing={3}>
            <Heading
              as="h1"
              size="xl"
              fontWeight="700"
              letterSpacing="-0.03em"
              lineHeight="1"
            >
              Favorites
            </Heading>
            <Text
              fontFamily="mono"
              fontSize="sm"
              color={labelColor}
              sx={{ fontVariantNumeric: "tabular-nums" }}
            >
              {favs.length} photo{favs.length !== 1 ? "s" : ""}
            </Text>
          </HStack>
        </Stack>
        {clearFavs && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleClearAll}
            aria-label="Remove all favorites"
            fontWeight="500"
          >
            Remove all
          </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 2, sm: 2, lg: 3 }} spacing={{ base: 3, md: 5 }}>
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
      {/* spacer so the bottom-nav doesn't hug last row on mobile */}
      <Box h={4} />
    </>
  )
}

export default FavsGrid
