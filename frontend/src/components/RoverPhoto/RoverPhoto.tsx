import {
  Image,
  Box,
  Badge,
  IconButton,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import {
  StarIcon,
  CloseIcon,
  ExternalLinkIcon,
  ViewIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons"
import PhotoLightbox from "@/components/PhotoLightbox/PhotoLightbox"
import CameraInfoModal from "@/components/CameraInfoModal/CameraInfoModal"
import { useFiltersContext } from "@/hooks/useFiltersContext"

interface Props {
  id: number
  src: string
  camera: string
  favCb: () => void
  roverName?: string
  removeBtn?: boolean
  onOpenLightbox?: () => void
}

function RoverPhoto({ id, src, camera, favCb, roverName, removeBtn, onOpenLightbox }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isCameraInfoOpen, onOpen: onCameraInfoOpen, onClose: onCameraInfoClose } = useDisclosure()
  const { state } = useFiltersContext()
  const resolvedRoverName = roverName || state.rover?.name
  const cardBg = useColorModeValue("white", "gray.700")
  const overlayBg = "rgba(0, 0, 0, 0.6)"
  const actionBarBg = "rgba(0, 0, 0, 0.5)"

  const handleOpenNewTab = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(src, "_blank", "noopener,noreferrer")
  }

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation()
    favCb()
  }

  const handleCameraInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCameraInfoOpen()
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    onOpenLightbox ? onOpenLightbox() : onOpen()
  }

  return (
    <>
      <Box
        bg={cardBg}
        borderRadius="xl"
        overflow="hidden"
        boxShadow={useColorModeValue(
          "0 1px 3px rgba(0,0,0,0.1)",
          "0 1px 3px rgba(0,0,0,0.4)"
        )}
        transition="transform 0.15s, box-shadow 0.15s"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: useColorModeValue(
            "0 4px 12px rgba(0,0,0,0.15)",
            "0 4px 12px rgba(0,0,0,0.5)"
          ),
          "& .photo-actions": {
            opacity: 1,
          },
        }}
        position="relative"
        role="article"
        aria-label={`Photo ${id} from ${camera}${roverName ? ` by ${roverName}` : ""}`}
        cursor="pointer"
        onClick={onOpenLightbox ?? onOpen}
      >
        <Image
          w="100%"
          objectFit="cover"
          src={src}
          alt={`Mars rover photo ${id} taken by ${camera}`}
          sx={{ aspectRatio: "4/3" }}
          loading="lazy"
        />

        {/* Camera badge overlay - top left */}
        <Flex
          position="absolute"
          top={1.5}
          left={1.5}
          align="center"
          gap={0.5}
        >
          <Badge
            bg={overlayBg}
            color="white"
            fontSize={{ base: "9px", md: "xs" }}
            fontWeight="500"
            px={1.5}
            py={0.5}
            borderRadius="md"
            maxW={{ base: "calc(100% - 12px)", md: "auto" }}
            noOfLines={1}
          >
            {camera}
          </Badge>
          <IconButton
            aria-label="Camera info"
            icon={<InfoOutlineIcon boxSize={{ base: 2.5, md: 3 }} />}
            size="xs"
            bg={overlayBg}
            color="whiteAlpha.800"
            borderRadius="md"
            minW={{ base: "18px", md: "22px" }}
            minH={{ base: "18px", md: "22px" }}
            h={{ base: "18px", md: "22px" }}
            _hover={{ bg: "rgba(0,0,0,0.8)", color: "white" }}
            onClick={handleCameraInfo}
          />
        </Flex>

        {/* Rover name badge (favorites page) */}
        {roverName && (
          <Badge
            position="absolute"
            top={2}
            left="auto"
            right="auto"
            ml="50%"
            transform="translateX(-50%)"
            bg="mars.500"
            color="white"
            fontSize="xs"
            fontWeight="600"
            px={2}
            py={0.5}
            borderRadius="md"
          >
            {roverName}
          </Badge>
        )}

        {/* Action bar at bottom */}
        <Flex
          className="photo-actions"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg={actionBarBg}
          backdropFilter="blur(4px)"
          px={2}
          py={1}
          justify="space-between"
          align="center"
          opacity={{ base: 1, md: 0 }}
          transition="opacity 0.2s"
        >
          <Badge
            bg="transparent"
            color="whiteAlpha.800"
            fontSize={{ base: "9px", md: "xs" }}
            px={0.5}
            display={{ base: "none", sm: "block" }}
          >
            #{id}
          </Badge>

          <Flex gap={0}>
            {/* Expand / Fullscreen */}
            <IconButton
              aria-label={`View photo ${id} fullscreen`}
              icon={<ViewIcon boxSize={{ base: 3, md: 4 }} />}
              size="xs"
              variant="ghost"
              color="white"
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleExpand}
              minW={{ base: "28px", md: "44px" }}
              minH={{ base: "28px", md: "44px" }}
            />

            {/* Open in new tab */}
            <IconButton
              aria-label={`Open photo ${id} in new tab`}
              icon={<ExternalLinkIcon boxSize={{ base: 3, md: 4 }} />}
              size="xs"
              variant="ghost"
              color="white"
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleOpenNewTab}
              minW={{ base: "28px", md: "44px" }}
              minH={{ base: "28px", md: "44px" }}
            />

            {/* Favorite / Remove */}
            <IconButton
              aria-label={removeBtn ? `Remove photo ${id} from favorites` : `Add photo ${id} to favorites`}
              icon={removeBtn ? <CloseIcon boxSize={{ base: 2.5, md: 3 }} /> : <StarIcon boxSize={{ base: 3, md: 4 }} />}
              size="xs"
              variant="ghost"
              color={removeBtn ? "red.300" : "yellow.300"}
              borderRadius="full"
              _hover={{
                bg: "whiteAlpha.300",
                color: removeBtn ? "red.400" : "yellow.400",
              }}
              onClick={handleFav}
              minW={{ base: "28px", md: "44px" }}
              minH={{ base: "28px", md: "44px" }}
            />
          </Flex>
        </Flex>
      </Box>

      {!onOpenLightbox && (
        <PhotoLightbox
          isOpen={isOpen}
          onClose={onClose}
          src={src}
          id={id}
          camera={camera}
          roverName={resolvedRoverName}
          onToggleFav={favCb}
          removeMode={removeBtn}
        />
      )}

      <CameraInfoModal
        isOpen={isCameraInfoOpen}
        onClose={onCameraInfoClose}
        cameraFullName={camera}
        roverName={resolvedRoverName}
      />
    </>
  )
}

export default RoverPhoto
