import "@testing-library/jest-dom"
import { QueryClient } from "@tanstack/react-query"
import matchers from "@testing-library/jest-dom/matchers"
import { expect } from "vitest"

const mockFilterContext = {
  state: {
    rover: {
      id: 1,
      name: "rover",
      landing_date: "2022-30-10",
      launch_date: "2022-30-10",
      status: "-",
      max_sol: 100,
      max_date: "2022-30-10",
      total_photos: 1,
      cameras: [
        {
          id: 1,
          name: "CAM1",
          rover_id: 1,
          full_name: "Camera 1",
        },
        {
          id: 2,
          name: "CAM2",
          rover_id: 1,
          full_name: "Camera 2",
        },
      ],
    },
    camera: null,
    page: 1,
    day: null,
    dayType: null,
  },
  actions: {
    setDefaultRover: () => {},
    setCamera: (id: number) => {},
  },
}

const mockClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

expect.extend(matchers)
export { mockFilterContext, mockClient }
