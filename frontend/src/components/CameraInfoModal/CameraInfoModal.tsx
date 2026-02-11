import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
  Image,
  VStack,
  HStack,
  Box,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"
import cameraInfo, {
  categoryLabels,
  categoryColors,
  roverDiagrams,
} from "@/data/cameraInfo"

function LocationIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={4}>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
    </Icon>
  )
}

function CameraIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={4}>
      <path
        fill="currentColor"
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"
      />
      <path
        fill="currentColor"
        d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
      />
    </Icon>
  )
}

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
  const [imageExpanded, setImageExpanded] = useState(false)

  const bgColor = useColorModeValue("white", "gray.800")
  const subtitleColor = useColorModeValue("gray.500", "whiteAlpha.600")
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.50")
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100")
  const accentColor = categoryColors[info?.category] ?? "gray"

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { setImageExpanded(false); onClose() }}
      isCentered
      size={imageExpanded ? "4xl" : "md"}
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(6px)" />
      <ModalContent
        bg={bgColor}
        borderRadius="2xl"
        mx={3}
        overflow="hidden"
        transition="all 0.2s"
      >
        <ModalCloseButton
          bg="blackAlpha.500"
          color="white"
          borderRadius="full"
          _hover={{ bg: "blackAlpha.700" }}
          top={2}
          right={2}
          zIndex={3}
        />

        {/* Header band with accent color */}
        <Box
          bg={`${accentColor}.500`}
          px={5}
          pt={10}
          pb={4}
        >
          <VStack align="start" spacing={1}>
            <HStack spacing={2}>
              <Badge
                bg="whiteAlpha.200"
                color="white"
                borderRadius="full"
                px={2.5}
                py={0.5}
                fontSize="xs"
                fontWeight="600"
              >
                {info ? categoryLabels[info.category] : "Camera"}
              </Badge>
              {roverName && (
                <Badge
                  bg="whiteAlpha.200"
                  color="white"
                  borderRadius="full"
                  px={2.5}
                  py={0.5}
                  fontSize="xs"
                >
                  {roverName}
                </Badge>
              )}
            </HStack>
            <Text fontSize="xl" fontWeight="700" color="white" lineHeight="short">
              {cameraFullName}
            </Text>
          </VStack>
        </Box>

        <ModalBody px={5} py={4}>
          {info ? (
            <VStack align="stretch" spacing={4}>
              {/* Description */}
              <Text fontSize="sm" lineHeight="1.7" color={useColorModeValue("gray.700", "whiteAlpha.900")}>
                {info.description}
              </Text>

              {/* Info cards row */}
              <Flex gap={3}>
                <Box
                  flex={1}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorder}
                  px={3}
                  py={2.5}
                  borderRadius="xl"
                >
                  <HStack spacing={1.5} mb={1}>
                    <LocationIcon />
                    <Text fontSize="xs" color={subtitleColor} fontWeight="600">
                      Location
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="500">
                    {info.location}
                  </Text>
                </Box>

                <Box
                  flex={1}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorder}
                  px={3}
                  py={2.5}
                  borderRadius="xl"
                >
                  <HStack spacing={1.5} mb={1}>
                    <CameraIcon />
                    <Text fontSize="xs" color={subtitleColor} fontWeight="600">
                      Type
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="500">
                    {info.category === "science"
                      ? "Science instrument"
                      : info.category === "edl"
                      ? "Landing camera"
                      : "Navigation / safety"}
                  </Text>
                </Box>
              </Flex>

              {/* Rover diagram - clickable to expand */}
              {diagram && (
                <Box>
                  <Text fontSize="xs" color={subtitleColor} fontWeight="600" mb={2}>
                    Camera locations on {roverName}
                  </Text>
                  <Box
                    borderRadius="xl"
                    overflow="hidden"
                    border="1px solid"
                    borderColor={cardBorder}
                    cursor="pointer"
                    onClick={() => setImageExpanded(!imageExpanded)}
                    transition="all 0.2s"
                    _hover={{ borderColor: `${accentColor}.300`, boxShadow: "md" }}
                    position="relative"
                  >
                    <Image
                      src={diagram}
                      alt={`${roverName ?? "Rover"} camera locations — NASA/JPL-Caltech`}
                      w="100%"
                      maxH={imageExpanded ? "none" : "280px"}
                      objectFit={imageExpanded ? "contain" : "cover"}
                      bg="gray.900"
                    />
                    {!imageExpanded && (
                      <Flex
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="blackAlpha.600"
                        px={3}
                        py={1.5}
                        justify="center"
                      >
                        <Text fontSize="xs" color="whiteAlpha.800">
                          Tap to expand diagram
                        </Text>
                      </Flex>
                    )}
                  </Box>
                  <Text fontSize="xs" color={subtitleColor} mt={1.5}>
                    NASA/JPL-Caltech
                  </Text>
                </Box>
              )}
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
