import { createContext, useReducer, useMemo } from "react"
import { filtersReducer } from "./FiltersReducer"
import { filtersActions } from "./FiltersActions"
import type { Filters } from "@/setup/types"

interface FiltersContext {
  state: Filters
  actions: any
}

const initialState: Filters = {
  rover: null,
  camera: null,
  page: 1,
  day: null,
  dayType: null,
}

const initialContext = {
  state: initialState,
  actions: filtersActions,
}

interface Props {
  children: JSX.Element
}

const FiltersContext = createContext<FiltersContext>(initialContext)
function FiltersContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(filtersReducer, initialState)
  const actions = useMemo(() => filtersActions(dispatch), [])
  return (
    <FiltersContext.Provider value={{ state, actions }}>
      {children}
    </FiltersContext.Provider>
  )
}

export { FiltersContextProvider, FiltersContext }
