import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, vi, beforeAll } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { App } from "./App"
import * as fetchRoverModule from "@/queries/api"

interface props {
  path: string
}

const mockMatchMedia = {
  value: vi.fn().mockImplementation(() => ({
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
}

const mockClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function RenderMockApp({ path }: props) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={mockClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe("App routing", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", mockMatchMedia)
    vi.spyOn(fetchRoverModule, "fetchRovers").mockResolvedValue({})
    vi.spyOn(fetchRoverModule, "fetchRoverData").mockResolvedValue({})
  })
  it("Renders home", () => {
    render(<RenderMockApp path="/" />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("MARS ROVERS")
  })
  it("Renders not found if path is invalid", () => {
    render(<RenderMockApp path="/aliens" />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Oops!")
  })
})
