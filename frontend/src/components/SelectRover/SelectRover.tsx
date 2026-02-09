import { useMemo } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRovers, useRoverPhotos } from "@/queries"
import type { Rover } from "@/setup/types"
import { useFiltersContext } from "@/hooks/useFiltersContext"

function SelectRovers() {
  const { listRovers, roversLoaded } = useRovers()
  const { state, actions } = useFiltersContext()
  const { isRefetching } = useRoverPhotos()
  const selectedRover = useMemo(() => state.rover, [state.rover?.id])
  const activeBg = useColorModeValue("mars.500", "mars.500")
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100")
  const inactiveColor = useColorModeValue("gray.700", "whiteAlpha.800")

  const onSelectRover = (roverId: number) => {
    if (selectedRover?.id === roverId) return
    actions.setRover(roverId, listRovers.rovers)
  }

  if (!roversLoaded) {
    return (
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="600">
          Rover
        </FormLabel>
        <Flex gap={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="32px" width="80px" borderRadius="full" />
          ))}
        </Flex>
      </FormControl>
    )
  }

  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="600">
        Rover
      </FormLabel>
      <Flex
        gap={2}
        overflowX="auto"
        pb={1}
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
        role="radiogroup"
        aria-label="Select rover"
      >
        {listRovers.rovers.map((rover: Rover) => {
          const isSelected = selectedRover?.id === rover.id
          const hasPhotos = rover.total_photos > 0
          return (
            <Button
              key={rover.id}
              size="sm"
              borderRadius="full"
              bg={isSelected ? activeBg : inactiveBg}
              color={isSelected ? "white" : inactiveColor}
              fontWeight={isSelected ? "600" : "500"}
              onClick={() => onSelectRover(rover.id)}
              isDisabled={!hasPhotos || isRefetching}
              _hover={{
                bg: isSelected ? "mars.400" : useColorModeValue("gray.200", "whiteAlpha.200"),
              }}
              flexShrink={0}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${rover.name}${!hasPhotos ? ", no photos available" : ""}`}
              minW="44px"
              minH="44px"
            >
              {rover.name}
            </Button>
          )
        })}
      </Flex>
    </FormControl>
  )
}

export default SelectRovers
