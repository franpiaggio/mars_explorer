type Rover = {
  id: number
  name: string
  landing_date: string
  launch_date: string
  status: string
  max_sol: number
  max_date: string
  total_photos: number
  cameras: Camera[]
}
type Camera = {
  id: number
  name: string
  rover_id: number
  full_name: string
}
type Photo = {
  id: number
  sol: number
  camera: Camera[]
  img_src: string
  earth_date: string
  rover: Rover[]
}
type Filters = {
  rover?: Rover | null
  camera?: Camera | null
  page?: number | null
}
interface FilterAction {
  type: string
  payload: {
    rovers?: Rover[]
    rover?: Rover
    camera?: Camera | null
    roverId?: number
    cameraId?: number
    typeDay?: string
    page?: number
  }
}

export type { Rover, Camera, Photo, Filters, FilterAction }
