import { Box, Heading, Text } from "@chakra-ui/react"
import { WarningTwoIcon, CloseIcon } from "@chakra-ui/icons"

interface Props {
  isError?: boolean
}

export default function EmptyState({ isError }: Props) {
  return (
    <Box textAlign="center" py={10} px={6}>
      {isError ? (
        <CloseIcon boxSize={"20px"} color={"white"} />
      ) : (
        <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      )}
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {isError ? "Error" : "No data"}
      </Heading>
      <Text color={"gray.500"}>
        {isError ? "An error occurred with the server" : "No photos found here"}
      </Text>
    </Box>
  )
}
