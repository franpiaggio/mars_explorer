import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, beforeAll } from "vitest"
import { QueryClientProvider } from "@tanstack/react-query"
import SelectCamera from "./SelectCamera"
import { mockFilterContext, mockClient } from "@/setup/tests"
import * as fetchRoverModule from "@/queries/api"
import * as ContextModule from "@/hooks/useFiltersContext"
import * as ManifestModule from "@/queries/useManifest"

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
    vi.spyOn(ManifestModule, "useManifest").mockImplementation(() => ({
      manifestEntries: [
        {
          sol: 100,
          earth_date: "2022-30-10",
          total_photos: 10,
          cameras: ["CAM1", "CAM2"],
        },
      ],
      manifest: undefined,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: undefined,
      error: null,
      isFetched: true,
      isFetching: false,
      isRefetching: false,
      refetch: vi.fn(),
      status: "success",
    }) as any)
  })

  const cameras = mockFilterContext.state.rover.cameras

  it("Shows a list of available cameras in a select", () => {
    render(<RenderWithQueryMock />)
    cameras.forEach((camera) => {
      expect(screen.getByText(new RegExp(camera.name))).toBeInTheDocument()
    })
  })

  it("Trigger onChange function with corresponding camera id", () => {
    render(<RenderWithQueryMock />)
    vi.spyOn(mockFilterContext.actions, "setCamera")
    const selectEl = screen.getByRole("combobox")
    fireEvent.change(selectEl, { target: { value: cameras[0].id } })
    expect(mockFilterContext.actions.setCamera).toHaveBeenCalledWith(cameras[0].id)
  })
})
