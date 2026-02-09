import { useRef, useEffect } from "react"
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react"
import type { ManifestEntry } from "@/setup/types"

interface SolListProps {
  entries: ManifestEntry[]
  selectedSol: number | null
  onSolSelect: (entry: ManifestEntry) => void
  maxItems?: number
}

function SolList({ entries, selectedSol, onSolSelect, maxItems = 50 }: SolListProps) {
  const selectedRef = useRef<HTMLDivElement>(null)
  const bgSurface = useColorModeValue("white", "gray.700")
  const bgHover = useColorModeValue("gray.50", "whiteAlpha.100")
  const selectedBg = useColorModeValue("mars.50", "rgba(217, 90, 50, 0.2)")
  const selectedBorder = useColorModeValue("mars.500", "mars.400")
  const textSecondary = useColorModeValue("gray.500", "whiteAlpha.600")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")

  const recentEntries = entries.slice(-maxItems).reverse()

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [selectedSol])

  return (
    <Box
      bg={bgSurface}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      maxH="280px"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" overflowY="auto" role="listbox" aria-label="Sol list">
        {recentEntries.map((entry) => {
          const isSelected = entry.sol === selectedSol
          return (
            <Flex
              ref={isSelected ? selectedRef : undefined}
              key={entry.sol}
              px={3}
              py={1.5}
              cursor="pointer"
              align="center"
              justify="space-between"
              bg={isSelected ? selectedBg : "transparent"}
              borderLeftWidth="3px"
              borderLeftColor={isSelected ? selectedBorder : "transparent"}
              _hover={{ bg: isSelected ? selectedBg : bgHover }}
              onClick={() => onSolSelect(entry)}
              role="option"
              aria-selected={isSelected}
              aria-label={`Sol ${entry.sol}, ${entry.earth_date}, ${entry.total_photos} photos`}
            >
              <Box>
                <Text fontSize="xs" fontWeight={isSelected ? "600" : "500"}>
                  Sol {entry.sol}
                </Text>
                <Text fontSize="10px" color={textSecondary}>
                  {entry.earth_date}
                </Text>
              </Box>
              <Flex align="center" gap={1}>
                <Badge
                  colorScheme="orange"
                  variant={isSelected ? "solid" : "subtle"}
                  fontSize="10px"
                  borderRadius="full"
                >
                  {entry.total_photos}
                </Badge>
                <Text fontSize="10px" color={textSecondary}>
                  {entry.cameras.length}cam
                </Text>
              </Flex>
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}

export default SolList
