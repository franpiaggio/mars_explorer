import { Spinner, Box } from "@chakra-ui/react"
import ListPhotos from "./ListPhotos"

interface props {
  data: any
  isError: boolean
}

function RoversData({ data, isError }: props) {
  if (isError) {
    return <>"ERROR..."</>
  }

  if (data && data.photos) {
    return (
      <Box>
        <ListPhotos photos={data.photos} />
      </Box>
    )
  }

  return <Spinner />
}

export default RoversData
