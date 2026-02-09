import { ACTIONS } from "@/state/actions"
import { Rover, Camera, FilterAction } from "@/setup/types"
type Dispatch = (action: FilterAction) => void
function filtersActions(dispatch: Dispatch) {
  return {
    setDefaultRover: (rover: Rover, sol: number) => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_ROVER,
        payload: {
          rover: rover,
          sol: sol,
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
    setSol: (sol: number) => {
      dispatch({
        type: ACTIONS.SET_SOL,
        payload: {
          sol: sol,
        },
      })
    },
    setEarthDate: (earth_date: string, sol: number) => {
      dispatch({
        type: ACTIONS.SET_EARTH_DATE,
        payload: {
          earth_date: earth_date,
          sol: sol,
        },
      })
    },
    setDefaultValues: () => {
      dispatch({
        type: ACTIONS.SET_DEFAULT_VALUES,
        payload: {},
      })
    },
  }
}
export { filtersActions }
