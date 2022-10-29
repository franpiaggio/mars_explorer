import { createContext, useReducer } from "react"
import { filtersReducer } from "./FiltersReducer"
import { filtersActions } from "./FiltersActions"
import type { Filters, Rover, Camera } from "@/setup/types"

interface FilterActions {
  setDefaultRover: (rover: Rover) => void
  setRover: (roverName: string, rovers: Rover[]) => void
  setDefaultCamera: (camera: Camera) => void
  setCamera: (camera: string) => void
}

interface FiltersContext {
  state: Filters | null
  actions: FilterActions | null
}
const initialContext = {
  state: null,
  actions: null,
}
const initialState: Filters = {
  rover: null,
  camera: null,
}

interface Props {
  children: JSX.Element
}

const FiltersContext = createContext<FiltersContext>(initialContext)
function FiltersContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(filtersReducer, initialState)
  const actions = filtersActions(dispatch)
  return (
    <FiltersContext.Provider value={{ state, actions }}>
      {children}
    </FiltersContext.Provider>
  )
}

export { FiltersContextProvider, FiltersContext }
