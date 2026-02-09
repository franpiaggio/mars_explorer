import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react"

function GridLoading() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 3, md: 5 }}>
      {Array.from({ length: 9 }, (_, i) => (
        <Skeleton key={`skeleton-${i}`} isLoaded={false} borderRadius="xl">
          <Box width="100%" sx={{ aspectRatio: "4/3" }} />
        </Skeleton>
      ))}
    </SimpleGrid>
  )
}

export default GridLoading
