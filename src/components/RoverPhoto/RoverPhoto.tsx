import { Image, Box } from "@chakra-ui/react"
function RoverPhoto({ src }: any) {
  return (
    <Box>
      <Image src={src} />
    </Box>
  )
}
export default RoverPhoto
