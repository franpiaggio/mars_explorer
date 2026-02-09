import {
  Box,
  Heading,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"
import { WarningTwoIcon, CloseIcon, StarIcon } from "@chakra-ui/icons"

interface Props {
  isError?: boolean
  isFavorites?: boolean
}

export default function EmptyState({ isError, isFavorites }: Props) {
  const iconBg = useColorModeValue("gray.100", "whiteAlpha.100")
  const textColor = useColorModeValue("gray.500", "whiteAlpha.600")

  const getIcon = () => {
    if (isError) return <CloseIcon boxSize={6} color="red.400" />
    if (isFavorites) return <StarIcon boxSize={8} color="yellow.400" />
    return <WarningTwoIcon boxSize={8} color="mars.400" />
  }

  const getTitle = () => {
    if (isError) return "Something went wrong"
    if (isFavorites) return "No favorites yet"
    return "No photos found"
  }

  const getMessage = () => {
    if (isError) return "There was an error connecting to the server. Please try again."
    if (isFavorites) return "Photos you save will appear here. Start exploring!"
    return "No photos available for this date and camera combination."
  }

  return (
    <Box textAlign="center" py={16} px={6} role="status">
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w={16}
        h={16}
        borderRadius="full"
        bg={iconBg}
        mb={4}
      >
        {getIcon()}
      </Box>
      <Heading as="h2" size="md" mb={2}>
        {getTitle()}
      </Heading>
      <Text color={textColor} maxW="sm" mx="auto">
        {getMessage()}
      </Text>
    </Box>
  )
}
