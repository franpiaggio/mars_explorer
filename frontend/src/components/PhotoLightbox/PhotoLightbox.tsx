import { useEffect, useCallback, useRef, useState } from "react"
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
  useDisclosure,
  HStack,
  Box,
} from "@chakra-ui/react"
import {
  ExternalLinkIcon,
  StarIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons"
import CameraInfoModal from "@/components/CameraInfoModal/CameraInfoModal"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch"

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
  onPrev?: () => void
  onNext?: () => void
  currentIndex?: number
  totalCount?: number
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
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: PhotoLightboxProps) {
  const overlayBg = "rgba(0, 0, 0, 0.85)"
  const toolbarBg = useColorModeValue("whiteAlpha.900", "blackAlpha.700")
  const { isOpen: isCameraInfoOpen, onOpen: onCameraInfoOpen, onClose: onCameraInfoClose } = useDisclosure()
  const hasNav = onPrev && onNext && totalCount !== undefined && currentIndex !== undefined

  const touchStartX = useRef<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const zoomRef = useRef<ReactZoomPanPinchRef>(null)

  const handleOpenNewTab = () => {
    window.open(src, "_blank", "noopener,noreferrer")
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!hasNav) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        onNext()
      }
    },
    [hasNav, onPrev, onNext]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasNav || touchStartX.current === null || isZoomed) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50
    if (diff > threshold) onPrev()
    else if (diff < -threshold) onNext()
    touchStartX.current = null
  }

  const navButtonStyles = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    bg: "blackAlpha.500",
    color: "white",
    borderRadius: "full",
    _hover: { bg: "blackAlpha.700" },
    size: "lg" as const,
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
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="100%"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {hasNav && currentIndex > 0 && (
              <IconButton
                aria-label="Previous photo"
                icon={<ChevronLeftIcon boxSize={8} />}
                {...navButtonStyles}
                left={{ base: 1, md: 4 }}
                onClick={onPrev}
              />
            )}

            <TransformWrapper
              ref={zoomRef}
              key={src}
              minScale={1}
              maxScale={5}
              doubleClick={{ mode: "toggle", step: 2 }}
              panning={{ disabled: !isZoomed }}
              onTransformed={(_, state) => {
                setIsZoomed(state.scale > 1.05)
              }}
            >
              <TransformComponent
                wrapperStyle={{ maxHeight: "85vh", maxWidth: "85vw", margin: "0 auto" }}
                contentStyle={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  src={src}
                  alt={`Mars rover photo ${id} taken by ${camera}`}
                  maxH="85vh"
                  maxW={{ base: "80vw", md: "85vw" }}
                  objectFit="contain"
                  borderRadius="lg"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>

            {hasNav && currentIndex < totalCount - 1 && (
              <IconButton
                aria-label="Next photo"
                icon={<ChevronRightIcon boxSize={8} />}
                {...navButtonStyles}
                right={{ base: 1, md: 4 }}
                onClick={onNext}
              />
            )}
          </Box>

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
            {hasNav && (
              <Text fontSize="xs" color="whiteAlpha.700" fontWeight="600">
                {currentIndex + 1} / {totalCount}
              </Text>
            )}

            <HStack spacing={1}>
              {roverName && (
                <Badge colorScheme="orange" borderRadius="full" px={2}>
                  {roverName}
                </Badge>
              )}
              <Badge variant="subtle" borderRadius="full" px={2}>
                {camera}
              </Badge>
              <IconButton
                aria-label="Camera info"
                icon={<InfoOutlineIcon boxSize={3.5} />}
                size="xs"
                variant="ghost"
                color="whiteAlpha.700"
                borderRadius="full"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                onClick={onCameraInfoOpen}
                minW="28px"
                minH="28px"
              />
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

      <CameraInfoModal
        isOpen={isCameraInfoOpen}
        onClose={onCameraInfoClose}
        cameraFullName={camera}
        roverName={roverName}
      />
    </Modal>
  )
}

export default PhotoLightbox
