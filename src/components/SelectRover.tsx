import { Select } from "@chakra-ui/react"
function SelectRovers() {
  return (
    <Select defaultValue={"curiosity"} placeholder="Select option">
      <option value="curiosity">Curiosity</option>
      <option value="oportunity">Oportunity</option>
      <option value="spirit">Spirit</option>
    </Select>
  )
}
export default SelectRovers
