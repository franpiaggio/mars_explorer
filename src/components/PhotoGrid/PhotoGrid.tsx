import { useMemo, useContext, useEffect } from "react"
import { SimpleGrid, Skeleton, Spinner } from "@chakra-ui/react"
import { useRoverPhotos } from "@/queries"
import { RoverPhoto } from "@/components"
import { FiltersContext } from "@/state/FiltersContext"
import InfiniteScroll from "react-infinite-scroll-component"
import type { Photo } from "@/setup/types"
import { useFiltersContext } from "@/hooks/useFiltersContext"
function PhotoGrid() {
  const { state, actions } = useFiltersContext()
  const { roverData, pagesData, isError, isRefetching, fetchNextPage } = useRoverPhotos()
  const page = useMemo(() => state.page ?? 1, [state.page])

  // A solution for not having totalPages on API
  const isFirstPage = pagesData && pagesData.pages.length === 1
  const firstPageIsFull = pagesData && pagesData.pages[0].photos.length === 25
  const lastPageHasData =
    pagesData && pagesData.pages[pagesData.pages.length - 1].photos.length

  useEffect(() => {
    if (page && page > 1) {
      fetchNextPage()
    }
  }, [page])

  if (isError) {
    return <h2>ERROR</h2>
  }

  if (isFirstPage && !lastPageHasData) {
    return <h2>NO HAY DATOS</h2>
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
            <p style={{ textAlign: "center" }}>No more pictures for this day</p>
          }
        >
          <SimpleGrid columns={{ base: 1, sm: 1, xl: 3 }} spacing={10}>
            {roverData.map((photo: Photo) => (
              <Skeleton
                key={photo.id}
                isLoaded={(!isRefetching && page === 1) || page > 1}
              >
                <RoverPhoto id={photo.id} src={photo.img_src} />
              </Skeleton>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </>
    )
  }

  return <h2>LOADING</h2>
}

export default PhotoGrid
