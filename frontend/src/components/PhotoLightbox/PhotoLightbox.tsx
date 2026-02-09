import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  IconButton,
  Text,
  Badge,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react"
import { ExternalLinkIcon, StarIcon, CloseIcon } from "@chakra-ui/icons"

interface PhotoLightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  id: number
  camera: string
  roverName?: string
  isFavorite?: boolean
  onToggleFav: () => void
  removeMode?: boolean
}

function PhotoLightbox({
  isOpen,
  onClose,
  src,
  id,
  camera,
  roverName,
  isFavorite,
  onToggleFav,
  removeMode,
}: PhotoLightboxProps) {
  const overlayBg = "rgba(0, 0, 0, 0.85)"
  const toolbarBg = useColorModeValue("whiteAlpha.900", "blackAlpha.700")

  const handleOpenNewTab = () => {
    window.open(src, "_blank", "noopener,noreferrer")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
      <ModalOverlay bg={overlayBg} />
      <ModalContent
        bg="transparent"
        boxShadow="none"
        m={0}
        maxW="100vw"
        maxH="100vh"
      >
        <ModalCloseButton
          color="white"
          size="lg"
          top={3}
          right={3}
          zIndex={2}
          bg="blackAlpha.500"
          borderRadius="full"
          _hover={{ bg: "blackAlpha.700" }}
          aria-label="Close fullscreen view"
        />

        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={0}
          onClick={onClose}
        >
          <Image
            src={src}
            alt={`Mars rover photo ${id} taken by ${camera}`}
            maxH="85vh"
            maxW="95vw"
            objectFit="contain"
            borderRadius="lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Toolbar below image */}
          <Flex
            mt={3}
            px={4}
            py={2}
            bg={toolbarBg}
            borderRadius="full"
            align="center"
            gap={3}
            onClick={(e) => e.stopPropagation()}
            backdropFilter="blur(10px)"
          >
            <HStack spacing={1}>
              {roverName && (
                <Badge colorScheme="orange" borderRadius="full" px={2}>
                  {roverName}
                </Badge>
              )}
              <Badge variant="subtle" borderRadius="full" px={2}>
                {camera}
              </Badge>
              <Text fontSize="xs" color="whiteAlpha.700">
                #{id}
              </Text>
            </HStack>

            <IconButton
              aria-label="Open image in new tab"
              icon={<ExternalLinkIcon boxSize={4} />}
              size="sm"
              variant="ghost"
              color="white"
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={handleOpenNewTab}
              minW="44px"
              minH="44px"
            />

            <IconButton
              aria-label={removeMode ? "Remove from favorites" : isFavorite ? "Remove from favorites" : "Add to favorites"}
              icon={removeMode ? <CloseIcon boxSize={3} /> : <StarIcon boxSize={4} />}
              size="sm"
              variant="ghost"
              color={removeMode ? "red.300" : isFavorite ? "yellow.400" : "whiteAlpha.600"}
              borderRadius="full"
              _hover={{
                bg: "whiteAlpha.200",
                color: removeMode ? "red.400" : "yellow.400",
              }}
              onClick={onToggleFav}
              minW="44px"
              minH="44px"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PhotoLightbox
