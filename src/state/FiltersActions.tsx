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
    setRover: (roverId: number, rovers: Rover[]) => {
      dispatch({
        type: ACTIONS.SET_ROVER,
        payload: {
          roverId: roverId,
          rovers: rovers,
        },
      })
    },
    setDefaultCamera: (camera: Camera | null) => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_CAMERA,
        payload: {
          camera: camera,
        },
      })
    },
    setCamera: (cameraId: number) => {
      dispatch({
        type: ACTIONS.SET_CAMERA,
        payload: {
          cameraId: cameraId,
        },
      })
    },
    setNextPage: () => {
      dispatch({
        type: ACTIONS.SET_NEXT_PAGE,
        payload: {},
      })
    },
    setDay: (day: string) => {
      dispatch({
        type: ACTIONS.SET_DAY,
        payload: {
          day: day,
        },
      })
    },
    setDayType: (dayType: string) => {
      dispatch({
        type: ACTIONS.SET_DAY_TYPE,
        payload: {
          dayType: dayType,
        },
      })
    },
  }
}
export { filtersActions }
