import { SelectRover, SelectCamera, SelectDay } from "@/components"
import { Flex } from "@chakra-ui/react"
function Filters() {
  return (
    <>
      <Flex align="flex-start" justify="center" direction={{ base: "column", md: "row" }}>
        <SelectRover />
        <SelectCamera />
        <SelectDay />
      </Flex>
    </>
  )
}
export default Filters
