import { Image, Box } from "@chakra-ui/react"
function RoverPhoto({ id, src }: any) {
  return (
    <Box>
      <p>Id: {id}</p>
      <Image src={src} />
    </Box>
  )
}
export default RoverPhoto
