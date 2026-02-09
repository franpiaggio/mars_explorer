import { ACTIONS } from "@/state/actions"
import type { Rover, Camera, Filters, FilterAction } from "@/setup/types"
import { initialState } from "./FiltersContext"
function filtersReducer(state: Filters, action: FilterAction): Filters {
  switch (action.type) {
    case ACTIONS.SET_DEFAULT_ROVER:
      return {
        ...state,
        rover: action.payload.rover,
        camera: null,
        sol: action.payload.sol ?? null,
        earth_date: null,
      }

    case ACTIONS.SET_ROVER:
      const selectedRover = action.payload.rovers
        ? action.payload.rovers.filter(
            (rover: Rover) => rover.id === action.payload.roverId
          )[0]
        : null
      return {
        ...state,
        rover: selectedRover,
        camera: null,
        page: 1,
        sol: selectedRover?.max_sol ?? null,
        earth_date: null,
      }

    case ACTIONS.SET_DEFAULT_CAMERA:
      return { ...state, camera: action.payload.camera }

    case ACTIONS.SET_CAMERA:
      const selectedCamera = state.rover?.cameras
        ? state.rover.cameras.filter(
            (camera: Camera) => camera.id === action.payload.cameraId
          )[0]
        : null
      return { ...state, camera: selectedCamera }

    case ACTIONS.SET_SOL:
      return { ...state, sol: action.payload.sol ?? null, earth_date: null, camera: null, page: 1 }

    case ACTIONS.SET_EARTH_DATE:
      return {
        ...state,
        earth_date: action.payload.earth_date ?? null,
        sol: action.payload.sol ?? null,
        camera: null,
        page: 1,
      }

    case ACTIONS.SET_NEXT_PAGE:
      return { ...state, page: state.page ? state.page + 1 : null }

    case ACTIONS.SET_DEFAULT_VALUES:
      return initialState
  }
  return state
}
export { filtersReducer }
