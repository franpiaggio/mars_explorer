import { Image, Box, Tag, TagLabel, Link, Flex, Button } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
interface Props {
  id: number
  src: string
  camera: string
  favCb: any
  roverName?: string
  removeBtn?: boolean
}
function RoverPhoto({ id, src, camera, favCb, roverName, removeBtn }: Props) {
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
      <Flex align="center" direction="column" marginTop="auto">
        {roverName ? (
          <Tag size="lg" colorScheme="blue" marginTop="10px" marginBottom="10px">
            <TagLabel>{roverName}</TagLabel>
          </Tag>
        ) : null}
        <Link href={src} isExternal>
          <Tag size="lg" colorScheme="green">
            <TagLabel>
              #{id} {camera} <ExternalLinkIcon />
            </TagLabel>
          </Tag>
        </Link>
        {removeBtn ? (
          <Button size="sm" marginTop="10px" onClick={favCb}>
            Remove
          </Button>
        ) : (
          <Button size="sm" marginTop="10px" onClick={favCb}>
            Add to favs
          </Button>
        )}
      </Flex>
    </Box>
  )
}
export default RoverPhoto
