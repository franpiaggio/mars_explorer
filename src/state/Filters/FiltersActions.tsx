import { ACTIONS } from "@/state/actions"
import { Rover, Camera, FilterAction } from "@/setup/types"
type Dispatch = (action: FilterAction) => void
function filtersActions(dispatch: Dispatch) {
  return {
    setDefaultRover: (rover: Rover, day: string) => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_ROVER,
        payload: {
          rover: rover,
          day: day,
        },
      })
    },
    setRover: (roverId: number, rovers: Rover[], dayType: string) => {
      dispatch({
        type: ACTIONS.SET_ROVER,
        payload: {
          roverId: roverId,
          rovers: rovers,
          dayType: dayType,
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
    setDayType: (dayType: string, day: string) => {
      dispatch({
        type: ACTIONS.SET_DAY_TYPE,
        payload: {
          dayType: dayType,
          day: day,
        },
      })
    },
  }
}
export { filtersActions }
