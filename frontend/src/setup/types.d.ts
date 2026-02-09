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
  camera: Camera
  img_src: string
  earth_date: string
  rover: Rover
}

type ManifestEntry = {
  sol: number
  earth_date: string
  total_photos: number
  cameras: string[]
}

type Manifest = {
  name: string
  landing_date: string
  launch_date: string
  status: string
  max_sol: number
  max_date: string
  total_photos: number
  photos: ManifestEntry[]
}

type Filters = {
  rover?: Rover | null
  camera?: Camera | null
  page?: number | null
  sol?: number | null
  earth_date?: string | null
}

interface FilterAction {
  type: string
  payload: {
    rovers?: Rover[]
    rover?: Rover
    camera?: Camera | null
    roverId?: number
    cameraId?: number
    sol?: number
    page?: number
    earth_date?: string
  }
}

export type { Rover, Camera, Photo, Filters, FilterAction, ManifestEntry, Manifest }
