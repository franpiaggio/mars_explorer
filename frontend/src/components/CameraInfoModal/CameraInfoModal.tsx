import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
  Image,
  VStack,
  HStack,
  Box,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react"
import cameraInfo, {
  categoryLabels,
  categoryColors,
  roverDiagrams,
} from "@/data/cameraInfo"

interface CameraInfoModalProps {
  isOpen: boolean
  onClose: () => void
  cameraFullName: string
  roverName?: string
}

function CameraInfoModal({
  isOpen,
  onClose,
  cameraFullName,
  roverName,
}: CameraInfoModalProps) {
  const info = cameraInfo[cameraFullName]
  const roverKey = roverName?.toLowerCase() ?? ""
  const diagram = roverDiagrams[roverKey]

  const bgColor = useColorModeValue("white", "gray.800")
  const subtitleColor = useColorModeValue("gray.500", "whiteAlpha.600")
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100")
  const locationBg = useColorModeValue("gray.50", "whiteAlpha.50")

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        bg={bgColor}
        borderRadius="xl"
        mx={4}
        overflow="hidden"
      >
        {diagram && (
          <Image
            src={diagram}
            alt={`${roverName ?? "Rover"} camera locations diagram — NASA/JPL-Caltech`}
            w="100%"
            maxH="220px"
            objectFit="cover"
          />
        )}

        <ModalCloseButton
          bg="blackAlpha.500"
          color="white"
          borderRadius="full"
          _hover={{ bg: "blackAlpha.700" }}
          top={2}
          right={2}
        />

        <ModalHeader pb={1} pt={4}>
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="700" lineHeight="short">
              {cameraFullName}
            </Text>
            {info && (
              <HStack spacing={2}>
                <Badge
                  colorScheme={categoryColors[info.category]}
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {categoryLabels[info.category]}
                </Badge>
                {roverName && (
                  <Text fontSize="xs" color={subtitleColor}>
                    {roverName}
                  </Text>
                )}
              </HStack>
            )}
          </VStack>
        </ModalHeader>

        <ModalBody pb={5}>
          {info ? (
            <VStack align="stretch" spacing={3}>
              <Text fontSize="sm" lineHeight="tall">
                {info.description}
              </Text>

              <Divider borderColor={borderColor} />

              <Box
                bg={locationBg}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text fontSize="xs" color={subtitleColor} fontWeight="600" mb={0.5}>
                  Location on rover
                </Text>
                <Text fontSize="sm" fontWeight="500">
                  {info.location}
                </Text>
              </Box>

              <Text fontSize="xs" color={subtitleColor}>
                Image: NASA/JPL-Caltech
              </Text>
            </VStack>
          ) : (
            <Text fontSize="sm" color={subtitleColor}>
              No additional information available for this camera.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CameraInfoModal
