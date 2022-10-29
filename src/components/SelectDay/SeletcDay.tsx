import { useContext, useMemo } from "react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { useRovers } from "@/queries/useRovers"
import { FiltersContext } from "@/state/FiltersContext"
function SelectDay() {
  const { roversLoaded } = useRovers()
  const { state, actions } = useContext(FiltersContext)
  const selectedRover = useMemo(() => (state ? state.rover : null), [state])
  const onChangeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // actions?.setCamera(value)
  }
  // console.log(selectedRover)
  return (
    <>
      <h2>Sol Date:</h2>
      <NumberInput
        defaultValue={0}
        max={selectedRover?.max_sol ? selectedRover?.max_sol : undefined}
        placeholder={roversLoaded ? "Martian Day..." : "Loading"}
        clampValueOnBlur={false}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
    // <Select
    //   onChange={onChangeCamera}
    //   disabled={!roversLoaded}
    //   defaultValue={state?.camera ? state.camera.name : undefined}
    //   placeholder={!selectedRover && !roversLoaded ? "Loading..." : undefined}
    // >
    //   {selectedRover?.cameras.map((camera: any) => (
    //     <option key={camera.id} value={camera.name}>
    //       {camera.name}
    //     </option>
    //   ))}
    // </Select>
  )
}
export default SelectDay
