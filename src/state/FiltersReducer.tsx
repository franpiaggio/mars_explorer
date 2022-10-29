import { ACTIONS } from "./actions"
import type { Rover, Camera, Filters, FilterAction } from "@/setup/types"

function filtersReducer(state: Filters, action: FilterAction): Filters {
  switch (action.type) {
    case ACTIONS.SET_DEFAULT_ROVER:
      return { ...state, rover: action.payload.rover }

    case ACTIONS.SET_ROVER:
      const selectedRover = action.payload.rovers
        ? action.payload.rovers.filter(
            (rover: Rover) => rover.id === action.payload.roverId
          )[0]
        : null
      return { ...state, rover: selectedRover, camera: null, page: 1 }

    case ACTIONS.SET_DEFAULT_CAMERA:
      return { ...state, camera: action.payload.camera }

    case ACTIONS.SET_CAMERA:
      const selectedCamera = state.rover?.cameras
        ? state.rover.cameras.filter(
            (camera: Camera) => camera.id === action.payload.cameraId
          )[0]
        : null
      return { ...state, camera: selectedCamera }

    case ACTIONS.SET_NEXT_PAGE:
      return { ...state, page: state.page ? state.page + 1 : null }
  }
  return state
}
export { filtersReducer }
