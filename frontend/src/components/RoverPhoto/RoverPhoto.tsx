import {
  Image,
  Box,
  Text,
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

function RoverPhoto({
  id,
  src,
  camera,
  favCb,
  roverName,
  removeBtn,
  onOpenLightbox,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isCameraInfoOpen,
    onOpen: onCameraInfoOpen,
    onClose: onCameraInfoClose,
  } = useDisclosure()
  const { state } = useFiltersContext()
  const resolvedRoverName = roverName || state.rover?.name
  const cardBg = useColorModeValue("dust.100", "iron.800")
  const cardBorder = useColorModeValue("dust.200", "iron.700")
  const cardHoverBorder = useColorModeValue("dust.300", "iron.600")

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
        borderRadius="lg"
        overflow="hidden"
        borderWidth="1px"
        borderColor={cardBorder}
        transition="border-color 0.2s, transform 0.2s"
        _hover={{
          borderColor: cardHoverBorder,
          transform: "translateY(-2px)",
          "& .photo-actions": { opacity: 1 },
          "& .photo-img": { transform: "scale(1.03)" },
        }}
        position="relative"
        role="article"
        aria-label={`Photo ${id} from ${camera}${roverName ? ` by ${roverName}` : ""}`}
        cursor="pointer"
        onClick={onOpenLightbox ?? onOpen}
      >
        <Box overflow="hidden" sx={{ aspectRatio: "4/3" }}>
          <Image
            className="photo-img"
            w="100%"
            h="100%"
            objectFit="cover"
            src={src}
            alt={`Mars rover photo ${id} taken by ${camera}`}
            loading="lazy"
            transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
          />
        </Box>

        {/* Top-left camera label, mono pill */}
        <Flex position="absolute" top={2} left={2} align="center" gap={1}>
          <Text
            bg="rgba(13,9,7,0.7)"
            color="dust.100"
            fontFamily="mono"
            fontSize="2xs"
            fontWeight="500"
            textTransform="uppercase"
            letterSpacing="0.08em"
            px={1.5}
            py={0.5}
            borderRadius="md"
            noOfLines={1}
            maxW={{ base: "calc(100% - 12px)", md: "none" }}
            sx={{ backdropFilter: "blur(4px)" }}
          >
            {camera}
          </Text>
          <IconButton
            aria-label="Camera info"
            icon={<InfoOutlineIcon boxSize={{ base: 2.5, md: 3 }} />}
            size="xs"
            bg="rgba(13,9,7,0.7)"
            color="dust.100"
            borderRadius="md"
            minW={{ base: "18px", md: "22px" }}
            minH={{ base: "18px", md: "22px" }}
            h={{ base: "18px", md: "22px" }}
            _hover={{ bg: "rgba(13,9,7,0.9)", color: "white" }}
            onClick={handleCameraInfo}
            sx={{ backdropFilter: "blur(4px)" }}
          />
        </Flex>

        {/* Rover badge (favorites page) — top-right, mono */}
        {roverName && (
          <Text
            position="absolute"
            top={2}
            right={2}
            bg="mars.500"
            color="white"
            fontFamily="mono"
            fontSize="2xs"
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="0.08em"
            px={1.5}
            py={0.5}
            borderRadius="md"
          >
            {roverName}
          </Text>
        )}

        {/* Bottom action bar */}
        <Flex
          className="photo-actions"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bgGradient="linear(to-t, rgba(13,9,7,0.85), rgba(13,9,7,0))"
          px={2}
          pt={6}
          pb={1.5}
          justify="space-between"
          align="center"
          opacity={{ base: 1, md: 0 }}
          transition="opacity 0.25s"
        >
          <Text
            color="dust.300"
            fontFamily="mono"
            fontSize="2xs"
            display={{ base: "none", sm: "block" }}
            sx={{ fontVariantNumeric: "tabular-nums" }}
          >
            #{id}
          </Text>

          <Flex gap={0}>
            <IconButton
              aria-label={`View photo ${id} fullscreen`}
              icon={<ViewIcon boxSize={{ base: 3, md: 4 }} />}
              size="xs"
              variant="ghost"
              color="white"
              borderRadius="md"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleExpand}
              minW={{ base: "28px", md: "32px" }}
              minH={{ base: "28px", md: "32px" }}
            />
            <IconButton
              aria-label={`Open photo ${id} in new tab`}
              icon={<ExternalLinkIcon boxSize={{ base: 3, md: 4 }} />}
              size="xs"
              variant="ghost"
              color="white"
              borderRadius="md"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleOpenNewTab}
              minW={{ base: "28px", md: "32px" }}
              minH={{ base: "28px", md: "32px" }}
            />
            <IconButton
              aria-label={
                removeBtn
                  ? `Remove photo ${id} from favorites`
                  : `Add photo ${id} to favorites`
              }
              icon={
                removeBtn ? (
                  <CloseIcon boxSize={{ base: 2.5, md: 3 }} />
                ) : (
                  <StarIcon boxSize={{ base: 3, md: 4 }} />
                )
              }
              size="xs"
              variant="ghost"
              color={removeBtn ? "red.300" : "yellow.300"}
              borderRadius="md"
              _hover={{
                bg: "whiteAlpha.300",
                color: removeBtn ? "red.400" : "yellow.400",
              }}
              onClick={handleFav}
              minW={{ base: "28px", md: "32px" }}
              minH={{ base: "28px", md: "32px" }}
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
