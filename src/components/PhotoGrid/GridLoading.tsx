import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react"
function GridLoading() {
  const elements = Array(9)
    .fill("skeleton")
    .map(() => Math.random() * 10)
  return (
    <SimpleGrid columns={{ base: 1, sm: 1, xl: 3 }} spacing={10}>
      {elements.map((el) => (
        <Skeleton key={"test-" + el} isLoaded={false}>
          <Box width="100%" height="350px"></Box>
        </Skeleton>
      ))}
    </SimpleGrid>
  )
}
export default GridLoading
