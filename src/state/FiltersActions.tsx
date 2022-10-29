import { ACTIONS } from "./actions"
import { Rover, Camera, FilterAction } from "@/setup/types"
type Dispatch = (action: FilterAction) => void
function filtersActions(dispatch: Dispatch) {
  return {
    setDefaultRover: (rover: Rover) => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_ROVER,
        payload: {
          rover: rover,
        },
      })
    },
    setRover: (roverName: string, rovers: Rover[]) => {
      dispatch({
        type: ACTIONS.SET_ROVER,
        payload: {
          roverName: roverName,
          rovers: rovers,
        },
      })
    },
    setDefaultCamera: (camera: Camera) => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_CAMERA,
        payload: {
          camera: camera,
        },
      })
    },
    setCamera: (cameraName: string) => {
      dispatch({
        type: ACTIONS.SET_CAMERA,
        payload: {
          cameraName: cameraName,
        },
      })
    },
  }
}
export { filtersActions }
