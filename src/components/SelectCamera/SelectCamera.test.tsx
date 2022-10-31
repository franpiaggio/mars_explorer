import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, beforeAll } from "vitest"
import { QueryClientProvider } from "@tanstack/react-query"
import SelectCamera from "./SelectCamera"
import { mockFilterContext, mockClient } from "@/setup/tests"
import * as fetchRoverModule from "@/queries/api"
import * as ContextModule from "@/hooks/useFiltersContext"

function RenderWithQueryMock() {
  return (
    <QueryClientProvider client={mockClient}>
      <SelectCamera />
    </QueryClientProvider>
  )
}

describe("Select camera", () => {
  beforeAll(() => {
    vi.spyOn(fetchRoverModule, "fetchRovers").mockResolvedValue({
      rovers: [{ max_date: "2022-20-2" }],
    })
    vi.spyOn(fetchRoverModule, "fetchRoverData").mockResolvedValue({})
    vi.spyOn(ContextModule, "useFiltersContext").mockImplementation(
      () => mockFilterContext
    )
  })

  const cameras = mockFilterContext.state.rover.cameras
  it("Shows a list of available cameras in the FilterState", () => {
    render(<RenderWithQueryMock />)
    cameras.forEach((camera) => {
      expect(screen.getByText(camera.name)).toBeInTheDocument()
    })
  })

  it("Trigger onChange function with corresponding camera id", () => {
    render(<RenderWithQueryMock />)
    vi.spyOn(mockFilterContext.actions, "setCamera")
    const selectOne = screen.getByRole("combobox")
    fireEvent.change(selectOne, { target: { value: cameras[0].id } })
    expect(mockFilterContext.actions.setCamera).toHaveBeenCalledWith(cameras[0].id)
  })
})
