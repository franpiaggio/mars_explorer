import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"

interface Props {
  isError?: boolean
  isFavorites?: boolean
}

function ErrorMark() {
  return (
    <Box
      w="40px"
      h="40px"
      borderRadius="full"
      bg="red.400"
      opacity={0.85}
      mx="auto"
      mb={5}
      sx={{
        boxShadow:
          "inset -3px -3px 8px rgba(0,0,0,0.35), 0 0 0 6px rgba(220,38,38,0.12)",
      }}
    />
  )
}

function FavMark() {
  return (
    <Box
      w="40px"
      h="40px"
      borderRadius="full"
      bgGradient="radial(circle at 30% 30%, #f5d2c2, #c4471c 55%, #521a08)"
      mx="auto"
      mb={5}
      sx={{
        boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.45)",
      }}
    />
  )
}

function MarsDisc() {
  return (
    <Box
      w="40px"
      h="40px"
      borderRadius="full"
      bgGradient="radial(circle at 30% 30%, #e08763, #c4471c 55%, #7a280d)"
      mx="auto"
      mb={5}
      sx={{
        boxShadow:
          "inset -3px -3px 8px rgba(0,0,0,0.45), 0 0 0 6px rgba(196,71,28,0.08)",
      }}
    />
  )
}

export default function EmptyState({ isError, isFavorites }: Props) {
  const textColor = useColorModeValue("iron.500", "dust.200")
  const labelColor = useColorModeValue("iron.400", "dust.400")

  const getMark = () => {
    if (isError) return <ErrorMark />
    if (isFavorites) return <FavMark />
    return <MarsDisc />
  }

  const getLabel = () => {
    if (isError) return "Connection error"
    if (isFavorites) return "Your collection"
    return "No photos"
  }

  const getTitle = () => {
    if (isError) return "Couldn't reach the archive."
    if (isFavorites) return "Nothing saved yet."
    return "No photos for this combination."
  }

  const getMessage = () => {
    if (isError)
      return "The server didn't respond. Refresh, or try again in a moment."
    if (isFavorites)
      return "Tap the star on any photo to save it here for later."
    return "Try a different sol, camera, or rover."
  }

  return (
    <Stack
      align="center"
      py={20}
      px={6}
      role="status"
      spacing={0}
      maxW="420px"
      mx="auto"
      textAlign="center"
    >
      {getMark()}
      <Text
        fontFamily="mono"
        fontSize="2xs"
        color={labelColor}
        textTransform="uppercase"
        letterSpacing="0.18em"
        mb={2}
      >
        {getLabel()}
      </Text>
      <Heading as="h2" size="md" letterSpacing="-0.02em" fontWeight="600" mb={2}>
        {getTitle()}
      </Heading>
      <Text color={textColor} fontSize="sm" maxW="36ch" lineHeight="1.55">
        {getMessage()}
      </Text>
    </Stack>
  )
}
