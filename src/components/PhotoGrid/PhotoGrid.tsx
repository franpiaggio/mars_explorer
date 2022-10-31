import { useMemo, useEffect } from "react"
import {
  SimpleGrid,
  Skeleton,
  Spinner,
  Tag,
  TagLabel,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { useRoverPhotos } from "@/queries"
import { RoverPhoto } from "@/components"
import { useFiltersContext } from "@/hooks/useFiltersContext"
import type { Photo } from "@/setup/types"
import { GridLoading } from "@/components/"
import { EmptyState } from "@/components"
import { useFavs } from "@/hooks/useFavs"
import InfiniteScroll from "react-infinite-scroll-component"
function PhotoGrid() {
  const toast = useToast()
  const { state, actions } = useFiltersContext()
  const { roverData, pagesData, isError, isRefetching, fetchNextPage } = useRoverPhotos()
  const { setNewFav } = useFavs()
  const page = useMemo(() => state.page ?? 1, [state.page])

  // A solution for not having totalPages on API
  const isFirstPage = pagesData && pagesData.pages.length === 1
  const firstPageIsFull = pagesData && pagesData.pages[0].photos.length === 25
  const lastPageHasData =
    pagesData && pagesData.pages[pagesData.pages.length - 1].photos.length

  const savePhoto = (photo: any) => {
    toast({
      title: "Added to favourites 🌌👾",
      status: "success",
      position: "top-right",
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
      <>
        <InfiniteScroll
          dataLength={roverData.length}
          hasMore={page && lastPageHasData && firstPageIsFull}
          next={() => actions.setNextPage()}
          loader={<Spinner />}
          scrollThreshold={0.85}
          endMessage={
            <Flex justify="center" marginTop="50px">
              <Tag size="lg">
                <TagLabel>No more photos to load for this day</TagLabel>
              </Tag>
            </Flex>
          }
        >
          <SimpleGrid columns={{ base: 1, sm: 1, xl: 3 }} spacing={10}>
            {roverData.map((photo: Photo) => (
              <Skeleton
                key={photo.id}
                isLoaded={(!isRefetching && page === 1) || page > 1}
              >
                <RoverPhoto
                  id={photo.id}
                  src={photo.img_src}
                  camera={photo.camera.full_name}
                  favCb={() => savePhoto(photo)}
                />
              </Skeleton>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </>
    )
  }

  return <GridLoading />
}

export default PhotoGrid
