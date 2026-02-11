import { useMemo, useEffect, useState, useCallback } from "react"
import {
  SimpleGrid,
  Skeleton,
  Spinner,
  Flex,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRoverPhotos } from "@/queries"
import { RoverPhoto } from "@/components"
import PhotoLightbox from "@/components/PhotoLightbox/PhotoLightbox"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import type { Photo } from "@/setup/types"
import { GridLoading } from "@/components/"
import { EmptyState } from "@/components"
import { useFavs } from "@/hooks/useFavs"
import InfiniteScroll from "react-infinite-scroll-component"

interface PhotoGridProps {
  gridView?: "grid" | "list"
}

function PhotoGrid({ gridView = "grid" }: PhotoGridProps) {
  const toast = useToast()
  const { state, actions } = useFiltersContext()
  const { roverData, pagesData, isError, isRefetching, fetchNextPage } =
    useRoverPhotos()
  const { setNewFav } = useFavs()
  const page = useMemo(() => state.page ?? 1, [state.page])
  const endMsgColor = useColorModeValue("gray.500", "whiteAlpha.600")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lightboxPhoto = lightboxIndex !== null ? roverData[lightboxIndex] : null

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
  }, [])

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && prev < roverData.length - 1 ? prev + 1 : prev
    )
  }, [roverData.length])

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const isFirstPage = pagesData && pagesData.pages.length === 1
  const firstPageIsFull = pagesData && pagesData.pages[0].photos.length === 25
  const lastPageHasData =
    pagesData && pagesData.pages[pagesData.pages.length - 1].photos.length

  const savePhoto = (photo: Photo) => {
    toast({
      title: "Added to favorites",
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    })
    setNewFav(photo)
  }

  useEffect(() => {
    if (page && page > 1) {
      fetchNextPage()
    }
  }, [page])

  if (isError) {
    return <EmptyState isError />
  }

  if (isFirstPage && !lastPageHasData) {
    return <EmptyState />
  }

  if (pagesData) {
    return (
      <InfiniteScroll
        dataLength={roverData.length}
        hasMore={page && lastPageHasData && firstPageIsFull}
        next={() => actions.setNextPage()}
        loader={
          <Flex justify="center" py={6}>
            <Spinner color="mars.400" size="lg" />
          </Flex>
        }
        scrollThreshold={0.85}
        endMessage={
          <Flex justify="center" py={6}>
            <Text fontSize="sm" color={endMsgColor}>
              No more photos for this date
            </Text>
          </Flex>
        }
      >
        <SimpleGrid
          columns={
            gridView === "list"
              ? { base: 1, sm: 1, lg: 1 }
              : { base: 2, sm: 2, lg: 3 }
          }
          spacing={
            gridView === "list"
              ? { base: 4, md: 6 }
              : { base: 3, md: 5 }
          }
          maxW={gridView === "list" ? "600px" : "none"}
          mx={gridView === "list" ? "auto" : undefined}
        >
          {roverData.map((photo: Photo, index: number) => (
            <Skeleton
              key={photo.id}
              isLoaded={(!isRefetching && page === 1) || page > 1}
              borderRadius="xl"
            >
              <RoverPhoto
                id={photo.id}
                src={photo.img_src}
                camera={photo.camera.full_name}
                favCb={() => savePhoto(photo)}
                onOpenLightbox={() => setLightboxIndex(index)}
              />
            </Skeleton>
          ))}
        </SimpleGrid>

        {lightboxPhoto && (
          <PhotoLightbox
            isOpen={lightboxIndex !== null}
            onClose={handleCloseLightbox}
            src={lightboxPhoto.img_src}
            id={lightboxPhoto.id}
            camera={lightboxPhoto.camera.full_name}
            roverName={state.rover?.name}
            onToggleFav={() => savePhoto(lightboxPhoto)}
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={lightboxIndex!}
            totalCount={roverData.length}
          />
        )}
      </InfiniteScroll>
    )
  }

  return <GridLoading />
}

export default PhotoGrid
