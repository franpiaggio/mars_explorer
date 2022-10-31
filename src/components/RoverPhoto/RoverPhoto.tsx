import { Image, Box, Tag, TagLabel, Link, Flex } from "@chakra-ui/react"
function RoverPhoto({ id, src, camera }: any) {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="350px"
    >
      <Link
        href={src}
        isExternal
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop="auto"
      >
        <Image maxW="100%" objectFit="cover" src={src} alt={`Rover photo ${id}`} />
      </Link>
      <Link href={src} isExternal marginTop="auto">
        <Tag size="lg" colorScheme="green" marginTop="10px">
          <TagLabel>
            #{id} {camera}
          </TagLabel>
        </Tag>
      </Link>
    </Box>
  )
}
export default RoverPhoto
