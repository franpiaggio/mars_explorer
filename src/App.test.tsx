import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, vi, beforeAll } from "vitest"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { theme } from "./setup/theme"
import { App } from "./App"

interface props {
  path: string
}

const mockMatchMedia = {
  value: vi.fn().mockImplementation(() => ({
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
}

const mockClient = new QueryClient()

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
    vi.mock("react-query", () => ({
      useQuery: vi.fn().mockReturnValue({ data: {}, isLoading: false, error: {} }),
    }))
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
